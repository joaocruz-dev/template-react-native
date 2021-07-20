export default class User {
  constructor (
    public id: string = null,
    public name: string = null,
    public cpf: string = null,
    public email: string = null,
    public phone: string = null,
    public avatar: string = null,
    public level: number = null
  ) {}
}
