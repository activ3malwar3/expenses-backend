import { Request, Response } from 'express'
import baseController from '../../base/Controller'
import cases from './cases'

export default class controller extends baseController {
  /**
   * Retrieves users
   *
   * @param req - The request object.
   * @param res - The response object.
   */
  static async getUsers(req: Request, res: Response): Promise<void> {
    let response

    try {
      const result = await cases.getUsers(req.query)
      response = super.formatResponse(200, 'Success', result)
    } catch (err) {
      const { code: status, details: failureResult, message: failureMessage } = super.formatExceptions(err)
      response = super.formatResponseForFailure(status, failureMessage, failureResult)
    }

    res.status(response.status).json(response)
  }

  /**
   * Creates a user.
   *
   * @param req - The request object.
   * @param res - The response object.
   */
  static async createUser(req: Request, res: Response): Promise<void> {
    let response

    try {
      const result = await cases.createUser(req.body)
      response = super.formatResponseForSuccessCreate(result)
    } catch (err) {
      const { code: status, details: failureResult, message: failureMessage } = super.formatExceptions(err)
      response = super.formatResponseForFailure(status, failureMessage, failureResult)
    }

    res.status(response.status).json(response)
  }

  /**
   * Updates user account.
   *
   * @param req - The request object.
   * @param res - The response object.
   */
  static async updateMyAccount(req: Request, res: Response): Promise<void> {
    let response

    try {
      const result = await cases.updateMyAccount({ ...req.body, id: req.user.id })
      response = super.formatResponseForSuccessUpdate(result)
    } catch (err) {
      const { code: status, details: failureResult, message: failureMessage } = super.formatExceptions(err)
      response = super.formatResponseForFailure(status, failureMessage, failureResult)
    }

    res.status(response.status).json(response)
  }

  /**
   * Request password reset
   * @param req 
   * @param res 
   */
  static async requestPasswordReset(req: Request, res: Response): Promise<void> {
    let response

    try {
      const result = await cases.requestPasswordReset(req.body)
      response = super.formatResponseForSuccessUpdate(result)
    } catch (err) {
      const { code: status, details: failureResult, message: failureMessage } = super.formatExceptions(err)
      response = super.formatResponseForFailure(status, failureMessage, failureResult)
    }

    res.status(response.status).json(response)
  }

  /**
   * Reset password
   * @param req 
   * @param res 
   */
  static async resetPassword(req: Request, res: Response): Promise<void> {
    let response

    try {
      const result = await cases.resetPassword(req.body)
      response = super.formatResponseForSuccessUpdate(result)
    } catch (err) {
      const { code: status, details: failureResult, message: failureMessage } = super.formatExceptions(err)
      response = super.formatResponseForFailure(status, failureMessage, failureResult)
    }

    res.status(response.status).json(response)
  }
}
