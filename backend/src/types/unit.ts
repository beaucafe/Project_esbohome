import { Document } from 'mongoose'

export interface Unit extends Document {
  _id: number
  name: string
  quantity: Number
}
