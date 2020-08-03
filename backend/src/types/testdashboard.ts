import { Document } from 'mongoose'

export interface Itestdashboard extends Document {
  readonly _id: number
  readonly name: string
  readonly date: number
  readonly month: number
  readonly year: number
}
