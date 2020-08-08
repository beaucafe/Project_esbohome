import { IYYMMDD } from 'src/libs/datetostring/date.type'
export default class StringDate {
  private _years: number | string
  public get year(): number | string {
    return this._years
  }
  public set year(value: number | string) {
    this._years = value
  }

  private _monthly: number | string
  public get month(): number | string {
    return this._monthly
  }
  public set month(value: number | string) {
    this._monthly = value
  }

  private _daily: number | string
  public get day(): number | string {
    return this._daily
  }
  public set day(v: string | number) {
    this._daily = v
  }

  constructor() {
    this.day = new Date().getDate()
    this.month = new Date().getMonth() < 12 ? new Date().getMonth() + 1 : 1
    this.year = new Date().getFullYear()
  }
  get todateYMD() {
    return this._todateYMD
  }
  set todateYMD(value) {
    this._todateYMD = value
  }

  private _todateYMD(date: IYYMMDD | Date, option?: string) {
    // console.log(`before : ${JSON.stringify(date)}`)

    if (date instanceof Date) {
      // console.log(`after new date : ${JSON.stringify(date)}`)
      this.day = date.getDate()
      this.month = date.getMonth() < 12 ? date.getMonth() + 1 : 1
      this.year = date.getFullYear()
    } else {
      // console.log(`after yymmdd : ${JSON.stringify(date)}`)
      const { day, month, year } = date
      this.day = day
      this.month = month
      this.year = year
    }

    option = option ? option.toLowerCase() : ''
    switch (option) {
      case 'yymmdd':
        return `${this.year}${this.month
          .toString()
          .padStart(2, '0')}${this.day.toString().padStart(2, '0')}`
        break
      case 'ymd':
        return `${this.year}${this.month
          .toString()
          .padStart(2, '0')}${this.day.toString().padStart(2, '0')}`
        break
      case 'yy-mm-dd':
        return `${this.year}-${this.month
          .toString()
          .padStart(2, '0')}-${this.day.toString().padStart(2, '0')}`
        break
      case 'y-m-d':
        return `${this.year}-${this.month
          .toString()
          .padStart(2, '0')}-${this.day.toString().padStart(2, '0')}`
        break
      case 'yy-mm':
        return `${this.year}-${this.month.toString().padStart(2, '0')}`
        break
      case 'y-m':
        return `${this.year}-${this.month.toString().padStart(2, '0')}`
        break
      case 'yymm':
        return `${this.year}${this.month.toString().padStart(2, '0')}`
        break
      case 'ym':
        return `${this.year}${this.month.toString().padStart(2, '0')}`
        break
      default:
        return `${this.year}-${this.month
          .toString()
          .padStart(2, '0')}-${this.day.toString().padStart(2, '0')}`
        break
    }
  }
}
