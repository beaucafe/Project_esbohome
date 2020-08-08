const Poscontrol = (string?: string) => {
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

  export default Poscontrol