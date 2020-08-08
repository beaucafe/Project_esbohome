import { IYYMMDD } from "src/models/pos/posdata.interface";
import {StringDate} from '../datetostring'
import checkBackofficeToPos from "src/modules/products/update/queries/checkBackofficeToPos";
import PoolService from "src/utilities/mssql/pool.service";

class officePostable {
    constructor() {
        
    }

    private _getTablePosBackoffice(connect, date,  posID){
        let tableName = new StringDate().todateYMD(new Date(), 'yymm')
        let strquery = checkBackofficeToPos(tableName, date , posID)
        console.log(strquery);
        
        // const connect = new PoolService('default')
        // let query = await connect.query(strquery)
        // let row = await connect.dataRowsAffected(query)
        return this._queries(connect, strquery)

    }

    private _queries = async (connect, strquery) =>{
        let query = await connect.query(strquery)
        let row = await connect.dataRowsAffected(query)
        if(row < 1) return false
        return true
    }

    public get getTablePosBackoffice(){
        return this._getTablePosBackoffice
    }

    public set getTablePosBackoffice(value){
        this._getTablePosBackoffice = value
    }
}

export default officePostable