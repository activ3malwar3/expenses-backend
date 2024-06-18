import { AppDataSource } from '../../data_source'
import IUser from '../users/IUser'
import Expense from './Expense.entity'
import IExpense from './IExpense'

export default class db {
  /**
   * Create a new expense
   * @param expense
   * @returns
   */
  static async addExpense(expense: IExpense): Promise<IExpense> {
    const result = await AppDataSource.getRepository(Expense)
      .createQueryBuilder()
      .insert()
      .into(Expense)
      .values(expense)
      .execute()

    return result?.raw[0]
  }

  /**
   * Edit an expense
   * @param expense
   * @returns
   */
  static async editExpense(expense: IExpense): Promise<IExpense> {
    const updated = await AppDataSource.getRepository(Expense)
      .createQueryBuilder()
      .update(Expense)
      .set(expense)
      .where('id = :id', { id: expense.id })
      .execute()

    return updated?.affected > 0 ? expense : null
  }

  /**
   * Get expenses
   * @param page
   * @param limit
   * @param user
   * @returns
   */
  static async getExpenses(
    page: number,
    limit: number,
    query?: { user?: IUser, id?: number },
  ): Promise<{
    items: IExpense[]
    total: number
    page: number
    limit: number
  }> {
    const queryBuilder = AppDataSource.getRepository(Expense)
      .createQueryBuilder('expenses')

      if (query.user)
        queryBuilder.where('expenses.user = :userId', { userId: query.user.id })

      if(query.id)
        queryBuilder.where('expenses.id = :id', { id: query.id })

    if (page >= 0 && limit >= 0)
      queryBuilder.skip((page - 1) * limit).take(limit)

    const [items, total] = await queryBuilder.getManyAndCount()
    return {
      items,
      total,
      page,
      limit,
    }
  }

  /**
   * Delete an expense
   * @param id
   * @returns
   */
  static async deleteExpense(id: number): Promise<{ id: number }> {
    const result = await AppDataSource.getRepository(Expense)
      .createQueryBuilder()
      .delete()
      .from(Expense)
      .where('id = :id', { id })
      .execute()

    return { id }
  }
}
