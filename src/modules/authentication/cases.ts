import bcrypt from 'bcrypt'
import { InvalidRequestError, ObjectNotFoundError } from '../../base/Errors'
import db from './db'
import entity from './entity'
import CryptoJS from 'crypto-js'
import jwt from 'jsonwebtoken'

const encryptKey = process.env.ENCRYPT_KEY
const jwtKey = process.env.JWT_KEY

class cases {
  /**
   * Logs in a user.
   *
   * @param {Object} data - The data to use for logging in the user.
   * @returns {Promise<>} A promise that resolves to an object containing the user's token and information.
   */
  static async login(data: unknown): Promise<{ token: string, user: unknown }> {
    const parsed = entity.login(data)

    const user = await db.getUser({ email: parsed.email })
    if (!user) throw new InvalidRequestError('Bad credentials')

    const isPasswordMatch = bcrypt.compareSync(parsed.password, user.password)
    if (!isPasswordMatch) throw new InvalidRequestError('Bad credentials')

    const payload = CryptoJS.AES.encrypt(JSON.stringify({ id: user.id, name: user.fullName }), encryptKey).toString()
    const token = jwt.sign({ payload }, jwtKey, { expiresIn: 28800 })

    return {
      token,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    }
  }
}

export default cases
