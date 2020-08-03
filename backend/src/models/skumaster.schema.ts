import * as mongoose from 'mongoose'
import { Schema } from 'mongoose'

export const SkumasterSchema = new mongoose.Schema(
  {
    _id: Number, // sku_key
    skucode: { type: String, unique: true }, // sku_code
    skuname: String, //sku_name
    skuname_eng: { type: String, default: null },
    barcode_detail: [
      {
        _id: { type: Number }, // goods_key
        code: { type: String }, // goods_code
        alias_name: { type: String, default: null },
        alias_name_eng: { type: String, default: null },
        unit: String,
        quantity: Number,
        volume: { type: Number, default: 0 },
        weight: { type: Schema.Types.Decimal128 },
        sales_enable: Boolean,
        purchases_enable: Boolean,
        main_price: Boolean,
        control_price: { type: Schema.Types.Decimal128 },
      },
    ],
    skudetails: {
      department: String,
      unit: { type: Number, ref: 'Unit' },
      min: Number,
      max: Number,
    },
    stock: {
      HO: { type: Number, default: 0 },
      H1: { type: Number, default: 0 },
    }, // สาขา  ,  คงเหลือ
    apname: { type: String, default: null },

    DetailsProductSales: [
      {
        _id: false, // เดือนปี การขายสินค้า
        docRunning: { type: String, unique: true, dufault: null }, // เดือนปี การขายสินค้า
        details: [{}],
      },
    ],
    DetailsPurchases: [
      {
        _id: false,
        docRunning: { type: String, unique: true, dufault: null }, // เดือนปี การขายสินค้า
        details: [{}],
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
    collection: 'skumasters',
  },
)
