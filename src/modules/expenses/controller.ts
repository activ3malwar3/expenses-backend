import { Request, Response } from 'express'
import baseController from '../../base/Controller'
import cases from './cases'

export default class controller extends baseController {
  /**
   * Add expense
   * @param req - The request object.
   * @param res - The response object.
   */
  static async addExpense(req: Request, res: Response): Promise<void> {
    let response

    try {
      const result = await cases.addExpense({ ...req.body, user: req.user.id })
      response = super.formatResponseForSuccessCreate(result)
    } catch (err) {
      const {
        code: status,
        details: failureResult,
        message: failureMessage,
      } = super.formatExceptions(err)
      response = super.formatResponseForFailure(
        status,
        failureMessage,
        failureResult
      )
    }

    res.status(response.status).json(response)
  }

  /**
   * Edit expense
   * @param req
   * @param res
   */
  static async editExpense(req: Request, res: Response): Promise<void> {
    let response

    try {
      const result = await cases.editExpense({ ...req.body, user: req.user.id })
      response = super.formatResponseForSuccessUpdate(result)
    } catch (err) {
      const {
        code: status,
        details: failureResult,
        message: failureMessage,
      } = super.formatExceptions(err)
      response = super.formatResponseForFailure(
        status,
        failureMessage,
        failureResult
      )
    }

    res.status(response.status).json(response)
  }

  /**
   * Get expenses
   * @param req
   * @param res
   */
  static async getExpenses(req: Request, res: Response): Promise<void> {
    let response

    try {
      const result = await cases.getExpenses({ ...req.body, user: req.user.id })
      response = super.formatResponse(200, 'Success', result)
    } catch (err) {
      const {
        code: status,
        details: failureResult,
        message: failureMessage,
      } = super.formatExceptions(err)
      response = super.formatResponseForFailure(
        status,
        failureMessage,
        failureResult
      )
    }

    res.status(response.status).json(response)
  }

  /**
   * Delete expense
   * @param req
   * @param res
   */
  static async deleteExpense(req: Request, res: Response): Promise<void> {
    let response

    try {
      const result = await cases.deleteExpense({ ...req.query, user: req.user.id })
      response = super.formatResponse(200, 'Success', result)
    } catch (err) {
      const {
        code: status,
        details: failureResult,
        message: failureMessage,
      } = super.formatExceptions(err)
      response = super.formatResponseForFailure(
        status,
        failureMessage,
        failureResult
      )
    }

    res.status(response.status).json(response)
  }
}
