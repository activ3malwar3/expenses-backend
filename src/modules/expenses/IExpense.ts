import IUser from '../users/IUser'

export default interface IExpense {
  id?: number
  user?: IUser
  amount?: number
  category?: string
  description?: string
  date?: Date
  createdAt?: Date
  updatedAt?: Date
}
