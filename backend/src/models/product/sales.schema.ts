import * as mongoose from 'mongoose'
import { Schema } from 'mongoose'

const DetailedProductSalesSchema = new mongoose.Schema( ///  _id = ส่งไปเก็บไว้ที่ skumaster
  {
    documentRunning: { type: String, unique: true },
    preTax: Number,
    taxTotal: Number,
    taxAmount: Number,
    billTotal: Number,
    billCancel: Number,
    billMember: Number,
    lastBill: {
      _id: { type: Number, unique: true, index: true },
      billNo: String,
      billStart: Date,
      billStop: Date,
      mbCode: String,
      mbCard: String,
      taxInv: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: 'detailedProductSales',
  },
)
