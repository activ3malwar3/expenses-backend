import entity from './entity'
import db from './db'
import IExpense from './IExpense'
import { ObjectNotFoundError } from '../../base/Errors'

export default class cases {
  /**
   * Add expense
   * @param data
   * @returns
   */
  static async addExpense(data: unknown): Promise<IExpense> {
    const parsed = entity.addExpense(data)
    const result = await db.addExpense(parsed)

    return result
  }

  /**
   * Edit expense
   * @param data
   * @returns
   */
  static async editExpense(data: unknown): Promise<IExpense> {
    const parsed = entity.editExpense(data)
    const result = await db.editExpense(parsed)

    return result
  }

  /**
   * Get expenses
   * @param data
   * @returns
   */
  static async getExpenses(
    data: unknown
  ): Promise<{
    items: IExpense[]
    total: number
    page: number
    limit: number
  }> {
    const { page, limit, user } = entity.getExpenses(data)
    const result = await db.getExpenses(page, limit, { user })

    return result
  }

  /**
   * Delete expense
   * @param data
   * @returns
   */
  static async deleteExpense(data: unknown): Promise<{ id: number }> {
    const { id, user } = entity.deleteExpense(data)

    const expense = await db.getExpenses(null, null, { id, user })
    if (!expense.items.length) throw new ObjectNotFoundError('Expense not found')

    const result = await db.deleteExpense(id)

    return result
  }
}
