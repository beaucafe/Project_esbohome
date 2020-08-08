import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import PoolService from 'src/utilities/mssql/pool.service'
import { IPOSDATA, IPOSDATARUNNING } from 'src/models/pos/posdata.interface'
import { Injectable } from '@nestjs/common'
import { dataClass } from './data.class'
import { StringDate } from 'src/libs/datetostring'

interface IdataMonthly{
    getAll: ()=>{}
}
interface IOption{
    posname : string
    day : number
    month : number
    year : number

}

@Injectable()
export class DataMonthly implements IdataMonthly {
    get getAll(){
        return this._getByPos
    }
    set getAll(value){
        this._getByPos = value
    }
    constructor(
        @InjectModel('Posdata') private posdataModel: Model<IPOSDATA>,
        // @InjectModel('Posdatarunning') private runningModel: Model<IPOSDATARUNNING>,
        private _posdate: dataClass,
    ){
        
    }

    // private async _getAll(){
    //     let query = await this.posdataModel.findOne({Monthly:'202008'})
    //     .populate({ path: 'dailyRunning._id' })
    //     return {something:query}

    // }

        private async _getByPos(option?:IOption){
            let posname =  'pos1'
            console.log(option);
            
            const currentMonth = new StringDate().todateYMD(new Date(), 'yymm')
            const currentDay = new StringDate().todateYMD(new Date(), 'yymmdd')
            const posID = this._posdate.PosID(posname)
            const mongodb = await this.posdataModel.aggregate([
                { $match: { Monthly: currentMonth } },
                
                { $lookup: {
                    "from" : "Posdatarunning",
                    "localField" : "dailyRunning._id",
                    "foreignField" : "_id",
                    "as" : "POSData"
                }},
                { $unwind: { path: '$POSData' } },
                { $unwind: { path: '$POSData.POINTOFSALE' } },
                {
                  $match: {
                    'POSData.POINTOFSALE.POSID': { $eq: posID },
                     'POSData.dailyRunning': {$eq: currentDay},
                  },
                },
                // { $unwind: '$POINTOFSALE.POSDetails' },

                // { $unwind: '$POINTOFSALE.DailyRunning.DateAt' },
                { $project: { _id: 0 , dailyRunning:0, createdAt:0 , updatedAt:0, 'POSData.POINTOFSALE.POSDetails':0} },
              ])
            //   console.log(mongodb);
              
        return mongodb[0]
    }


}