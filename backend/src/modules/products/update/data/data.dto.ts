import {
    IsBoolean,
    IsInt,
    IsMongoId,
    IsString,
    IsNotEmpty,
    IsEmail,
    MinLength,
} from "class-validator"
import { IYYMMDD } from "src/libs/datetostring/date.type"

export class PosnameDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    name: string
}

export class SETTINGPOSDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    name: string

    start?: IYYMMDD

    stop?: IYYMMDD
}

// สำหรับรับการตรวจสอบ input เพื่อเช็คระหว่าง bplus back กับ pos มีการรวบรวมข้อมูลระหว่างวันหรือไม่
export class OfficeHavePosUpdatedDTO {
    @IsNotEmpty()
    @IsString()
    posname: string
}
interface MoY {
    year: number
    month: number
}

type thisMonth = "all" | MoY
type ADay = "all" | number

export class OptionDTO {
    @IsNotEmpty()
    @IsString()
    posname: string

    day: ADay

    thisMonth: thisMonth
}
