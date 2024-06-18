import dotenv from 'dotenv'
import Redis from 'ioredis'

dotenv.config()

const { REDISCLOUD_URL, SERVER_TYPE } = process.env

/**
 * Interface for a cache object.
 * @interface
 */
interface BaseCache {
  /**
   * Sets a value in the cache.
   * @param {string} key - The key under which to store the value.
   * @param {string} val - The value to store.
   * @param {number} [age] - The maximum age of the value in the cache.
   * @returns {Promise<void>}
   */
  set: (key: string, val: string, age?: number) => Promise<void>

  /**
   * Sets multiple values in the cache.
   * @param {{ [key: string]: string }} keys - An object where each property is a key-value pair to store in the cache.
   * @returns {Promise<void>}
   */
  multiSet: (keys: { [key: string]: string }) => Promise<void>

  /**
   * Updates multiple values in the cache that match a pattern.
   * @param {string} pattern - The pattern to match keys against.
   * @param {string} val - The value to set for matching keys.
   */
  updateMany: (pattern: string, val: string) => void

  /**
   * Increments a value in the cache by a certain amount.
   * @param {string} key - The key of the value to increment.
   * @param {number} amount - The amount by which to increment the value.
   * @returns {Promise<number>} - The new value.
   */
  incrementBy: (key: string, amount: number) => Promise<number>

  /**
   * Retrieves a value from the cache.
   * @param {string} key - The key of the value to retrieve.
   * @returns {Promise<string | null>} - The retrieved value, or null if the key does not exist.
   */
  get: (key: string) => Promise<string | null>

  /**
   * Deletes a value or values from the cache.
   * @param {string | string[]} key - The key or keys of the values to delete.
   * @returns {Promise<number>} - The number of keys that were removed.
   */
  delete: (key: string | string[]) => Promise<number>

  /**
   * Pushes values to a list in the cache.
   * @param {string} key - The key of the list.
   * @param {string[]} values - The values to push.
   * @returns {Promise<number>} - The new length of the list.
   */
  pushToList: (key: string, values: string[]) => Promise<number>

  /**
   * Removes a value from a list in the cache.
   * @param {string} key - The key of the list.
   * @param {string} val - The value to remove.
   * @returns {Promise<number>} - The number of removed elements.
   */
  removeFromList: (key: string, val: string) => Promise<number>

  /**
   * Retrieves a list from the cache.
   * @param {string} key - The key of the list to retrieve.
   * @returns {Promise<string[]>} - The retrieved list.
   */
  getList: (key: string) => Promise<string[]>

  /**
   * Sets the maximum age of a value in the cache.
   * @param {string} key - The key of the value.
   * @param {number} age - The maximum age to set.
   * @returns {Promise<void>}
   */
  setAge: (key: string, age: number) => Promise<void>

  /**
   * Removes all values from the cache.
   * @returns {Promise<void>}
   */
  flush: () => Promise<void>

  /**
   * Retrieves keys from the cache that match a pattern.
   * @param {string} match - The pattern to match keys against.
   * @param {number} count - The maximum number of keys to retrieve.
   * @returns {Promise<string[]>} - The matching keys.
   */
  scan: (match: string, count: number) => Promise<string[]>
}

class Cache implements BaseCache {
  private client: Redis
  private logging: boolean

  /**
   * Creates a new cache object.
   * @param url - The URL of the Redis instance.
   */
  constructor(url: string, logging = false) {
    this.client = new Redis(url, { enableReadyCheck: true })
    this.logging = logging

    this.client.on('ready', () => {
      console.info('⚡ Redis is ready')
    })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.client.on('error', (e: any) => {
      if (e.code === 'ENOTFOUND') console.error('Can\'t connect to redis instance, retrying ..')
      else if (e.code === 'ETIMEDOUT') console.log('Failed to connect redis instance, timeout.')
      else console.log(e)
    })
  }

  async set(key: string, val: string, age: number) {
    this.logging && console.log(`set [${key}] `)

    await this.client.set(key, val)
    if (age) await this.client.expire(key, age)
  }

  async multiSet(keys: { [key: string]: string }) {
    this.logging && console.log('mset ', keys)

    await this.client.mset(keys)
  }

  updateMany(pattern: string, val: number | string) {
    const stream = this.client.scanStream({ match: pattern })
    stream.on('data', (keys) => {
      if (keys.length) {
        const pipeline = this.client.pipeline()
        keys.forEach((key) => {
          pipeline.set(key, val)
        })
        pipeline.exec()
      }
    })
    stream.on('end', () => {
      return
    })
  }

  async incrementBy(key, amount) {
    this.logging && console.log(`inc [${key}] `, amount)

    return await this.client.incrby(key, amount)
  }

  async get(key: string) {
    this.logging && console.log(`get [${key}]`)

    return await this.client.get(key)
  }

  async delete(key: string): Promise<number> {
    let count = 0
    if (Array.isArray(key)) count = await this.client.del(...key)
    else {
      this.logging && console.log(`del [${key}]`)

      count = await this.client.del(key)
    }
    return count
  }

  async pushToList(key: string, values: string[]): Promise<number> {
    const length = await this.client.rpush(key, ...values)
    this.logging && console.log(`list add [${key}] `, length)

    return length
  }

  async removeFromList(key: string, val: string): Promise<number> {
    const removeCount = await this.client.lrem(key, 1, val)
    this.logging && console.log(`list remove item [${key}] `, removeCount)

    return removeCount
  }

  async getList(key: string): Promise<string[]> {
    this.logging && console.log(`list get [${key}] `)

    const list = await this.client.lrange(key, 0, -1)
    return list
  }

  async setAge(key: string, age: number): Promise<void> {
    if (key && age > 0) {
      const result = await this.client.expire(key, age)
      if (result && SERVER_TYPE === 'development') console.log(`set age [${key}]: ${age}`)
    }
  }

  async flush(): Promise<void> {
    await this.client.flushall()
  }

  scan(match: string, count: number): Promise<string[]> {
    return new Promise((resolve, reject) => {
      const stream = this.client.scanStream({ match, count })

      const result: string[] = []
      stream.on('data', (keys) => {
        for (const key in keys) {
          if (!Object.hasOwnProperty.call(result, key)) {
            result.push(keys[key])
          }
        }
      })

      stream.on('end', () => {
        resolve(result)
      })

      stream.on('error', (err) => {
        reject(err)
      })
    })
  }
}

const cacheInstance = new Cache(REDISCLOUD_URL, SERVER_TYPE === 'development')

export default cacheInstance
