import * as mongoose from 'mongoose'
import { Schema } from 'mongoose'

// บันทึกหลัง Docdetail ทำงานเสร็จแล้ว
export const DashboardOrderInfoSchema = new mongoose.Schema(
  {
    doctype: { type: String },
    year: { type: Number },
    month: { type: Number },
    sequence: [
      {
        _id: { type: Number },
        details: { type: Schema.Types.ObjectID, ref: 'Dailyorders' },
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
    collection: 'dashboardOrderinfos',
  },
)
