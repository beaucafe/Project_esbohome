import { StringDate } from "../datetostring";
import {checkBackofficeToPos} from "src/modules/products/update/queries";

const officePostable =  async (connect ,  posID, getData=false) =>{
    let tableName = new StringDate().todateYMD(new Date(), 'yymm')
    let current_day = new StringDate().todateYMD(new Date(), 'y-m-d')
    let strquery = checkBackofficeToPos(tableName, '2020-08-04' , posID)
    console.log(strquery);
    
    let query = await connect.query(strquery)
    let row = await connect.dataRowsAffected(query)
    if(row < 1 ) return false
    
    if(getData === false ) return true
    
    return await connect.dataRecordset(query)
}


export default officePostable