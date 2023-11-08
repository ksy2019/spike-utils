import { Convert } from './object'


interface ParamsInterface {
  syncTime: void
}

type Action = (param?: any) => void

/**
 * 创建一个worker
*/

export class CommonWorker {
  constructor(workSrc: string) {
    this.Init(workSrc)
  }

  worker: Worker | undefined = undefined

  eventMap = new Map<keyof ParamsInterface, Set<Action>>()

  OnMessage(
    event: MessageEvent<{
      type: keyof ParamsInterface
      data: string
    }>,
  ) {
    const data = event.data.data
      ? (Convert(JSON.parse(event.data.data), false) as any)
      : {}
    const list = this.eventMap.get(event.data.type)
    if (!list) return
    for (const action of list) {
      action(data)
    }
  }

  Add<T extends keyof ParamsInterface>(
    type: T,
    callback: (params: ParamsInterface[T]) => void,
  ): void {
    if (!this.eventMap.has(type)) {
      this.eventMap.set(type, new Set<Action>())
    }

    const eventList = this.eventMap.get(type) as Set<Action>
    eventList.add(callback)

    // onBeforeUnmount(() => {
    //   eventList.delete(callback)
    // })
  }

  Del<T extends keyof ParamsInterface>(
    type: T,
    callback: (params: ParamsInterface[T]) => void,
  ) {
    if (!this.eventMap.has(type)) {
      return
    }

    const list = this.eventMap.get(type) as Set<Action>
    list.delete(callback)
  }

  Init(workerSrc: string) {
    if (Worker) {
      this.worker = new Worker(workerSrc + '?t=' + new Date().getTime())
      this.worker.onmessage = this.OnMessage
      //   onBeforeUnmount(() => {
      //     myWorker.Destroy()
      //   })
      return this.worker
    }
    return undefined
  }

  GetWorkerInstance() {
    return this.worker
  }

  Destroy() {
    if (this.worker) {
      this.eventMap.clear()
      this.worker.terminate()
    }
  }
}
