import { useModal } from 'vue-final-modal'
import { BaseToast } from '#components'

export default () => {
  const { open, patchOptions } = useModal({
    component: BaseToast
  })

  const show = (attrs: any) => {
    patchOptions({ attrs })
    open()
  }
  return { show }
}
