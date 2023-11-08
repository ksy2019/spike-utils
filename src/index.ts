import utils from './bundle'

export default utils

export const {

  cache,
  CacheGet,
  CacheSet,

  string,
  ToHump,
  ToLine,
  CopyString,
  FormatBlankByString,
  base64,

  file,
  Download ,
  ChooseFile,

  time,
  GetCurrentDay,
  GetMonthFirst,
  Sleep,
  TimeConvert,
  GetDuration,
  TimeRandom,
  LoadingDelay,

  object,
  DeepClone,
  Assign,
  Convert,
  Queue,

  http,
  HttpBase,
  Http,
  
  network,

  dom,
  InsertScript,
  
  image,
  Compress,
  CompressCache,
  ImgFileToDataUrl,
  GetImgSize,
  
  worker,
  CommonWorker

} = utils