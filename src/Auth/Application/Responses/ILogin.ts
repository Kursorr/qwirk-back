export default interface ILogin {
  send(user: object | null, err: Error | null): void
}
