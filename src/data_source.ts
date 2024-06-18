import dotenv from 'dotenv'
import { join } from 'path'
import 'reflect-metadata'
import { DataSource } from 'typeorm'

dotenv.config()

const { DATABASE_HOST, DATABASE_PORT, DATABASE_USERNAME, DATABASE_PASSWORD, DATABASE_NAME } = process.env

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: DATABASE_HOST,
  port: Number(DATABASE_PORT),
  username: DATABASE_USERNAME,
  password: DATABASE_PASSWORD,
  database: DATABASE_NAME,
  entities: [
    join(__dirname, './modules/**/*.entity{.ts,.js}'),
  ],
  migrationsRun: true,
  synchronize: true,
})