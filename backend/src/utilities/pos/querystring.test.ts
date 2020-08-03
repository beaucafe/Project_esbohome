// const date = new Date()
// let day = date.getDate()
// let month = date.getMonth() < 12 ? date.getMonth() + 1 : 1
// let year = date.getFullYear()

// // ยอดขาย
// //307  ใบขายสินค้า, ใบรวบรวมขายสินค้าจาก Pos, ใบกำกับภาษีเต็มรูปแทนใบกำกับภาษีอย่างย่อ, ใบขายสินค้า/ใบส่งสินค้า, ใบขายสินค้า สาขาปากเพรียว, ใบขายเชื่อ สข.สระบุรี, ใบขายเชื่อ สข.ปากเพรียว, ใบขายสินค้า สาขา00003
// //302  ใบขายสด, ใบขายสดPos, ใบขายสดPos สาขา ปากเพรียว, ใบขายสด สาขา ปากเพรียว, ใบขายสด Online สาขาสระบุรี, ใบขายสด Online สาขา ปากเพรียว, ใบขายสด สาขา00003
// //308  ใบรับคืนสินค้าจากการขาย, ใบรับคืนสินค้าเพื่อเคลม, ใบรับคืนสินค้าจากการขาย สข.ปากเพรียว, ใบรับคืนสินค้าจากการขาย สข.00003,
// //337  ใบรับคืนเงินสด, ใบรับคืนเงินสดPos, ใบรับคืนเงินสด pos สาขาปากเพรียว, ใบรับคืนเงินสดหลังร้าน สาขาปากเพรียว
// const circuLation = `SELECT
// SKUMASTER.SKU_CODE ,
// SKUMASTER.SKU_NAME ,
// DOCTYPE.DT_PROPERTIES,
// SUM(SKUMOVE.SKM_QTY)  SKM_QTY,
// SUM(SKUMOVE.SKM_Q_FREE)  SKM_Q_FREE,
// SUM(SKUMOVE.SKM_COST)  SKM_COST,
// SUM(SKUMOVE.SKM_SELL)  SKM_SELL,
// SUM(SKUMOVE.SKM_VAT)  SKM_VAT,
// SKUMASTER.SKU_PRICE,
// SKUMASTER.SKU_EQ_FACTOR,
// UOFQTY.UTQ_QTY,
// UOFQTY.UTQ_NAME
// FROM
//  SKUMOVE JOIN SKUMASTER ON SKUMOVE.SKM_SKU = SKUMASTER.SKU_KEY
// JOIN UOFQTY ON SKUMASTER.SKU_S_UTQ = UOFQTY.UTQ_KEY
// JOIN ICCAT ON SKUMASTER.SKU_ICCAT = ICCAT.ICCAT_KEY
// JOIN BRAND ON SKUMASTER.SKU_BRN = BRAND.BRN_KEY
// JOIN ICDEPT ON SKUMASTER.SKU_ICDEPT = ICDEPT.ICDEPT_KEY
// JOIN SKUALT ON SKUMASTER.SKU_SKUALT = SKUALT.SKUALT_KEY
// JOIN WARELOCATION ON SKUMOVE.SKM_WL = WARELOCATION.WL_KEY
// JOIN WAREHOUSE ON WARELOCATION.WL_WH = WAREHOUSE.WH_KEY
// JOIN DOCINFO ON  SKUMOVE.SKM_DI = DOCINFO.DI_KEY
// JOIN DOCTYPE ON DOCINFO.DI_DT = DOCTYPE.DT_KEY
// JOIN ARDETAIL ON DOCINFO.DI_KEY = ARDETAIL.ARD_DI
// JOIN ARFILE ON ARDETAIL.ARD_AR = ARFILE.AR_KEY
// JOIN ARCAT ON ARFILE.AR_ARCAT = ARCAT.ARCAT_KEY
// JOIN SLDETAIL ON DOCINFO.DI_KEY = SLDETAIL.SLD_DI
// JOIN SALESMAN ON SLDETAIL.SLD_SLMN = SALESMAN.SLMN_KEY
// JOIN TRANSTKH ON DOCINFO.DI_KEY = TRANSTKH.TRH_DI
// JOIN DEPTTAB ON TRANSTKH.TRH_DEPT = DEPTTAB.DEPT_KEY
// JOIN BRANCH ON TRANSTKH.TRH_BR = BRANCH.BR_KEY
// JOIN PRJTAB ON TRANSTKH.TRH_PRJ = PRJTAB.PRJ_KEY
// WHERE
// DOCINFO.DI_ACTIVE = 0 AND
// (DOCTYPE.DT_PROPERTIES = 307 OR
// DOCTYPE.DT_PROPERTIES = 302 OR
// DOCTYPE.DT_PROPERTIES = 308 OR
// DOCTYPE.DT_PROPERTIES=337 ) AND
// DOCINFO.DI_DATE between '${year}-${month}-${day}' and '${year}-${month}-${day}'

// GROUP  BY
// SKUMASTER.SKU_CODE,
// SKUMASTER.SKU_NAME,
// SKUMASTER.SKU_E_NAME,
// DT_PROPERTIES,
//  SKUMASTER.SKU_PRICE,
// SKUMASTER.SKU_EQ_FACTOR,
//  UOFQTY.UTQ_QTY,
//  UOFQTY.UTQ_NAME`
