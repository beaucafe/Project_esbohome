import * as mongoose from 'mongoose'
import { Schema } from 'mongoose'
//const schema = mongoose.Schema

export const TestdashboardSchema = new mongoose.Schema(
  {
    name: String,
    date: Number,
    month: Number,
    year: Number,
  },
  {
    timestamps: true,
    versionKey: false,
    collection: 'testdashboards',
  },
)
