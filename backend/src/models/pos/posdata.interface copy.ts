interface IPoscontrol {
  _id: number
  pos_station: String
  pos_name: String
  pos_branch: Number
  pos_taxID: String
  pos_posID: String
  pos_control: [
    {
      cIndex: Number
      dataTable: Number
      date_from: Date
      date_to: Date
    },
  ]
}

interface IPaymentType {
  _id: number
  pay_code: string
  pay_name: string
  pay_eng_name: string
  pay_enabled: string
  pay_cat: number
  pay_card_no: number
  pay_apr_need: number
  pay_apr_amt: number
  pay_chg_pcnt: number
  pay_chg_rate: number
  pay_min_amt: number
  pay_change: number
  pay_cash: number
  pay_systype: number
  pmt_ac: number
}

// interface IPOSData1 {
//   _id: string
//   POSNumber: number
//   POSName: string // หมายเลขเครื่อง, ชื่อเครื่อง,  ข้อมูได้จาก table H  key => PSH....
//   POSData_monthly: IMonthRunning
// }

interface IPOSData {
  _id?: string
  MonthlyRunning?: string //yearMonth  , 202007
  POINTOFSALE: [
    {
      POSID: number
      POSName: string
      mSalesTotal?: number
      mSalesPreTaxTotal?: number
      mSalesTaxAmountTotal?: number
      mBill_salesTotal?: number
      mBill_memberTotal?: number
      mBill_cancelTotal?: number
      DailyRunning: [
        {
          _id: string
          DateAt: string // รายวัน
          salesTaxTotal?: number
          salesPreTax?: number
          taxAmount?: number
          billSalesTotal?: number
          billMembers?: number
          billCancel?: number
          POSDetails?: IPOSDetails
        },
      ]
    },
  ]
}

interface IDailyRunning {
  _id: string
  DateAt: string // รายวัน
  salesTaxTotal?: number
  salesPreTax?: number
  taxAmount?: number
  billSalesTotal?: number
  billMembers?: number
  billCancel?: number
  POSDetails?: IPOSDetails
}

// interface IMonthRunning {
//   _id: string //  ปีเดือน
//   daily_detail: IDailydetail
// }

interface IPOSDetails {
  // _id: string // POS${no}${table}
  _id: number // PSH_KEY
  billPos: number // PSH_POS
  billType: number
  billStatus: number
  billNo: string //  เลขที่เอกสาร PSH_NO  => Table D check this's here PSD_PSH = PSH_KEY
  billDeatil?: IBilldetail //  object
  billDate: Date
  billStart: Date
  billStopt: Date
  billCashier: string
  billMbcode: string
  billMbcard: string
  billMbRdm: number
  billMbpoint: number
  billMbbirth: number
  billSlmcode: string // sale man code
  billCharge: number
  billSV: number
  billNV: number
  billVat: number
  billQty: number // จำนวนรายการ
  billItems: number // จำนวน สินค้า
  billTaxInv: string // invoice
  billCntInv: number // invoice count
  billAddbook: number // customer addbook
}
interface IBilldetail {
  _id: number // PSD_KEY
  status: number // PSD_STATUS
  billID_ref: number // PSD_PSH
  sKey: number // PSD_SKU
  gKey: string // PSD_GOODs
  barcode: string // PSD_Keyin
  product_name: string // SKU_NAME
  weight: number // PSD_WEIGHT
  amountSold: number // จำนวนที่ขาย PSD_QTY
  unit_count: number // Unit of counting, UTQQTY, PSD_UTQQTY จำนวนนับ
  unit_name: String
  normal_price: number
  spacial_price: number
  discount: number
  selling_price: number
}

interface ISummaryByPOS {
  mSalesTotal: number
  mSalesPreTaxTotal: number
  mSalesTaxAmountTotal: number
  mBill_salesTotal: number
  mBill_memberTotal: number
  mBill_cancelTotal: number
}

interface IYYMMDD {
  year: number
  month: number
  day: number
}

interface ITablename {
  Datetime: Date
  Tablename: string
}

export {
  IPoscontrol,
  IPaymentType,
  IPOSData,
  IBilldetail,
  IPOSDetails,
  ISummaryByPOS,
  IYYMMDD,
  ITablename,
  IDailyRunning,
}
