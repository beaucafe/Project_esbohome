import { StringDate } from "../datetostring";
import {checkBackofficeToPos} from "src/modules/products/update/queries";


interface IOFFICEINPUT{
    connect : any
    posID : number
    getData? : boolean 
}

const officePostable =  async (input : IOFFICEINPUT) =>{
    const {connect, posID, getData = false} = input
    let tableName = new StringDate().todateYMD(new Date(), 'yymm')
    let current_day = new StringDate().todateYMD(new Date(), 'y-m-d')
    let strquery = checkBackofficeToPos(tableName, current_day , posID)
    console.log(strquery);
    
    let query = await connect.query(strquery)
    let row = await connect.dataRowsAffected(query)
    if(row < 1 ) return false
    
    if(getData === false ) return true
    
    return await connect.dataRecordset(query)
}


export default officePostable