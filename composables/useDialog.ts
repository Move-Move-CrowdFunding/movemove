import { useModal } from 'vue-final-modal'
import { BaseDialog } from '#components'

export default (attrs: any) => {
  const { open } = useModal({
    component: BaseDialog,
    attrs
  })
  return { open }
}
