import BaseEntity from '../../base/BaseEntity'
import { DataValidationError } from '../../base/Errors'
import IUser from '../users/IUser'

export default class entity extends BaseEntity {
  /**
   * Login
   * @param data
   * @returns {object} email, password
   */
  static login(data: IUser): IUser {
    const schema = super.validator
      .object({
        email: super.validator.string().email().max(50).trim(),
        password: super.validator.string().max(50),
      })
      .strict()

    const value = schema.safeParse(data)
    if (value.success === false) throw new DataValidationError(value.error.errors)
    return value.data
  }
}
