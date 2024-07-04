import { useModal } from 'vue-final-modal'
import { BaseToast } from '#components'

export default () => {
  const { open, close, patchOptions } = useModal({
    component: BaseToast
  })

  const show = (attrs: any) => {
    patchOptions({ attrs })
    open()
  }

  const hide = (attrs: any) => {
    patchOptions({ attrs })
    close()
  }
  return { show, hide }
}
