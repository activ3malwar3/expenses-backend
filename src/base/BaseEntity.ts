import { z, ZodError } from 'zod'

export default class BaseEntity {
  static validator = z
  static ZodError = ZodError
}
