import { DuplicateObjectError, ObjectNotFoundError } from '../../base/Errors'
import db from './db'
import entity from './entity'
import { mailer, fromAddress } from '../utils/mailer'

export default class cases {
  /**
   * Retrieves a list of users from the database.
   * @returns {Promise<{ items: User[], total: number, page: number, limit: number }>} A promise that resolves to an array of User objects.
   */
  static async getUsers(data: unknown): Promise<object> {
    const parsed = entity.getUsers(data)
    const { page, limit } = parsed
    const result = await db.getUsers(page, limit)

    return result
  }

  /**
   * Creates a user.
   * @param {any} data - The data for creating a user.
   * @returns {Promise<any>} - A promise that resolves with the created user.
   */
  static async createUser(data: unknown): Promise<object> {
    const user = entity.createUser(data)

    const count = await db.getAccountsCount(null, user.email)
    if (count > 0) throw new DuplicateObjectError()

    const created = await db.createUser(user)

    return created
  }

  /**
   * Updates my account.
   * @param {any} data - The data for updating a user.
   * @returns {Promise<boolean>} - A promise that resolves to a boolean indicating whether the user was updated.
   */
  static async updateMyAccount(data: unknown): Promise<boolean> {
    const parsed = entity.updateMyAccount(data)

    const updated = await db.updateUser(parsed)

    if (!updated) throw new ObjectNotFoundError('User was not found')

    return !!updated
  }

  /**
   * Request password reset
   * @param data
   * @returns
   */
  static async requestPasswordReset(data: unknown) {
    const { email, uuid } = entity.requestPasswordReset(data)

    const users = await db.getUsers(null, null, { email, uuid })
    if (!users.items.length) throw new ObjectNotFoundError('User was not found')

    const user = users.items[0]

    const message = `
      <p>Hi ${user.firstName},</p>
      <p>Click <a href="${process.env.APP_URL}/reset-password?uuid=${user.uuid}">here</a> to reset your password.</p>
      
      <p>Thanks,</p>
      <p>Code Guru</p>
      
      <p><small>This is an automated message. Please do not reply to this email.</small></p>
      `

    await mailer.sendEmail({
      from: fromAddress.codeGuru,
      to: email,
      subject: 'Password Reset',
      html: message,
    })

    return
  }

  /**
   * Reset user password
   * @param data
   * @returns
   */
  static async resetPassword(data: unknown) {
    const { email, password, uuid } = entity.resetPassword(data)

    const users = await db.getUsers(null, null, { email, uuid })
    if (!users.items.length) throw new ObjectNotFoundError('User was not found')

    const user = users.items[0]

    await db.updateUser({ id: user.id, password })

    return
  }
}
