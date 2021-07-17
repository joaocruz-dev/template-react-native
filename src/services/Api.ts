import axios, { AxiosInstance, Method, ResponseType } from 'axios'

import Environment from './Environment'

interface Options {
  query?: Record<string, string>,
  responseType?: ResponseType
}

export default class Api {
  private request<T> (request: (api: AxiosInstance, resolve: (value: any) => void, reject: (reason?: any) => void) => void): Promise<T> {
    const api = axios.create({
      baseURL: Environment.endPoint,
      headers: {
        'Content-Type': 'application/json',
        Authorization: Environment.Bearer
      }
    })
    return new Promise((resolve, reject) => request(api, resolve, reject))
  }

  private client<T extends any, U extends any> (method: Method, path: string, data?: U, options?: Options) {
    if (!path) path = ''
    if (!options) options = {}
    const query = this.objectToQuery(options.query || {})

    path += query === '?' ? '' : query
    const responseType = options.responseType
    return this.request<T>((api, resolve, reject) => {
      api.request({ method, url: path, data, responseType })
        .then(res => resolve(res.data))
        .catch(error => this.error(error, reject))
    })
  }

  private error (error: any, reject: (reason?: any) => void) {
    if (!error.response) reject(error)
    else reject(error.response.data)
  }

  public get<T extends any> (path: string, options?: Options) {
    return this.client<T, null>('GET', path, null, options)
  }

  public post<T extends any, U extends any> (path: string, data?: U, options?: Options) {
    return this.client<T, U>('POST', path, data, options)
  }

  public put<T extends any, U extends any> (path: string, data?: U, options?: Options) {
    return this.client<T, U>('PUT', path, data, options)
  }

  public delete<T extends any, U extends any> (path: string, data?: U, options?: Options) {
    return this.client<T, U>('DELETE', path, data, options)
  }

  public objectToQuery (query: Record<string, string>): string {
    const str = Object.keys(query).map(x => `${encodeURIComponent(x)}=${encodeURIComponent(query[x])}`)
    return '?' + str.join('&')
  }
}
