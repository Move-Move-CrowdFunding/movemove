// import loading from '../store/loading'
interface Params {
  url: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  params?: any
}

export default function getFetchData({ url, method = 'GET', params }: Params) {
  const runtimeConfig = useRuntimeConfig()
  const { apiBase } = runtimeConfig.public

  return new Promise((resolve, reject) => {
    useFetch(url, {
      method,
      baseURL: apiBase,
      onRequest({ options }) {
        options.headers = {
          ...options.headers,
          authorization: useCookie('token').value || ''
        }
        if (method !== 'GET') {
          options.body = params
        }
      },
      async onResponseError({ request, response }) {
        reject(response?._data)
      },
      onResponse({ response }) {
        console.log('response', response)
        resolve(response._data)
      }
    })
      .then((res) => {})
      .catch((error) => {
        reject(error)
      })
  })
}
