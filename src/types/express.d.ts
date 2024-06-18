import IRole from '../modules/roles/IRole'

declare global {
  namespace Express {
    interface Request {
      /**
       * The user object. This is used to store the user information using session middleware.
       */
      user?: {
        id: number
        firstName: string,
        lastName: string
      }
    }
  }
}
