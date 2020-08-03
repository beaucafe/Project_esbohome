import { Document, Schema } from 'mongoose'

interface IDashboardOrderInfo extends Document {
  _id: Schema.Types.ObjectID
  doctype: string
  year: Number
  month: Number
  sequence: [
    {
      _id: Number
      details: { type: Schema.Types.ObjectID }
    },
  ]
}

interface IDailyOrder extends Document {
  _id: Schema.Types.ObjectID
  skucode: String
  thainame: String
  engname: String
  u_name: String
  u_quantity: Schema.Types.Decimal128
  skumove_key: Number // skumove_key
  lot_number: String
  serial_number: String
  free: Schema.Types.Decimal128
  pur_amount: Schema.Types.Decimal128
  cost: Schema.Types.Decimal128
  sell: Schema.Types.Decimal128
  vat: Schema.Types.Decimal128
  doctype_thaidesc: String
  doctype_properties: Number
  date_info: Date
}

export { IDashboardOrderInfo, IDailyOrder }
