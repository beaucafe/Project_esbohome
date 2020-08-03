import * as mongoose from 'mongoose'
import { Schema } from 'mongoose'

// บันทึกหลัง Docdetail ทำงานเสร็จแล้ว
export const DocrunSchema = new mongoose.Schema(
  {
    drkey: Number,
    doctype: { type: Schema.Types.ObjectID, ref: 'Doctypes' },
    dryear: Number,
    drmonth: Number,
    drseq: Number,
  },
  {
    timestamps: true,
    versionKey: false,
    collection: 'docruns',
  },
)
