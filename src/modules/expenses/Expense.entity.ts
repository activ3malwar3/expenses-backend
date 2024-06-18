import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import IExpense from './IExpense'
import IUser from '../users/IUser'
import User from '../users/User.entity'

@Entity({ name: 'expenses', orderBy: { id: 'DESC' } })
export default class Expense implements IExpense {
  @PrimaryGeneratedColumn('identity')
  id: number

  @ManyToOne(() => User, user => user.expenses, { onDelete: 'CASCADE', nullable: true })
  user: IUser

  @Column({ type: 'int', nullable: false })
  amount: number

  @Column({ type: 'text', nullable: false })
  category: string

  @Column({ type: 'text', nullable: false })
  description: string

  @Column({ type: 'timestamptz', nullable: false })
  date: Date

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date
}
