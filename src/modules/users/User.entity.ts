import {
  AfterLoad,
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import IUser from './IUser'
import Expense from '../expenses/Expense.entity'

@Entity({ name: 'users', orderBy: { id: 'DESC' } })
export default class User implements IUser {
  @PrimaryGeneratedColumn('identity')
  id: number

  @Column()
  @Generated('uuid')
    uuid: string

  @Column({ type: 'text', nullable: true })
  firstName: string

  @Column({ type: 'text', nullable: true })
  lastName: string

  fullName: string

  @AfterLoad()
  computeFullName() {
    const firstName = this.firstName ?? ''
    const lastName = this.lastName ?? ''

    if (firstName || lastName) {
      this.fullName = `${firstName} ${lastName}`
    } else this.fullName = ''
  }

  @Column({ type: 'text', default: null, nullable: true })
  email: string

  @Column({ type: 'text', default: null, nullable: true, select: false })
  password: string

  @OneToMany(() => Expense, (expense) => expense)
  expenses: Expense[]

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date
}
