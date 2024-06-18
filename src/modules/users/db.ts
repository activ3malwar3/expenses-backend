import { AppDataSource } from '../../data_source'
import IUser from './IUser'
import User from './User.entity'

export default class db {
  /**
   * Create a user to the database.
   * @param user - The user object containing the user details.
   * @returns {Promise<IUser>}  The newly created user.
   */
  static async createUser(user: IUser): Promise<IUser> {
    const result = await AppDataSource.getRepository(User)
      .createQueryBuilder()
      .insert()
      .into(User)
      .values(user)
      .execute()

    return result?.raw[0]
  }

  /**
   * Update of a user to the database.
   * @param user - The user object containing the user details.
   * @returns {Promise<boolean>}  The updated user.
   */
  static async updateUser(user: IUser): Promise<boolean> {
    const updated = await AppDataSource.getRepository(User)
      .createQueryBuilder()
      .update(User)
      .set(user)
      .where('id = :id', { id: user.id })
      .execute()

    return updated?.affected > 0 ? true : false
  }

  /**
   * Retrieves all users from the database.
   * @param {number} page - The page number.
   * @param {number} limit - The number of items per page.
   * @returns {Promise<{ items: User[], total: number, page: number, limit: number }>} A promise that resolves to an array of User objects.
   *
   */
  static async getUsers(
    page: number,
    limit: number,
    query?: { email?: string; uuid?: string }
  ): Promise<{ items: User[]; total: number; page: number; limit: number }> {
    const queryBuilder =
      AppDataSource.getRepository(User).createQueryBuilder('users')

    if (query?.email)
      queryBuilder.andWhere('email = :email', { email: query.email })
    if (query?.uuid) queryBuilder.andWhere('uuid = :uuid', { uuid: query.uuid })

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
   * Retrieves the total number of users from the database.
   * @returns {Promise<number>} A promise that resolves to the total number of users.
   */
  static async getAccountsCount(
    role?: string,
    email?: string
  ): Promise<number> {
    const total = await AppDataSource.getRepository(User)
      .createQueryBuilder('user')
      .andWhere(email ? 'email = :email' : '1=1', { email })
      .getCount()

    return total
  }
}
