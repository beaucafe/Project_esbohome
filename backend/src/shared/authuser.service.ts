import { Injectable } from '@nestjs/common'
import { AuthuserRepository } from '../modules/authuser/authuser.repository'
import { sign } from 'jsonwebtoken'
import { Payload } from 'src/types/payload'

@Injectable()
export class AuthuserService {
  constructor(private authUser: AuthuserRepository) {}

  async signPayload(payload: Payload) {
    return sign(payload, process.env.JwtSecret, { expiresIn: '4h' })
  }

  async validateUser(payload: Payload) {
    return await this.authUser.findByPayload(payload)
  }
}
