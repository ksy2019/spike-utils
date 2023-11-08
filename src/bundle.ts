/**
 * @description: 模块整合
 *    本文件更新时，请将导出的方法复制到index.ts
 * 
 */

import * as string from './string'
import * as time from './time'
import * as object from './object'
import * as http from './http'
import * as file from './file'
import * as cache from './cache'
import * as network from './network'
import * as dom from './dom'
import * as worker from './worker'
import * as image from './image'


export default {
  cache,
  CacheGet: cache.CacheGet,
  CacheSet: cache.CacheSet,

  string,
  ToHump: string.ToHump,
  ToLine: string.ToLine,
  CopyString: string.CopyString,
  FormatBlankByString: string.FormatBlankByString,
  base64: string.base64,


  file,
  Download: file.Download,
  ChooseFile: file.ChooseFile,

  time,
  GetCurrentDay: time.GetCurrentDay,
  GetMonthFirst: time.GetMonthFirst,
  Sleep: time.Sleep,
  TimeConvert: time.TimeConvert,
  GetDuration: time.GetDuration,
  TimeRandom: time.TimeRandom,
  LoadingDelay: time.LoadingDelay,

  object,
  DeepClone: object.DeepClone,
  Assign: object.Assign,
  Convert: object.Convert,
  Queue: object.Queue,


  http,
  HttpBase: http.HttpBase,
  Http: http.Http,

  network,

  dom: dom,
  InsertScript : dom.InsertScript,
  
  image: image,
  Compress: image.Compress,
  CompressCache: image.CompressCache,
  ImgFileToDataUrl: image.ImgFileToDataUrl,
  GetImgSize: image.GetImgSize,
  
  worker: worker,
  CommonWorker: worker.CommonWorker
}