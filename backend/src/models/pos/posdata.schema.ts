import * as mongoose from 'mongoose'
import { Schema } from 'mongoose'

const PosData001Schema = new mongoose.Schema(
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
    collection: 'posData001',
  },
)

const PosData002Schema = new mongoose.Schema(
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
    collection: 'posData002',
  },
)

const PosData003Schema = new mongoose.Schema(
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
    collection: 'posData003',
  },
)

const PosData004Schema = new mongoose.Schema(
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
    collection: 'posData004',
  },
)

//#region Poscontrol
const PoscontrollerSchema = new mongoose.Schema(
  {
    _id: Number,
    pos_station: String,
    pos_name: String,
    pos_branch: Number,
    pos_taxID: String,
    pos_posID: String,
    pos_control: [
      {
        _id: false,
        cIndex: Number,
        dataTable: Number,
        date_from: Date,
        date_to: Date,
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,

    collection: 'PosControllers',
  },
)
//#endregion

//#region PaymentType
const PaymentTypeSchema = new mongoose.Schema(
  {
    _id: Number,
    pay_code: String,
    pay_name: String,
    pay_eng_name: String,
    pay_enabled: String,
    pay_cat: Number,
    pay_card_no: Number,
    pay_apr_need: Number,
    pay_apr_amt: Number,
    pay_chg_pcnt: Number,
    pay_chg_rate: Number,
    pay_min_amt: Number,
    pay_change: Number,
    pay_cash: Number,
    pay_systype: Number,
    pmt_ac: Number,
  },
  {
    timestamps: true,
    versionKey: false,
    collection: 'PaymentTypes',
  },
)
//#endregion

//#region Posdata
// ปรับปรุงใหม่ 20/7/2020
//  23/7/2020  ปรับปรุง  DailyRunning  โดยเพิ่ม ข้อสรุปการขายรายวัน
//  28/7/2020  ยกเลิก เนื่องจากมีปัญหาการเก็บข้อมูลที่ใหญ่กว่า 16MBytes / Bson
const POSDataxSchema = new mongoose.Schema(
  {
    MonthlyRunning: String, //yearMonth  , 202007
    POINTOFSALE: [
      {
        _id: false,
        POSID: { type: Number, unique: true, ref: 'Poscontroller' }, //PSH_POS
        POSName: { type: String, unique: true },
        mSalesTotal: Number,
        mSalesPreTaxTotal: Number,
        mSalesTaxAmountTotal: Number,
        mBill_salesTotal: Number,
        mBill_memberTotal: Number,
        mBill_cancelTotal: Number,
        DailyRunning: [
          {
            _id: String, // tablePosName by dailay
            DateAt: String, // รายวัน  yymmdd
            salesTaxTotal: Number,
            salesPreTax: Number,
            taxAmount: Number,
            billSalesTotal: Number,
            billMembers: Number,
            billCancel: Number,
            POSDetails: [
              {
                // _id: String,
                _id: Number, // PSH_KEY  = billID
                billPos: Number, // PSH_POS
                billType: Number, // PSH_TYPE
                billStatus: Number, // PSH_STATUS
                billNo: String, //  เลขที่เอกสาร PSH_NO  => Table D check this's here PSD_PSH = PSH_KEY
                billDeatil: [
                  {
                    _id: Number, // PSD_KEY
                    status: Number, // PSD_STATUS
                    billID_ref: Number, // PSD_PSH = PSH_KEY
                    sKey: { type: Number, ref: 'Skumasters' }, // PSD_SKU
                    gKey: String, // PSD_GOODs
                    barcode: String, // PSD_Keyin
                    product_name: String, // SKU_NAME
                    weight: Number, // PSD_WEIGHT
                    amountSold: Number, // จำนวนที่ขาย PSD_QTY
                    unit_count: Number, // Unit of counting, UTQQTY, PSD_UTQQTY จำนวนนับ
                    unit_name: String,
                    normal_price: { type: Number },
                    spacial_price: { type: Number },
                    discount: { type: Number },
                    selling_price: Number,
                  },
                ],
                billDate: Date,
                billStart: Date,
                billStopt: Date,
                billCashier: String,
                billMbcode: String,
                billMbcard: String,
                billMbRdm: Number,
                billMbpoint: Number,
                billMbbirth: Number,
                billSlmcode: String, // sale man code
                billCharge: Number,
                billSV: Number,
                billNV: Number,
                billVat: Number,
                billQty: Number, // จำนวนรายการ
                billItems: Number, // จำนวน สินค้า
                billTaxInv: String, // invoice
                billCntInv: Number, // invoice count
                billAddbook: Number, // customer addbook
              },
            ],
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
    collection: 'POSDatax',
  },
)
//#endregion

const PosdataSchema = new Schema(
  {
    Monthly: { type: String, unique: true, trim: true },
    dailyRunning: [
      {
        _id: { type: Schema.Types.ObjectId, ref: 'PosdataRunning' },
        date: String,
      },
    ],
    //dailyRunning: [{ type: Schema.Types.ObjectId, ref: 'PosdataRunning' }],
  },
  {
    timestamps: true,
    versionKey: false,
    collection: 'Posdata',
  },
)

const PosdataRunningSchema = new Schema(
  {
    dailyRunning: { type: String, unique: true, trim: true },
    POINTOFSALE: [
      {
        _id: false,
        DateAt: String, // รายวัน  yymmdd
        POSTable: String, // tablePosName by dailay
        POSID: { type: Number, ref: 'Poscontroller' }, //PSH_POS
        POSName: String,
        salesTaxTotal: Number,
        salesPreTax: Number,
        taxAmount: Number,
        billSalesTotal: Number,
        billMembers: Number,
        billCancel: Number,
        POSDetails: [
          {
            // _id: String,
            _id: Number, // PSH_KEY  = billID
            billPos: Number, // PSH_POS
            billType: Number, // PSH_TYPE
            billStatus: Number, // PSH_STATUS
            billNo: String, //  เลขที่เอกสาร PSH_NO  => Table D check this's here PSD_PSH = PSH_KEY
            billDeatil: [
              {
                _id: Number, // PSD_KEY
                status: Number, // PSD_STATUS
                billID_ref: Number, // PSD_PSH = PSH_KEY
                sKey: { type: Number, ref: 'Skumasters' }, // PSD_SKU
                gKey: String, // PSD_GOODs
                barcode: String, // PSD_Keyin
                product_name: String, // SKU_NAME
                weight: Number, // PSD_WEIGHT
                amountSold: Number, // จำนวนที่ขาย PSD_QTY
                unit_count: Number, // Unit of counting, UTQQTY, PSD_UTQQTY จำนวนนับ
                unit_name: String,
                normal_price: { type: Number },
                spacial_price: { type: Number },
                discount: { type: Number },
                selling_price: Number,
              },
            ],
            billDate: Date,
            billStart: Date,
            billStopt: Date,
            billCashier: String,
            billMbcode: String,
            billMbcard: String,
            billMbRdm: Number,
            billMbpoint: Number,
            billMbbirth: Number,
            billSlmcode: String, // sale man code
            billCharge: Number,
            billSV: Number,
            billNV: Number,
            billVat: Number,
            billQty: Number, // จำนวนรายการ
            billItems: Number, // จำนวน สินค้า
            billTaxInv: String, // invoice
            billCntInv: Number, // invoice count
            billAddbook: Number, // customer addbook
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
    collection: 'Posdatarunning',
  },
)

//#region Table H

//#endregion

//#region  Export module
export {
  PoscontrollerSchema,
  PaymentTypeSchema,
  POSDataxSchema,
  PosData001Schema,
  PosData002Schema,
  PosData003Schema,
  PosData004Schema,
  PosdataSchema,
  PosdataRunningSchema,
}
//#endregion
