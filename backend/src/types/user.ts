import { Document } from 'mongoose'

// export interface Address {
//   addr1: string
//   addr2: string
//   city: string
//   state: string
//   country: string
//   zip: number
// }

export interface User extends Document {
  _id: string
  name: string
  email: string
  readonly password: string
  role: string
}
