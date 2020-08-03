import * as mongoose from 'mongoose'
//const schema = mongoose.Schema

export const UnitSchema = new mongoose.Schema(
  {
    _id: Number,
    name: String,
    quantity: Number,
  },
  {
    // timestamps: true,
    versionKey: false,
    collection: 'units',
  },
)
