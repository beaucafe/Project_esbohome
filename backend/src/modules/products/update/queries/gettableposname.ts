const date = new Date()
let day = date.getDate()
let month = date.getMonth() < 12 ? date.getMonth() + 1 : 1
let year = date.getFullYear()

const getTablePosname = `SELECT  TOP 1
        POSC_FM_DATE as Datetime ,POSC_TABLE as Tablename
        FROM POSCONTROL 
        where POSC_FM_DATE= '${year}-${month}-${day}'
        order by posc_key desc`

export default getTablePosname