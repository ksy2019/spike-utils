import axios, { AxiosProgressEvent, CancelToken } from 'axios'

const instance = axios.create({
  timeout: 1000 * 10,
})

type Config<Param> = {
  method: 'get' | 'post' | 'put' | 'delete'
  url: string
  contentType?: 'json' | 'formData'
  param?: Param
  headers?: Record<string, string>
  cancelToken?: CancelToken
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void
  timeout?: number
}

export const HttpBase = async <Param, Resp>(
  config: Config<Param>,
): Promise<Resp> => {
  return new Promise((resolve) => {
    let resp: Resp = {} as Resp
    let param: Param | undefined, data: Param | FormData | undefined
    switch (config.method) {
      case 'get':
        param = config.param
        break
      case 'put':
      case 'post':
      case 'delete':
        data = config.param
        break
    }

    if (!config.headers) {
      config.headers = {}
    }

    switch (config.contentType) {
      default:
      case 'json':
        config.headers['Content-Type'] = 'application/json;charset=UTF-8'
        break
      case 'formData':
        config.headers['Content-Type'] = 'multipart/form-data'
        {
          const tmp = data as unknown as Record<string, string | Blob>
          data = new FormData()
          for (const i in tmp) {
            //@ts-ignore
            tmp[i] !== undefined && data.append(i, tmp[i])
          }
        }
        break
    }

    instance({
      method: config.method,
      url: config.url,
      params: param,
      data: data,
      headers: config.headers,
      cancelToken: config.cancelToken,
      onUploadProgress: config.onUploadProgress,
      timeout: config.timeout,
    })
      .then((res) => {
        resp = res.data
      })
      .catch((e) => {
        resp = {
          code: -1,
          msg: 'http请求失败',
          data: {},
        } as unknown as Resp
        return
      })
      .finally(() => {
        resolve(resp)
      })
  })
}

export const Http = <Param, Resp>(
    config: Config<Param>,
): ((param: Param) => Promise<Resp>) => {
    return async (param): Promise<Resp> => {
        return new Promise((resolve) => {
            config.param = param
            HttpBase<Param, Resp>(config).then(res => {
                resolve(res)
            })
        })
    }
}