import express from 'express'
import { verify } from '../../base/verify.mw'
import controller from './controller'

class Index {
  public router = express.Router()

  constructor() {
    this.router.post('/api/expenses', verify, controller.addExpense)
    this.router.patch('/api/expenses', verify,controller.editExpense)
    this.router.get('/api/expenses', verify, controller.getExpenses)
    this.router.delete('/api/expenses', verify, controller.deleteExpense)
  }
}

export default new Index().router
