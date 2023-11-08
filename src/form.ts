
export const rules = {

    required: {
      required: true,
      message: '不能为空',
      trigger: 'blur',
    },

    arrayRequired: { type: 'array', required: true, trigger: 'blur' },

    radioRequired: {
      validator: (rule: unknown, value: number): boolean => {
        return value !== -1
      },
      message: '请选择单选框',
      trigger: 'blur',
    },

    selectRequired: {
      validator: (rule: unknown, value: number): boolean => {
        return value !== -1 && value !== 0
      },
      message: '请选择',
      trigger: 'blur',
    },
  
    numberRequired: {
      required: true,
      validator: (
        rule: unknown,
        value: unknown,
        callback: (param?: Error) => void,
      ): void => {
        if (!value && Number(value) !== 0) {
          callback(new Error('请输入文本'))
          return
        }
  
        if (Number(value) <= 0) {
          callback(new Error('不能小于0'))
          return
        }
  
        callback()
      },
      trigger: 'blur',
    },
  
    url: { type: 'url', message: '请输入正确的URL地址', trigger: 'blur' },

    email: {
      type: 'email',
      message: '请输入正确的邮箱地址',
      trigger: 'blur',
    },

    mobile: {
      pattern: /^1[3-9]\d{9}$/,
      message: '请输入正确的手机号码',
      trigger: 'blur',  
    },

    password: {
      pattern:
        /^(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~\\])(?=.*[a-zA-Z])(?=.*\d)[^]{8,16}$/,
      message: '密码格式不正确',
      trigger: 'blur',
    },

    account: {
      pattern: /^([\u4E00-\u9FA5]|[a-zA-Z])([\u4E00-\uFA29]|[a-zA-Z0-9]){2,19}$/,
      message: '账号格式不正确',
      trigger: 'blur',
    },
  
    name: {
      pattern: /^[a-zA-Z0-9\u4e00-\u9fa5]+$/,
      trigger: 'blur',
    },
  
    ip: {
      pattern:
        /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/,
      message: '请输入正确的IP地址',
      trigger: 'blur',
    },

    mac: {
      pattern:
        /^[a-fA-F\d]{2}:[a-fA-F\d]{2}:[a-fA-F\d]{2}:[a-fA-F\d]{2}:[a-fA-F\d]{2}:[a-fA-F\d]{2}$/,
      message: '请输入正确的MAC地址',
      trigger: 'blur',
    },
}