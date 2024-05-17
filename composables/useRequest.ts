import { BaseModal } from '#components'
type UrlType = string | Request | Ref<string | Request> | (() => string | Request)
interface RequestOptions {
  method?: any
  params?: any
}

const request = async (url: UrlType, params: any, options: RequestOptions) => {
  const token = useCookie('userToken')
  const modal = useModal()

  function openModal(title: string, message: string) {
    modal.open(BaseModal, {
      title,
      message
    })
  }
  const { apiBase: baseURL } = useRuntimeConfig().public
  const { method = ((options?.method || 'GET') as string).toUpperCase() } = options

  const { data, pending, error, refresh, status } = await useFetch(url as string, {
    default: () => [],
    baseURL,
    method,
    params: { ...params },
    headers: token.value ? { Authorization: `Bearer ${token.value}` } : {},
    body: method === 'POST' ? JSON.stringify(params) : undefined,
    onRequest({ request, options }) {
      //   console.log('onRequest', 'request', request, 'options', options)
    },
    onRequestError({ request, options, error }) {
      //   console.log('onRequestError', 'request', request, 'options', options, 'error', error)
    },
    onResponse({ request, response }) {
      //   console.log('onResponse', 'request', request, 'response._data', response._data)
      //   openModal('成功', response._data.message)
      return response._data
    },
    onResponseError({ request, response, options }) {
      //   console.log('onResponseError', 'request', request, 'response', response, 'options', options)
      openModal('錯誤', response._data.message)
    }
  })
  return { data, pending, error, refresh, status }
}

/**
 * 根據指定的方法、URL 和選項執行默認請求。
 *
 * @param {T} method - 用於請求的 HTTP 方法。
 * @param {UrlType} url - 發送請求的 URL。
 * @param {any} [params] - 請求中要包含的參數（如果有的話）。
 * @param {RequestOptions} [options={}] - 用於請求的其他選項。
 * @return {Promise} 一個 Promise，解析為請求響應數據。
 **/

const methods = {
  get: 'GET',
  post: 'POST',
  put: 'PUT',
  delete: 'DELETE'
} as const
export const useRequest = <T extends keyof typeof methods>(
  method: T,
  url: UrlType,
  params?: any,
  options: RequestOptions = {}
) => request(url, params, { method, ...options })
