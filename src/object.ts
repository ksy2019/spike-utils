import * as string from './string'
import dayjs from 'dayjs'
export const DeepClone = <T>(source: T): T => {
  switch (Object.prototype.toString.call(source)) {
    case '[object Array]':
    case '[object Object]':
      const resp: T = Array.isArray(source) ? ([] as any) : ({} as any)

      for (const key in source) {
        resp[key] = DeepClone(source[key])
      }
      return resp

    case '[object Date]':
      return new Date((source as any).getTime()) as any
    default:
      return source
  }
}

export const Convert = (
  source: Record<string, any>,
  first: boolean,
  // type: 'line' | 'hump',
): Record<string, any> => {
  let func = Function()
  func = (name: string) => {
    return string.ToHump(name, first)
  }
  const resp: Record<string, any> = {}
  for (const i in source) {
    const key = func(i)
    try {
      const lastName = i.slice(-2)
      if (lastName === 'At' && typeof source[i] === 'number') {
        if (source[i] === 0) {
          resp[key.slice(0, -2) + 'Str'] = 0
        } else {
          resp[key.slice(0, -2) + 'Str'] = dayjs(source[i] * 1000).format(
            'YYYY-MM-DD HH:mm:ss',
          )
        }
      }
    } catch (e) {
      console.error('格式化时间出现错误', e)
    }
    let item: Record<string, any> = {}
    switch (Object.prototype.toString.call(source[i])) {
      case '[object Array]':
        resp[key] = []
        item = DeepClone(source[i])
        for (const j in item) {
          switch (Object.prototype.toString.call(item[j])) {
            case '[object Object]':
              resp[key].push(Convert(item[j], first))
              break
            default:
              resp[key].push(item[j])
          }
        }

        break
      case '[object Object]':
        resp[key] = Convert(source[i], first)
        break
      default:
        resp[key] = source[i]
    }
  }
  return resp
}

export const Assign = (
  source: Record<string, any>,
  target: Record<string, any>,
): Record<string, any> => {
  if (
    Object.prototype.toString.call(source) !== '[object Object]' ||
    Object.prototype.toString.call(target) !== '[object Object]'
  ) {
    return target
  }

  for (const i in target) {
    if (
      Object.prototype.toString.call(source[i]) !==
      Object.prototype.toString.call(target[i])
    ) {
      continue
    }

    switch (Object.prototype.toString.call(target[i])) {
      case '[object Array]':
        if (JSON.stringify(target[i]) !== JSON.stringify(source[i]))
          target[i] = DeepClone(source[i])
        break
      case '[object Object]':
        Assign(source[i], target[i])
        break
      case '[object Date]':
        target[i] = new Date(source[i].getTime())
        break
      case '[object Boolean]':
      case '[object Number]':
      case '[object String]':
        target[i] = source[i]
        break
    }
  }
  return target
}

interface QueueItem {
  func: (...args: any[]) => any
  resolve: ReturnType<QueueItem['func']>
  params?: Parameters<QueueItem['func']>
}

export class Queue {
  private waitingQueue = Array<QueueItem>()
  private isRunning = false
  private Execute = async (func: QueueItem['func'], resolve: QueueItem['resolve'], params?: QueueItem['params']) => {
    const indexParams = params || []
    const data = await func(...indexParams)
    resolve(data)
    if (this.waitingQueue.length !== 0) {
      const next = this.waitingQueue.shift() as QueueItem
      this.Execute(next.func, next.resolve, next.params)
    } else {
      this.isRunning = false
    }
  }
  Exec = <T extends QueueItem['func']>(func: T, paramsArr?: Parameters<T>): Promise<ReturnType<T>> => {
    return new Promise<ReturnType<T>>((resolve) => {
      if (this.isRunning) {
        this.waitingQueue.push({ func, resolve, params: paramsArr })
      } else {
        this.isRunning = true
        this.Execute(func, resolve, paramsArr)
      }
    })
  }
}