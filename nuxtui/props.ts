export const formGroupConfig = {
  wrapper: 'flex w-full flex-shrink-0 flex-col space-y-2',
  label: {
    wrapper: '',
    base: 'flex items-center text-neutral-800 text-base',
    required: "after:content-['*'] !after:text-warning-500"
  },
  error: 'text-warning-500 peer-invalid:visible',
  default: {
    size: 'lg'
  }
}
export const inputConfig = {
  wrapper: ' rounded-[3px] overflow-hidden',
  base: 'relative min-h-12 w-full appearance-none rounded-[3px] border border-neutral-400 p-3 outline-offset-0 transition-all focus:outline-0 focus:outline-offset-0 text-base focus:ring-warning-500 !bg-neutral-50',
  placeholder: 'placeholder',
  rounded: 'rounded-[3px]'
}
