import * as mongoose from 'mongoose'
import { Schema } from 'mongoose'

// const SkumasterSchema = new mongoose.Schema(
//   {
//     _id: { type: Number, index: true, unique: true }, // sku_key
//     skucode: { type: String, unique: true }, // sku_code
//     skuname: String, //sku_name
//     skuname_eng: { type: String, default: null },
//     barcode_detail: [
//       {
//         _id: { type: Number }, // goods_key
//         code: { type: String }, // goods_code
//         alias_name: { type: String, default: null },
//         alias_name_eng: { type: String, default: null },
//         unit: String,
//         quantity: Number,
//         volume: { type: Number, default: 0 },
//         weight: { type: Schema.Types.Decimal128 },
//         sales_enable: Boolean,
//         purchases_enable: Boolean,
//         main_price: Boolean,
//         control_price: { type: Schema.Types.Decimal128 },
//       },
//     ],
//     skudetails: {
//       department: String,
//       unit: { type: Number, ref: 'Unit' },
//       min: Number,
//       max: Number,
//     },
//     stock: {
//       HO: { type: Number, default: 0 },
//       H1: { type: Number, default: 0 },
//     }, // สาขา  ,  คงเหลือ
//     apname: { type: String, default: null },

//     DetailsProductSales: [
//       {
//         _id: false, // เดือนปี การขายสินค้า
//         docRunning: { type: String, unique: true, dufault: null }, // เดือนปี การขายสินค้า
//         details: [{}],
//       },
//     ],
//     DetailsPurchases: [
//       {
//         _id: false,
//         docRunning: { type: String, unique: true, dufault: null }, // เดือนปี การขายสินค้า
//         details: [{}],
//       },
//     ],
//   },
//   {
//     timestamps: true,
//     versionKey: false,
//     collection: 'skumasters',
//   },
// )

const DepartmentSchema = new mongoose.Schema(
  {
    _id: Number, // icdept_key
    dept_code: String, // ICDEPT_CODE
    dept_thaidesc: String, // ICDEPT_THAIDESC
    dept_engesc: { type: String, default: null }, // ICDEPT_ENGDESC
    dept_access: { type: Number, default: 0 }, // [ICDEPT_ACCESS]
    dept_level: { type: Number, default: 0 }, // [ICDEPT_LEVEL]
    dept_abs_index: { type: Number, default: 0 }, // [ICDEPT_ABS_INDEX]
    dept_parent: { type: Number, default: -1 }, //[ICDEPT_PARENT]
    dept_p_abs_index: { type: Number, default: -1 }, //[ICDEPT_P_ABS_INDEX]
    dept_firschild: { type: Number, default: null }, //[ICDEPT_FIRSTCHILD]
  },
  {
    timestamps: true,
    versionKey: false,
    collection: 'departments',
  },
)

export { DepartmentSchema }
