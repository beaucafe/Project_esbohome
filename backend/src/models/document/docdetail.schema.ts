import * as mongoose from 'mongoose'
import { Schema } from 'mongoose'

// บันทึกหลัง Docdetail ทำงานเสร็จแล้ว
export const DocdetailSchema = new mongoose.Schema(
  {
    dtailkey: { type: Number, unique: true },
    docinfo: { type: Schema.Types.ObjectID, ref: 'Docinfos' },
    items: Number, // จำนวนรายการ
    quantity: Number, // จำนวนรวมทั้งหมด
    details: {
      goodkey: Number, // trd_goods
      skukey: Number, // trd_sku
      goodcode: String, // trd_keyin
      thainame: String, // Trd_sh_name
      pur_amount: { type: Schema.Types.Decimal128 }, // Trd_sh_qty
      cost: { type: Schema.Types.Decimal128 }, // Trd_sh_uprc
      sell: { type: Schema.Types.Decimal128 }, // trd_sh_gsell
      vat: { type: Schema.Types.Decimal128 }, // trd_sh_gvat
      vat_type: Number, // trd_vat_ty
      vat_rate: { type: Schema.Types.Decimal128 }, // trd_vat_r
      u_quantity: { type: Schema.Types.Decimal128 }, // trd_utqqty , จำนวน * ของหน่วยนับ
      u_name: String, // trd_utqname ชื่อหน่วยนับ
      free: { type: Schema.Types.Decimal128 }, // trd_q_free
      skumove_key: Number,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: 'docdetails',
  },
)
