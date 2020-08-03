interface dataSummary {
  documentRunning?: string
  billTotal?: number
  billCancel?: number
  billMember?: number
  preTax?: number
  taxAmount?: number
  taxTotal?: number
  lastBill?: lastBill
  // readonly createdAt?: Date
  // readonly updatedAt?: Date
}

interface lastBill {
  _id?: number
  billNo?: string
  billStart?: Date
  billStop?: Date
  mbCode?: string
  mbCard?: string
  taxInv?: string
}

export { dataSummary }
