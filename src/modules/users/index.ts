import express from 'express'
import { verify } from '../../base/verify.mw'
import controller from './controller'

class Index {
  public router = express.Router()

  constructor() {
    this.router.post('/api/users', controller.createUser)
    this.router.get('/api/users', controller.getUsers)
    
    this.router.post('/api/users/request-password-reset', controller.requestPasswordReset)
    this.router.post('/api/users/reset-password', controller.resetPassword)
    
    this.router.patch('/api/users/me', verify, controller.updateMyAccount)
  }
}

export default new Index().router
