export default interface IPassword {
  hash(password: string): Promise<string | Error>
  verify(password: string, hash: string): Promise<boolean | Error>
}
