import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import PoolService from "src/utilities/mssql/pool.service"
import { IPOSDATA, IPOSDATARUNNING } from "src/models/pos/posdata.interface"
import { Injectable } from "@nestjs/common"
import { dataClass } from "./data.class"
import { StringDate } from "src/libs/datetostring"

interface IResult {
    sum_Total: number
    sum_billTotal: number
    sum_billMembers: number
    date_records: []
}

interface IPOSOFSALE {
    salesTaxTotal: number
    billSalesTotal: number
    billMembers: number
}

interface IDataInput {
    dailyRunning: string
    POINTOFSALE: IPOSOFSALE
}
interface IPOSDATAs {
    POSData: IDataInput
}
interface IdataMonthly {
    getByPos: () => {}
    getSummary: object
}

interface MoY {
    year: number
    month: number
}

type thisMonth = "all" | MoY
type ADay = "all" | number

interface IOption {
    posname: string
    day: ADay
    thisMonth: thisMonth
}

@Injectable()
export class DataMonthly implements IdataMonthly {
    get getByPos() {
        return this._getByPos
    }
    set getByPos(value) {
        this._getByPos = value
    }

    get getSummary() {
        return this._getSummary
    }

    set getSummary(value) {
        this._getSummary = value
    }
    constructor(
        @InjectModel("Posdata") private posdataModel: Model<IPOSDATA>,
        // @InjectModel('Posdatarunning') private runningModel: Model<IPOSDATARUNNING>,
        private _posdate: dataClass,
    ) {}

    // private async _getAll(){
    //     let query = await this.posdataModel.findOne({Monthly:'202008'})
    //     .populate({ path: 'dailyRunning._id' })
    //     return {something:query}

    // }

    private _getSummary(data: IPOSDATAs[]) {
        let loop = 0
        const result = {
            sum_Total: 0,
            sum_billTotal: 0,
            sum_billMembers: 0,
            date_records: [],
        }

        data.forEach((e) => {
            const { POINTOFSALE, dailyRunning } = e.POSData
            // console.log(dailyRunning)

            result.sum_Total += POINTOFSALE.salesTaxTotal
            result.sum_billTotal += POINTOFSALE.billSalesTotal
            result.sum_billMembers += POINTOFSALE.billMembers

            if (result.date_records[loop] !== dailyRunning && loop === 0) {
                result.date_records[loop] = dailyRunning
                loop++
            }
            if (result.date_records[loop - 1] !== dailyRunning) {
                result.date_records[loop] = dailyRunning
                loop++
            }
        })

        return result
    }

    private _getByPos(option?: IOption): Promise<any> {
        try {
            // console.log(option)

            let posName = !option.posname ? null : option.posname

            const cMonth = !option.thisMonth
                ? new StringDate().todateYMD(new Date(), "yymm")
                : option.thisMonth instanceof Object
                ? `${
                      option.thisMonth.year
                  }${option.thisMonth.month.toString().padStart(2, "0")}`
                : option.thisMonth // output = 'all'

            const cDay = !option.day
                ? new StringDate().todateYMD(new Date(), "yymmdd")
                : option.thisMonth instanceof Object && option.day !== "all"
                ? `${
                      option.thisMonth.year
                  }${option.thisMonth.month
                      .toString()
                      .padStart(2, "0")}${option.day
                      .toString()
                      .padStart(2, "0")}`
                : option.day // output = 'all'

            let fristDateofMonth = `${cMonth}01`

            if (cDay === "all" && cMonth === "all") {
                fristDateofMonth = `${new StringDate().todateYMD(
                    new Date(),
                    "yymm",
                )}01`
            } else if (cDay === "all" && cMonth !== "all") {
                fristDateofMonth = `${cMonth}01`
            } else if (cDay !== "all" && cMonth === "all") {
                fristDateofMonth = `${new StringDate().todateYMD(
                    new Date(),
                    "yymm",
                )}${option.day.toString().padStart(2, "0")}`
            } else {
                fristDateofMonth = `${cMonth}${option.day
                    .toString()
                    .padStart(2, "0")}`
            }

            let lastDateofMonth = new StringDate().todateYMD(
                new Date(),
                "yymmdd",
            )
            // console.log(`lastDateofMonth : ${lastDateofMonth}`)
            if (option.thisMonth instanceof Object) {
                // console.log("month : object")

                lastDateofMonth = new StringDate().todateYMD(
                    new Date(option.thisMonth.year, option.thisMonth.month, 0),
                    "yymmdd",
                )
            }

            const currentDay = fristDateofMonth
            // console.log(lastDateofMonth)

            const currentMonth =
                cMonth === "all"
                    ? new StringDate().todateYMD(new Date(), "yymm")
                    : cMonth
            // console.log(currentMonth)

            if (posName === null)
                throw new Error(
                    "Pos name : error กรุณาใส่ชื่อเครื่องให้ถูกต้อง!",
                )

            const posID =
                posName === "all" ? null : this._posdate.PosID(posName)
            // console.log("currentDay : " + currentDay)

            const match =
                posName === "all"
                    ? cDay !== "all"
                        ? { "POSData.dailyRunning": { $eq: currentDay } }
                        : {
                              "POSData.dailyRunning": {
                                  $gte: fristDateofMonth,
                                  $lte: lastDateofMonth,
                              },
                          }
                    : cDay !== "all"
                    ? {
                          "POSData.POINTOFSALE.POSID": { $eq: posID },
                          "POSData.dailyRunning": { $eq: currentDay },
                      }
                    : {
                          "POSData.POINTOFSALE.POSID": { $eq: posID },
                          "POSData.dailyRunning": {
                              $gte: fristDateofMonth,
                              $lte: lastDateofMonth,
                          },
                      }

            // console.log(match)

            const mongodb = this.posdataModel.aggregate([
                { $match: { Monthly: currentMonth } },

                {
                    $lookup: {
                        from: "Posdatarunning",
                        localField: "dailyRunning._id",
                        foreignField: "_id",
                        as: "POSData",
                    },
                },
                { $unwind: { path: "$POSData" } },
                { $unwind: { path: "$POSData.POINTOFSALE" } },
                {
                    $match: match,
                },
                // { $unwind: '$POINTOFSALE.POSDetails' },

                // { $unwind: '$POINTOFSALE.DailyRunning.DateAt' },
                {
                    $project: {
                        _id: 0,
                        dailyRunning: 0,
                        createdAt: 0,
                        updatedAt: 0,
                        "POSData.POINTOFSALE.POSDetails": 0,
                    },
                },
            ])
            // console.log(mongodb.length)

            return mongodb
        } catch (error) {
            return error.message
        }
    }
}
