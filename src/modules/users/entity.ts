import bcrypt from 'bcrypt'
import BaseEntity from '../../base/BaseEntity'
import { DataValidationError } from '../../base/Errors'
import IUser from './IUser'
const salt = bcrypt.genSaltSync(10)

class entity extends BaseEntity {
  /**
   * Create user
   * @param data
   * @returns {IUser} user
   */
  static createUser(data: IUser): IUser {
    const schema = super.validator
      .object({
        firstName: super.validator.string().max(50).trim(),
        lastName: super.validator.string().max(50).trim(),
        email: super.validator.string().email(),
        password: super.validator.string().max(50),
      })
      .strict()

    const parsed = schema.safeParse(data)
    if (parsed.success === false) throw new DataValidationError(parsed.error.errors)

    
    const hashedPassword = bcrypt.hashSync(parsed.data.password, salt)

    return {
      ...parsed.data,
      password: hashedPassword,
    }
  }

  /**
   * Get users
   * @param data
   * @returns {Object} query
   */
  static getUsers(data: unknown): { page: number; limit: number; } {
    const schema = super.validator
      .object({
        page: super.validator.number().int().positive().optional(),
        limit: super.validator.number().int().min(5).max(20).optional(),
      })
      .strict()

    const value = schema.safeParse(data)
    if (value.success === false) throw new DataValidationError(value.error.errors)

    return {
      page: value.data.page,
      limit: value.data.limit,
    }
  }

  /**
   * Update user account
   * @param data
   * @returns
   */
  static updateMyAccount(data: unknown): IUser {
    const schema = super.validator
      .object({
        id: super.validator.number().int().positive(),
        firstName: super.validator.string().max(50).trim().optional(),
        lastName: super.validator.string().max(50).trim().optional(),
        email: super.validator.string().email().optional(),
      }).strict()

    const parsed = schema.safeParse(data)
    if (parsed.success === false) throw new DataValidationError(parsed.error.errors)

    return parsed.data
  }

  /**
   * Request password reset
   * @param data 
   * @returns 
   */
  static requestPasswordReset(data: unknown): { email: string; uuid: string } {
    const schema = super.validator.object({
      email: super.validator.string().email(),
      uuid: super.validator.string().uuid(),
    }).strict()

    const parsed = schema.safeParse(data)
    if (parsed.success === false) throw new DataValidationError(parsed.error.errors)

    return {
      email: parsed.data.email,
      uuid: parsed.data.uuid,
    }
  }

  /**
   * Reset user password
   * @param data 
   * @returns 
   */
  static resetPassword(data: unknown): { email: string, password: string; uuid: string } {
    const schema = super.validator.object({
      email: super.validator.string().email(),
      password: super.validator.string().max(50),
      uuid: super.validator.string().uuid(),
    }).strict()

    const parsed = schema.safeParse(data)
    if (parsed.success === false) throw new DataValidationError(parsed.error.errors)

      const hashedPassword = bcrypt.hashSync(parsed.data.password, salt)

    return {
      email: parsed.data.email,
      password:  hashedPassword,
      uuid: parsed.data.uuid,
    }
  }
}

export default entity
