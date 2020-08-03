import * as mongoose from 'mongoose'
import { Schema } from 'mongoose'

// บันทึกหลัง Docdetail ทำงานเสร็จแล้ว
export const DocinfoSchema = new mongoose.Schema(
  {
    dikey: { type: Number, unique: true },
    doctype: { type: Schema.Types.ObjectID, ref: 'Doctypes' },
    docref: String, //  อ้างถึงเอกสาร doccode + dryear + drmont +/+ drseq
    // docref: {
    //   name: String,
    //   docdetail: { type: Schema.Types.ObjectID, ref: 'Docdetails' },
    // },
    create_by: String,
    create_computer: String,
    remark: String,
  },
  {
    timestamps: true,
    versionKey: false,
    collection: 'docinfos',
  },
)
