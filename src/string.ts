import * as CryptoJS from 'crypto-js';

/**
 * @description: 转驼峰命名
 * @param {string} value 待转换值
 * @param {boolean} isUpperCamelCase  是否大驼峰
 * @return {*}
 */
export const ToHump = (value: string, isUpperCamelCase: boolean): string => {
  value = value.replace(/_(\w)/g, (_all, letter) => {
    return letter.toUpperCase()
  })

  value = value.replace(/^(\w)/, (_all, letter) => {
    return isUpperCamelCase ? letter.toUpperCase() : letter.toLowerCase()
  })

  return value
}

/**
 * @description: 驼峰转 _ 连接
 * @param {string} value  待转换值
 * @return {*}
 */
export const ToLine = (value: string): string => {
  return value.replace(/([A-Z])/g, '_$1').toLowerCase()
}

const OldCopy = (param: string) => {
  const el = document.createElement('input')
  el.style.position = 'absolute'
  el.style.opacity = '0'
  el.style.pointerEvents = 'none'
  el.value = param
  document.body.append(el)
  el.select()
  document.execCommand('copy')
  el.remove()
}

/**
 * @description: 复制文本到黏贴板
 * @param {string} param 待复制值
 * @return {*}
 */
export const CopyString = (param: string): void => {
  try {
    navigator.clipboard.writeText(param).then(
      () => { },
      (e) => {
        console.log('复制文本时发生错误', e)
        OldCopy(param)
      },
    )
  } catch (e) {
    console.log('复制文本时发生错误', e)
    OldCopy(param)
  }
}

/**
 * @description: 格式化字符串
 * @param {string} param 带转换值
 * @param {string} templateString 模板字符串
 * @return {*}
 */
export const FormatBlankByString = (param: string | undefined | null, templateString='- - -'): string => {
  if (!param || (param as unknown as string) === '') {
    return templateString
  }
  return param
}


//base64
export const base64 = {
  Encode(str: string){
    try{
      const encodedStr = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(str));
      return encodedStr
    }catch(e){
      console.error('encode_error',e)
      return ''
    }
  },
  Decode(str: string){
    try{
      var decodedStr = CryptoJS.enc.Base64.parse(str).toString(CryptoJS.enc.Utf8);
      return decodedStr
    }catch(e){
      console.error('decode_error',e)
      return ''
    }
  }
}