import { IYYMMDD } from 'src/models/pos/posdata.interface'

const date = new Date()
let day = date.getDate()
let month = date.getMonth() < 12 ? date.getMonth() + 1 : 1
let year = date.getFullYear()

let monthlyRunning = `${year}${month.toString().padStart(2, '0')}`
let dailyRunning = `${year}${month
  .toString()
  .padStart(2, '0')}${day.toString().padStart(2, '0')}`

const dailyTablePos = `SELECT  TOP 1
        POSC_FM_DATE as Datetime ,POSC_TABLE as Tablename
        FROM POSCONTROL 
        where POSC_FM_DATE= '${year}-${month}-${day}'
        order by posc_key desc`

const strDepartment = `SELECT [ICDEPT_KEY] as id
,ICDEPT_CODE as dept_code
,ICDEPT_THAIDESC as dept_thaidesc
,ICDEPT_ENGDESC as dept_engesc
,ICDEPT_ACCESS as dept_access
,ICDEPT_LEVEL as  dept_level
,ICDEPT_ABS_INDEX as dept_abs_index
,ICDEPT_PARENT as dept_parent
,ICDEPT_P_ABS_INDEX as ept_p_abs_index
,ICDEPT_FIRSTCHILD as dept_firschild
FROM ICDEPT`

const strPosconfig = `SELECT [POS1_KEY] as _id
,[POS1_STATION] as pos_station
,[POS1_NAME] as pos_name
,[POS1_BR] as pos_branch
,[POS1_TAX_ID] as pos_taxID
,[POS1_POS_ID] as pos_posID
FROM [POSCONFIG1]`

const strPoscontrol = (string?: string) => {
  const top = ``
  const where = string
  const strquery = `SELECT ${top} POS1_KEY as _id
      ,POS1_STATION as pos_station
      ,POS1_NAME as pos_name
      ,POS1_BR as pos_branch
      ,POS1_TAX_ID as pos_taxID
      ,POS1_POS_ID as pos_posID
      ,POSC_INDEX as cIndex
      ,POSC_TABLE as dataTable
      ,POSC_FM_DATE as date_from
      ,POSC_TO_DATE as date_to
      FROM POSCONFIG1 
      JOIN POSCONTROL on POSC_POS = POS1_KEY
      ${where}
      order by POSC_INDEX asc`

  return strquery
}

const paymentType = `SELECT [PMT_KEY] as _id
          ,[PMT_CODE] as pay_code
          ,[PMT_NAME] as pay_name
          ,[PMT_E_NAME] as pay_eng_name
          ,[PMT_ENABLED] as pay_enabled
          ,[PMT_CAT] as pay_cat
          ,[PMT_CARD_NO] as pay_card_no
          ,[PMT_APR_NEED] as pay_apr_need
          ,[PMT_APR_AMT] as pay_apr_amt
          ,[PMT_CHG_PCNT] as pay_chg_pcnt
          ,[PMT_CHG_RATE] as pay_chg_rate
          ,[PMT_MIN_AMT] as pay_min_amt
          ,[PMT_CHANGE] as pay_change
          ,[PMT_CASH] as pay_cash
          ,[PMT_SYSTYPE] as pay_systype
          ,[PMT_AC] as pmt_ac

          FROM [PAYMENTTYPE]`

//#region  table  H
const POSDetails = (tablePos) => `SELECT [PSH_KEY] as _id
      ,[PSH_POS] as billPos
      ,[PSH_TYPE] as billType
	    ,[PSH_STATUS] as billStatus
      ,[PSH_NO] as billNo
      ,[PSH_DATE] as billDate
      ,[PSH_START] as billStart
      ,[PSH_STOP] as billStopt
      ,[PSH_CASHIER] as billCashier
      ,[PSH_MBCODE] as billMbcode
      ,[PSH_MBCARD] as billMbcard
	    ,[PSH_MB_RDM] as billMbRdm
      ,[PSH_MB_POINT] as billMbpoint
      ,[PSH_MB_BIRTH] as billMbbirth
      ,[PSH_SLMNCODE] as billSlmcode
      ,[PSH_CHARGE] as billCharge
      ,[PSH_N_SV] as billSV
      ,[PSH_N_NV] as billNV
      ,[PSH_N_VAT] as billVat
      ,[PSH_N_QTY] as billQty
      ,[PSH_N_ITEMS] as billItems
      ,[PSH_TAX_INV] as billTaxInv
      ,[PSH_CNT_INV] as billCntInv
      ,[PSH_ADDB] as billAddbook

  FROM H${tablePos} 
  ORDER BY PSH_KEY ASC`
//#endregion

const BillDetail = (tablePos) => {
  let top = ``
  const string = `SELECT ${top} 
    PSD_KEY as _id, 
    PSD_STATUS as status,
    PSD_PSH as billID_ref,
    PSD_SKU as sKey, 
    PSD_GOODS as gKey,
    PSD_KEYIN as barcode,
    SKU_NAME as product_name, 
    PSD_WEIGHT as weight ,
    PSD_QTY as amountSold,
    PSD_UTQQTY as unit_count,
    UTQ_NAME as unit_name,  
    PSD_NM_PRC as normal_price, 
    PSD_SP_PRC as spacial_price,
 CASE
   when psd_sp_prc > 0 then (((PSD_NM_PRC-PSD_SP_PRC)))
   ELSE 0
 end  as discount,
 PSD_G_AMT as selling_price
 
 

 from D${tablePos}
 join GOODSMASTER on goods_key = PSD_GOODS
 JOIN SKUMASTER on PSD_SKU = SKU_KEY
 join UOFQTY on UTQ_KEY = GOODS_UTQ

order by psd_key asc`

  return string
}

export {
  strPosconfig,
  strDepartment,
  strPoscontrol,
  paymentType,
  dailyTablePos,
  POSDetails, // table H
  // BillDetail,
  BillDetail,
  monthlyRunning,
  dailyRunning,
}
