import controller from './controller'
import express from 'express'

class Index {
  public router = express.Router()

  constructor() {
    this.router.post('/api/auth/login', controller.login)
  }
}

export default new Index().router
