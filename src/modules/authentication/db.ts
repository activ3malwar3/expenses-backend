import { AppDataSource } from '../../data_source'
import IUser from '../users/IUser'
import User from '../users/User.entity'

class db {
  /**
   * Retrieves a user from the database.
   * @param {string} email The email of the user to retrieve.
   * @returns {IUser} A promise that resolves to a User object.
   */
  static async getUser({ email }): Promise<IUser> {
    const user = await AppDataSource.getRepository(User)
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .select(['user.id', 'user.firstName', 'user.lastName', 'user.email', 'user.password'])
      .getOne()

    return user
  }
}

export default db
