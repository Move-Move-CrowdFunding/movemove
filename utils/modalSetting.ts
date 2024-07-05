interface ModalSetting {
  icon: string
  iconClass: string
  msg: string
}
export const toastStatus = (icon: string, iconClass: string, msg: string) => {
  return { icon, iconClass, msg }
}

export const errorStatus: ModalSetting = {
  icon: 'simple-line-icons:close',
  iconClass: 'text-warning-500',
  msg: '' || '發生錯誤'
}
export const successStatus: ModalSetting = {
  icon: 'simple-line-icons:check',
  iconClass: 'text-warning-700',
  msg: ''
}
