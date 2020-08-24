import jwt from 'jsonwebtoken'
import IJwt from '@auth_domain/Services/IJwt'

export default class JwtService implements IJwt {

  sign(payload: object, secretOrPrivateKey: string, options?: Object): any {
    return jwt.sign(payload, secretOrPrivateKey, options)
  }

  verify(token: string, secretOrPrivateKey: string, options?: Object): any {
    return jwt.verify(token, secretOrPrivateKey, options)
  }
}
