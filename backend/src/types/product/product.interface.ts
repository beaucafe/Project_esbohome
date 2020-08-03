import { Document, Schema } from 'mongoose'

interface IDepartment extends Document {
  _id: Number
  dept_code: String // ICDEPT_CODE
  dept_thaidesc: String // ICDEPT_THAIDESC
  dept_engesc: String
  dept_access: Number
  dept_level: Number
  dept_abs_index: Number
  dept_parent: Number
  dept_p_abs_index: Number
  dept_firschild: Number
}

export { IDepartment }
