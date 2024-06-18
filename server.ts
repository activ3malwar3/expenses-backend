import dotenv from 'dotenv'
import express from 'express'
import 'source-map-support/register'
import { app, httpServer } from './src/app'
import { connectToDatabase, disconnectFromDatabase } from './src/database_connection'

dotenv.config()
const { PORT } = process.env

app.use(express.static('./public'))

/**
 * Starts the server. Connects to the database first before starting the server.
 * If the connection to the database is successful, the server will start listening on the specified port.
 * Upon successful connection to the database, the server will attempt to migrate data from the old database to the new database.
 * If the connection to the database fails, the server will not start.
 *
 * @returns {Promise<void>} - A promise that resolves when the server is started.
 *
 */
async function startServer() {
  try {
    await connectToDatabase()

    httpServer.listen(Number(PORT), async () => {
      console.log(`🚀 Server running on port: ${PORT}`)
    })

    /**
     * Shutdown the server gracefully. This will disconnect from the database before shutting down the server.
     */
    const shutdown = async () => {
      console.log('Shutting down server')
      await disconnectFromDatabase()
      process.exit(0)
    }

    process.on('SIGTERM', shutdown)
    process.on('SIGINT', shutdown)
  } catch (error) {
    console.error('❌ Failed to connect to database: ', error)
  }
}

startServer()
