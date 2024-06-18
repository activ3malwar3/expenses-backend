import { EntityTarget, Repository } from 'typeorm'
import { AppDataSource } from '../data_source'

/**
 * Represents a database utility class. It provides common methods to perform database operations.
 * @template T The entity type.
 * @abstract
 * @class
 * @classdesc Represents a database utility class.
 *
 */
abstract class BaseDB<T> {
  /**
   * The repository. It is initialized in the constructor. It is used to perform database operations.
   */
  protected repository: Repository<T>

  /**
   * Creates a new instance of the BaseDB class.
   * @param entityClass - The entity class.
   */
  constructor(entityClass: EntityTarget<T>) {
    this.repository = AppDataSource.getRepository(entityClass)
  }

  abstract create(data: T): Promise<T | void>
  abstract update(data: T): Promise<boolean>
  abstract delete(id: number): Promise<boolean>
  abstract get(
    page: number,
    limit: number,
    query: unknown,
    sort?: string,
    direction?: 'ASC' | 'DESC',
  ): Promise<{ items: T[]; total: number; page: number; limit: number }>
  abstract checkIfItemExists(data: unknown): Promise<boolean>
}

export default BaseDB
