import { BaseDialog } from '#components'

interface Params {
  url: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  params?: any
}

export default function getFetchData({ url, method = 'GET', params }: Params) {
  const runtimeConfig = useRuntimeConfig()
  const { apiBase } = runtimeConfig.public

  const modal = useModal()
  function openDialog(title: string, message: string) {
    modal.open(BaseDialog, {
      title,
      message
    })
  }
  return new Promise((resolve, reject) => {
    useFetch(url, {
      method,
      baseURL: apiBase,
      onRequest({ options }) {
        // console.log('options', options)
        options.headers = {
          ...options.headers,
          authorization: 'Bearer ' + useCookie('userToken').value || ''
        }
        if (method !== 'GET') {
          options.body = params
        }
      },
      onResponse({ request, response }) {
        if (response.ok) {
          resolve(response._data)
        } else {
          reject(response?._data)
        }
      }
      // onResponseError({ request, response }) {}
    })
  })
}
