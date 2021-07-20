import axios, { AxiosInstance, Method, AxiosRequestConfig } from 'axios'

interface Options extends AxiosRequestConfig {
  query?: Record<string, string>
}

export default class Api {
  constructor (
    private _baseURL: string,
    public token: string | boolean = false
  ) {}

  private request<T> (request: (api: AxiosInstance, resolve: (value: any) => void, reject: (reason?: any) => void) => void): Promise<T> {
    const api = axios.create({
      baseURL: this._baseURL,
      headers: { 'Content-Type': 'application/json' }
    })
    if (this.token) api.defaults.headers.Authorization = `Bearer ${this.token}`
    return new Promise((resolve, reject) => request(api, resolve, reject))
  }

  private client<T extends any, U extends any> (method: Method, path: string, data?: U, options?: Options) {
    if (!path) path = ''
    if (!options) options = {}
    const query = this.objectToQuery(options.query || {})

    path += query === '?' ? '' : query
    return this.request<T>((api, resolve, reject) => {
      api.request({ ...options, method, url: path, data })
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
