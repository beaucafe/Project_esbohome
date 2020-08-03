import { Document, Schema } from 'mongoose'

interface BarcodeDetail {
  _id: Number
  code: string
  alias_name: string
  alias_name_eng: string
  unit: string
  quantity: number
  volume: number
  weight: Schema.Types.Decimal128
  sales_enable: boolean
  purchases_enable: boolean
  main_price: boolean
  control_price: Schema.Types.Decimal128
}

interface Skudetail {
  department: string
  unit: number
  min: number
  max: number
}

interface Stock {
  HO: number
  H1: number
}

export interface ISkumaster extends Document {
  _id: Number
  skucode: string
  skukey: string
  skuname: string
  skuname_eng: string
  barcode_detail: BarcodeDetail
  skudetails: Skudetail
  stock: Stock
  apname: string
}
