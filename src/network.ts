export const IpToInt = (ip: string): number => {
    let resp = 0
    if (ip === '') return resp
  
    const list = ip.split('.')
    if (list.length !== 4) return resp
  
    for (let i = 0; i < list.length; i++) {
      resp += parseInt(list[i]) << ((list.length - 1 - i) * 8)
    }
  
    resp = resp >>> 0
  
    return resp
  }
  
  export const IntToIp = (int: number): string => {
    let resp = ''
    if (int <= 0) return resp
    const ip3 = (int << 0) >>> 24
    const ip2 = (int << 8) >>> 24
    const ip1 = (int << 16) >>> 24
    const ip0 = (int << 24) >>> 24
  
    resp += ip3 + '.' + ip2 + '.' + ip1 + '.' + ip0
    return resp
  }
  