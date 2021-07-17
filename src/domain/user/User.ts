export default class User {
  constructor (
    public id: string | null = null,
    public name: string = '',
    public email: string = ''
  ) {}
}
