export default interface IUser {
  id?: number
  uuid?: string
  firstName?: string
  lastName?: string
  fullName?: string
  email?: string
  password?: string
  createdAt?: Date
  updatedAt?: Date
  disabledAt?: Date
}
