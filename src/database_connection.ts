import { AppDataSource } from './data_source'

/**
 * Connects to the database.
 */
async function connectToDatabase() {
  await AppDataSource.initialize()
    .then(() => {
      console.log('📅 Database connected')

      return AppDataSource
    })
    .catch((error) => console.log(error))
}

async function disconnectFromDatabase() {
  await AppDataSource.destroy()
    .then(() => {
      console.log('📅 Database disconnected')
    })
    .catch((error) => console.log(error))
}

export { connectToDatabase, disconnectFromDatabase }