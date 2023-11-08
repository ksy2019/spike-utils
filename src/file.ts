
/**
 * @description: 下载文件
 * @param {string} url 文件地址
 * @param {string} name 文件名称
 *
 */
export const Download = (url: string, name?: string) => {
    const link = document.createElement('a')
    link.style.display = 'none'
    const timestamp = url.match(/\?/g) !==null ? "&v="+new Date().getTime() : "?v="+new Date().getTime()
    link.href = url + timestamp
    name ? link.setAttribute('download', name) : ''
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}

/**
 * 
 * @description: 选择文件，注意：需要用户点击事件触发
 * 
 */
export const ChooseFile = (param: {
    type: string
    multi?: boolean
}): Promise<FileList> => {
    return new Promise((resolve) => {
        const input = document.createElement('input')
        input.type = 'file'
        input.accept = param.type
        if (param.multi === true) input.multiple = true
        input.onchange = async (event: Event) => {
            const files = (event.composedPath()[0] as HTMLInputElement).files
            if (!files || files.length <= 0) return

            resolve(files)
        }
        input.click()
    })
}