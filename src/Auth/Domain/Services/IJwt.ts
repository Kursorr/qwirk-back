export default interface IJwt {
  sign(payload: object | Buffer | string, secretOrPrivateKey: object | Buffer | string, options?: Object): any
  verify(token: string, secretOrPrivateKey: object | Buffer | string, options?: Object): any
}
