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

  export default BillDetail
  