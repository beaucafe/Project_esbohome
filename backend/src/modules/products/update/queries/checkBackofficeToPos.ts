import { IYYMMDD } from "src/models/pos/posdata.interface"

const checkBackofficeToPos = (tablename: string, date: string, posID:number ) =>{
    let defaultTable = tablename
    return `SELECT TOP 1 PSH_KEY ,PSH_POS ,PSH_SESSION,PSH_TYPE
    ,PSH_NO ,PSH_DATE
    FROM H${defaultTable}
    where psh_date = '${date}' and PSH_POS='${posID}'
    order by psh_key desc
    `
}

export default checkBackofficeToPos