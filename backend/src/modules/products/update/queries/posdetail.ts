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

export default POSDetails