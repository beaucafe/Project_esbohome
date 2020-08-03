import * as mongoose from 'mongoose'
import { Schema } from 'mongoose'

// บันทึกหลัง Docdetail ทำงานเสร็จแล้ว
export const DoctypeSchema = new mongoose.Schema(
  {
    dtkey: { type: Number, index: true, unique: true },
    dtcode: String,
    dtthainame: String,
    dtengname: String,
    properties: Number,
    runtype: Number,
    prefix: String,
    digit: Number,
    doccode: String,
    vatref: { type: String, default: null },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: 'doctypes',
  },
)
