import NetInfo from '@react-native-community/netinfo'

import { store } from '@/store'
import { Login } from '@/domain'
import Repository from '@/services/Repository'
import PersistStore from '@/services/PersistStore'
import { setUserFn, logoutFn } from '@/store/auth'

export default class AuthProvider {
  private repository = new Repository()
  private persistStore = new PersistStore()

  public async login (login: Login): Promise<string> {
    const data = await this.repository.login(login)
    await this.persistStore.setToken(data.token)
    await this.getUser()
    return data.message
  }

  public async getUser (): Promise<string | null> {
    let user = await this.persistStore.getUser()

    const { isConnected } = await NetInfo.fetch()
    if (isConnected) {
      const token = await this.persistStore.getToken()
      if (token) {
        try {
          user = await this.repository.getUser()
          await this.persistStore.setUser(user)
        } catch (error) {
          return user?.email
        }
      } else return user?.email
    } else {
      if (!user) return null
    }

    store.dispatch(setUserFn(user))
    return null
  }

  public async logout () {
    store.dispatch(logoutFn())
    await this.persistStore.logout()
  }
}
