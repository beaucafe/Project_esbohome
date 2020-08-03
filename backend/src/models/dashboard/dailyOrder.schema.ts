import * as mongoose from 'mongoose'
import { Schema } from 'mongoose'

// บันทึกหลัง Docdetail ทำงานเสร็จแล้ว
export const DailyorderSchema = new mongoose.Schema(
  {
    skucode: { type: String },
    thainame: { type: String },
    engname: { type: String },
    u_name: { type: String },
    u_quantity: { type: Schema.Types.Decimal128 },
    skumove_key: { type: Number }, // skumove_key
    lot_number: { type: String },
    serial_number: { type: String },
    free: { type: Schema.Types.Decimal128, default: 0.0 },
    pur_amount: { type: Schema.Types.Decimal128 },
    cost: { type: Schema.Types.Decimal128 },
    sell: { type: Schema.Types.Decimal128 },
    vat: { type: Schema.Types.Decimal128 },
    doctype_thaidesc: { type: String },
    doctype_properties: { type: Number },
    date_info: { type: Date },
  },
  {
    // timestamps: true,
    versionKey: false,
    collection: 'dailyOrders',
  },
)
