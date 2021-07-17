let _token = ''
const endPointDev = 'http://localhost:3000/api'
const endPointProd = 'http://localhost:3000/api'

export default class Environment {
  static get isDev (): boolean {
    return process.env.NODE_ENV === 'development'
  }

  static get endPoint (): string {
    return Environment.isDev ? endPointDev : endPointProd
  }

  static get Bearer (): string {
    return `Bearer ${_token}`
  }

  static setToken (token: string) {
    _token = token
  }
}
