type UrlType = string | Request | Ref<string | Request> | (() => string | Request)
interface RequestOptions {
  method?: any
  params?: any
}
const request = async (url: UrlType, params: any, options: RequestOptions) => {
  const token = useCookie('userToken')
  //   const headers = useRequestHeaders.cookie
  const { apiBase: baseURL } = useRuntimeConfig().public
  const { method = ((options?.method || 'GET') as string).toUpperCase() } = options
  return await useFetch(url as string, {
    default: () => [],
    baseURL,
    method,
    params: { ...params },
    // headers,
    headers: token.value ? { Authorization: `Bearer ${token.value}` } : {},
    // credentials: 'include',
    body: method === 'POST' ? JSON.stringify(params) : undefined,
    onRequest({ request, options }) {
      //   console.log('onRequest', 'request', request, 'options', options)
    },
    onRequestError({ request, options, error }) {
      //   console.log('onRequestError', 'request', request, 'options', options, 'error', error)
    },
    onResponse({ request, response }) {
      //   console.log('onResponse', 'request', request, 'response._data', response._data)
      return response._data
    },
    onResponseError({ request, response, options }) {
      //   console.log('onResponseError', 'request', request, 'response', response, 'options', options)
    }
  })
}

export const useDefaultRequest = {
  get: (url: UrlType, params?: any, options?: RequestOptions) => {
    return request(url, params, { method: 'GET', ...options })
  },
  post: (url: UrlType, params?: any, options?: RequestOptions) => {
    return request(url, params, { method: 'POST', ...options })
  }
}
