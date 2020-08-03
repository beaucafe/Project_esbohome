import { Document, Schema } from 'mongoose'

interface IDoctype extends Document {
  readonly _id: { type: Schema.Types.ObjectID }
  readonly dtkey: Number
  readonly dtcode: String
  readonly dtthainame: String
  readonly dtengname: String
  readonly properties: Number
  readonly runtype: Number
  readonly prefix: String
  readonly digit: Number
  readonly doccode: String
  readonly vatref: String
}

interface IDocrun extends Document {
  readonly _id: { type: Schema.Types.ObjectID }
  readonly drkey: Number
  readonly doctype: { type: Schema.Types.ObjectID }
  readonly dryear: Number
  readonly drmonth: Number
  readonly drseq: Number
}

interface IDocinfo extends Document {
  readonly _id: Schema.Types.ObjectID
  readonly dikey: Number
  readonly doctype: Schema.Types.ObjectID
  readonly docref: String //  อ้างถึงเอกสาร doccode + dryear + drmont +/+ drseq
  // docref: {
  //   name: String,
  //   docdetail: { type: Schema.Types.ObjectID, ref: 'Docdetails' },
  // },
  readonly create_by: String
  readonly create_computer: String
  readonly remark: String
}

interface detail extends Document {
  readonly goodkey?: Number // trd_goods
  readonly skukey?: Number // trd_sku
  readonly goodcode?: String // trd_keyin
  readonly thainame?: String // Trd_sh_name
  readonly pur_amount?: { type: Schema.Types.Decimal128 } // Trd_sh_qty
  readonly cost?: { type: Schema.Types.Decimal128 } // Trd_sh_uprc
  readonly sell?: { type: Schema.Types.Decimal128 } // trd_sh_gsell
  readonly vat?: { type: Schema.Types.Decimal128 } // trd_sh_gvat
  readonly vat_type?: Number // trd_vat_ty
  readonly vat_rate?: { type: Schema.Types.Decimal128 } // trd_vat_r
  readonly u_quantity?: { type: Schema.Types.Decimal128 } // trd_utqqty , จำนวน * ของหน่วยนับ
  readonly u_name?: String // trd_utqname ชื่อหน่วยนับ
  readonly free?: { type: Schema.Types.Decimal128 } // trd_q_free
  readonly skumove_key?: Number
}

interface IDocdetail extends Document {
  readonly _id: { type: Schema.Types.ObjectID }
  readonly dtailkey: { type: Number; unique: true }
  readonly docinfo: { type: Schema.Types.ObjectID; ref: 'Docinfos' }
  readonly items: Number // จำนวนรายการ
  readonly quantity: Number // จำนวนรวมทั้งหมด
  readonly details: detail
}
export { IDoctype, IDocrun, IDocinfo, IDocdetail }
