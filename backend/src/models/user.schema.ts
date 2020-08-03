import * as mongoose from 'mongoose'
import { Schema } from 'mongoose'
import * as bcrypt from 'bcryptjs'

export const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
    },
    password: {
      type: String,
      select: false,
      required: true,
      trim: true,
      minlength: 6,
    },
    role: { type: String, default: 'guest' },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: 'users',
  },
)

UserSchema.pre('save', async function (next: mongoose.HookNextFunction) {
  try {
    if (!this.isModified('password')) {
      return next()
    }
    const hashed = await bcrypt.hash(this.password, 10)
    this.password = hashed
    return next()
  } catch (err) {
    return next(err)
  }
})

UserSchema.methods.verifyPassword = async function (password) {
  const isValid = await bcrypt.compare(password, this.password)
  return isValid
}

UserSchema.methods.sanitizeUser = function () {
  var obj = this.toObject() //or var obj = this;
  delete obj.password
  return obj
}
