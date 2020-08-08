import { Injectable } from "@nestjs/common"
import { DataRepository } from "./data.repository"
import { changeStatus } from "src/utilities/change.status"
import { defaultResponse } from "src/types/pos/default.response"
// import { DataMonthly } from './data.month'
import { ISummaryByPOS } from "src/models/pos/posdata.interface"
import { DataDaily } from "./data.daily"
import { ISETTIME } from "src/libs/datetostring/date.type"
import { DataMonthly } from "./data.month"

interface IPosname {
    name: string
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
export class DataService {
    private result = new defaultResponse()
    constructor(
        private db: DataRepository,
        private month: DataMonthly,
        private daily: DataDaily,
    ) {}
    Hello = () => "Update data!!!."

    // getPosconfig() {
    //   return this.db.Poscontrol()
    // }

    test() {
        return this.month.getByPos()
        // return this.month.gettblPosName('possss1')
    }

    async monthbypos(option?: IOption) {
        // console.log(option)

        const data = !option
            ? await this.month.getByPos()
            : await this.month.getByPos(option)

        const result = await this.month.getSummary(data)

        // console.log(data.length)

        return { result }
        // return this.month.gettblPosName('possss1')
    }

    checkBplusofficePosHaveUpdated(posname) {
        const { name } = posname
        return this.daily.checkBplusofficePosHaveUpdated(name)
    }

    dailyTest(posname: string, setTime?: ISETTIME) {
        if (setTime === undefined) return this.daily.dailytest(posname)

        return this.daily.dailytest(posname, setTime)

        // return this.month.gettblPosName('possss1')
    }

    tablepos(posname: IPosname) {
        const { name } = posname
        return name
    }

    async manualAdjPoscontrol(posname: IPosname) {
        const { name } = posname

        return await this.db.Poscontrol(name)
    }

    async AddtablePaymentType() {
        return await this.db.addTablePaymentType()
    }

    // async updatePosdataByPos(posname: IPosname) {
    //   const { name } = posname
    //   return await this.db.PosdataByPosName_Daily(name)
    // }
    // async updatePosdataByPosV2(posname: IPosname) {
    //   const { name } = posname
    //   return await this.db.PosdataByPosName_Daily_V2(name)
    // }

    // async getSummaryMonth(posname: IPosname): Promise<ISummaryByPOS> {
    //   const { name } = posname
    //   return await this.month.getSumMonth(name)
    // }
}
