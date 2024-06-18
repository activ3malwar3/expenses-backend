import cors from 'cors'
import express from 'express'
import { queryParser } from 'express-query-parser'
import { Server } from 'http'

import auth from './modules/authentication'
import users from './modules/users'
import expenses from './modules/expenses'

const app = express()

const httpServer = new Server(app)

app.use(cors())
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))
app.use(express.raw())
app.use(
  queryParser({
    parseNull: true,
    parseUndefined: true,
    parseBoolean: true,
    parseNumber: true,
  })
)

app.use(auth)
app.use(users)
app.use(expenses)

export { app, httpServer }
