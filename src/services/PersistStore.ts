import AsyncStorage from '@react-native-async-storage/async-storage'

import { User } from '@/domain'

export default class PersistStore {
  private async getItem (key: string): Promise<any> {
    const item = await AsyncStorage.getItem(key) || null
    try { return JSON.parse(item) } catch (e) { return item }
  }

  private async setItem (key: string, value: any): Promise<void> {
    const isValid = ['string', 'boolean', 'number'].includes(typeof value)
    if (!isValid && !value) await AsyncStorage.removeItem(key)
    else {
      if (!isValid) value = JSON.stringify(value)
      await AsyncStorage.setItem(key, value)
    }
  }

  public async getToken (): Promise<string> {
    return await this.getItem('token')
  }

  public async setToken (token: string): Promise<void> {
    await this.setItem('token', token)
  }

  public async getUser (): Promise<User> {
    return await this.getItem('user')
  }

  public async setUser (user: User): Promise<void> {
    await this.setItem('user', user)
  }

  public async logout () {
    await AsyncStorage.removeItem('user')
    await AsyncStorage.removeItem('token')
  }
}
