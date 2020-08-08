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
export default paymentType