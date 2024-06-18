import { Request, Response } from 'express'
import BaseController from '../../base/Controller'
import cases from './cases'

class controller extends BaseController {
  /**
   * Logs in a user.
   *
   * @param req - The request object.
   * @param res - The response object.
   * @returns A Promise that resolves to void.
   */
  static async login(req: Request, res: Response): Promise<void> {
    let response

    try {
      const result = await cases.login(req.body)
      response = super.formatResponse(200, 'Success', result)
    } catch (err) {
      const { code: status, details: failureResult, message: failureMessage } = super.formatExceptions(err)
      response = super.formatResponseForFailure(status, failureMessage, failureResult)
    }

    res.status(response.status).json(response)
  }
}

export default controller
