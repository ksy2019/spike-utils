import dayjs from 'dayjs'

export const Sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

/**
 * @description: 时间转换函数  输入字符串转化为时间戳，时间戳转化为字符串,输入字符串制定字符串的format
 * @param {number} params  时间戳或者格式化的日期字符串
 * @param {*} format 格式化字符串的格式 默认YYYY-MM-DD HH:mm:ss
 * @return {*}  string | number | ''
 */
export const TimeConvert = (
  params: number | string,
  format = 'YYYY-MM-DD HH:mm:ss',
) => {
  try {
    if (typeof params === 'number') {
      const timeString = dayjs(params).format(format)
      return timeString
    } else {
      const timeStamp = dayjs(params).format(format).valueOf()
      return timeStamp
    }
  } catch (e) {
    console.error('转换失败', e)
    return false
  }
}

export const GetMonthFirst = (notTimeStamp?: boolean): number | string => {
  if (notTimeStamp) {
    return dayjs().format('YYYY-MM-01')
  } else {
    return (dayjs(dayjs().format('YYYY-MM-01')).valueOf() as number) / 1000
  }
}

/**
 * @description: 获取当前时间(时间戳或YYYY-MM-DD)
 * @param {boolean} isTimeStamp 是否返回时间戳
 * @return {*}
 */
export const GetCurrentDay = (isTimeStamp?: boolean) => {
  if (!isTimeStamp) {
    return dayjs().format('YYYY-MM-DD')
  } else {
    return (dayjs(dayjs().format('YYYY-MM-DD')).valueOf() as number) / 1000
  }
}


/**
 * @description: 获取持续时间（number转时间）
 * @param {number} second
 * @return {*}
 */
export const GetDuration = (second: number): string => {
  if (isNaN(Number(second)) || second === 0) {
    return '- - -'
  }
  const days = Math.floor(second / 86400)
  const hours = Math.floor((second % 86400) / 3600)
  const minutes = Math.floor(((second % 86400) % 3600) / 60)
  const seconds = Math.floor(((second % 86400) % 3600) % 60)

  const indexDays = days === 0 ? '' : days + '天' + ' '
  const indexHours = hours === 0 ? '' : hours + '时' + ' '
  const indexMinutes =
    minutes === 0 ? '' : minutes + '分' + ' '
  const indexSeconds =
    seconds === 0 ? '' : seconds + '秒' + ' '

  const duration = indexDays + indexHours + indexMinutes + indexSeconds
  return duration
}


export const TimeRandom = () =>{
  return `${new Date().getTime()}${parseInt(`${Math.random() * 1000}`)}`
}
 
export const LoadingDelay = (
  loading: {value: boolean},
): { Delay: (time: number) => void; Check: (delay: number) => void } => {
  let timer = setTimeout(() => {}, 0)
  let startAt = 0

  const Delay = (delay: number) => {
    timer = setTimeout(() => {
      loading.value = true
      startAt = new Date().getTime()
    }, delay)
  }
  const Check = async (delay: number) => {
    clearTimeout(timer)
    const now = new Date().getTime()

    const left = delay - (now - startAt)
    if (left > 0) {
      await Sleep(left)
    }
    loading.value = false
  }
  return { Delay, Check }
}
