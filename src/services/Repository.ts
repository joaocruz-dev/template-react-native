import Api from './Api'
import { User, Login } from '@/domain'
import PersistStore from './PersistStore'

const endPointDev = 'http://localhost:3000/api'
const endPointProd = 'http://localhost:3000/api'

interface Response {
  message: string
}

export default class Repository {
  private _persistStore = new PersistStore()
  private _api: Api = new Api(process.env.NODE_ENV === 'development' ? endPointDev : endPointProd)

  private async start () {
    const token = await this._persistStore.getToken()
    this._api.token = token || false
  }

  public async login (login: Login) {
    await this.start()
    return this._api.post<Response & { token: string }, Login>('/auth/token', login)
  }

  public async getUser () {
    await this.start()
    return this._api.get<User>('/user')
  }
}
