import { DataValidationError } from '../../base/Errors'
import BaseEntity from '../../base/BaseEntity'
import IExpense from './IExpense'
import IUser from '../users/IUser'

class entity extends BaseEntity {
  static addExpense(data: IExpense): IExpense {
    const schema = super.validator
      .object({
        user: super.validator.number().int().positive(),
        amount: super.validator.number().int().positive(),
        category: super.validator.string().max(50).trim(),
        description: super.validator.string().max(50).trim(),
        date: super.validator.string().datetime(),
      })
      .strict()

    const parsed = schema.safeParse(data)
    if (parsed.success === false)
      throw new DataValidationError(parsed.error.errors)

    return {
      ...parsed.data,
      date: new Date(parsed.data.date),
      user: { id: parsed.data.user },
    }
  }

  static editExpense(data: IExpense): IExpense {
    const schema = super.validator
      .object({
        id: super.validator.number().int().positive(),
        user: super.validator.number().int().positive(),
        amount: super.validator.number().int().positive(),
        category: super.validator.string().max(50).trim(),
        description: super.validator.string().max(50).trim(),
        date: super.validator.string().datetime(),
      })
      .strict()

    const parsed = schema.safeParse(data)
    if (parsed.success === false)
      throw new DataValidationError(parsed.error.errors)

    return {
      ...parsed.data,
      date: new Date(parsed.data.date),
      user: { id: parsed.data.user },
    }
  }

  /**
   * Get expenses
   * @param data 
   * @returns 
   */
  static getExpenses(data: unknown): { page: number; limit: number; user: IUser } {
    const schema = super.validator
      .object({
        page: super.validator.number().int().positive().optional(),
        limit: super.validator.number().int().min(5).max(20).optional(),
        user: super.validator.number().int().positive(),
      })
      .strict()

    const value = schema.safeParse(data)
    if (value.success === false)
      throw new DataValidationError(value.error.errors)

    return {
      page: value.data.page,
      limit: value.data.limit,
      user: { id: value.data.user },
    }
  }

  /**
   * Delete expense
   * @param data 
   * @returns 
   */
  static deleteExpense(data: unknown) {
    const schema = super.validator
      .object({
        id: super.validator.number().int().positive(),
        user: super.validator.number().int().positive(),
      })
      .strict()

    const parsed = schema.safeParse(data)
    if (parsed.success === false)
      throw new DataValidationError(parsed.error.errors)

    return {
      id: parsed.data.id,
      user: { id: parsed.data.user },
    }
  }
}

export default entity
