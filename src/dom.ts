import { Queue } from "./object"
import { TimeRandom } from "./time"

const queue = new Queue()

const ScriptSet = new Set<string>()

const LoadingScript = (src: string): Promise<boolean> => {
  const scriptSrc = src+'?timestamp=' + TimeRandom()
  return new Promise((resolve) => {
    if(ScriptSet.has(src)){
      resolve(true)
      return 
    }
    const scriptNode = document.createElement('script')
    scriptNode.onerror = ()=>{
        resolve(false)
    }
    scriptNode.onload = ()=>{
        ScriptSet.add(src)
        resolve(true)
    }
    scriptNode.src = scriptSrc
    document.body.appendChild(scriptNode)
  })
}

/**
 * 向html插入一个script标签；
 * 如果插入过；不会重复插入
*/
export const InsertScript = async (src: string ) => {
  return await queue.Exec(LoadingScript,[src])
}