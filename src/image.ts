import { TimeRandom } from "./time"

export type ImageType = 'image/jpeg' | 'image/png' | 'image/webp'

export const Compress = (params: {
  type?: ImageType
  ratio?: number
  width: number
  height: number
  dataUrl: string
}): Promise<{ dataUrl: string; file: File | null }> => {
  return new Promise(async (resolve) => {
    if (!params.ratio) {
      params.ratio = 0.9
    }
    if (!params.type) {
      params.type = 'image/jpeg'
    }

    const image = new Image()
    image.crossOrigin = 'anonymous'

    image.onload = () => {
      const canvas = document.createElement('canvas')

      const widthRatio = image.width / params.width
      const heightRatio = image.height / params.height

      if (widthRatio < 1 && heightRatio < 1) {
        canvas.width = image.width
        canvas.height = image.height
      } else {
        if (widthRatio > heightRatio) {
          canvas.width = params.width
          canvas.height = image.height / widthRatio
        } else {
          canvas.width = image.width / heightRatio
          canvas.height = params.height
        }
      }

      const ctx = canvas.getContext('2d')
      if (!ctx) {
        return
      }

      ctx.drawImage(
        image,
        0,
        0,
        image.width,
        image.height,
        0,
        0,
        canvas.width,
        canvas.height,
      )

      switch (params.type) {
        case 'image/jpeg':
        case 'image/webp':
          canvas.toBlob(
            (blob) => {
              resolve({
                dataUrl: canvas.toDataURL(params.type, params.ratio),
                file: blob
                  ? new File(
                      [blob],
                      `${TimeRandom}.${blob.type.replace(/.+\//, '')}`,
                      { type: blob.type },
                    )
                  : null,
              })
            },
            params.type,
            params.ratio,
          )
          break
        default:
          canvas.toBlob((blob) => {
            resolve({
              dataUrl: canvas.toDataURL(params.type),
              file: blob
                ? new File(
                    [blob],
                    `${TimeRandom()}.${blob.type.replace(/.+\//, '')}`,
                    { type: blob.type },
                  )
                : null,
            })
          }, params.type)
          break
      }
    }
    image.onerror = () => {
      resolve({
        dataUrl: '',
        file: null,
      })
    }

    image.src = params.dataUrl
  })
}

const imageCache: Record<string, { dataUrl: string; file: File | null }> = {}

export const CompressCache = (param: {
  url: string
  type?: ImageType
  ratio?: number
  width: number
  height: number
}): Promise<{ dataUrl: string; file: File | null }> => {
  return new Promise((resolve) => {
    const key = JSON.stringify(param)
    const cache = imageCache[key]

    if (cache) {
      resolve(cache)
      return
    }

    Compress({
      ...param,
      dataUrl: param.url,
    }).then((res) => {
      imageCache[key] = res
      resolve(res)
    })
  })
}

export const ImgFileToDataUrl = (file: File): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function () {
      resolve(reader.result as string)
    }
  })
}

export const GetImgSize = (
  dataUrl: string,
): Promise<{ width: number; height: number }> => {
  return new Promise((resolve) => {
    const img = new Image()
    img.src = dataUrl
    img.onload = function () {
      resolve({ width: img.naturalWidth, height: img.naturalHeight })
    }
  })
}
