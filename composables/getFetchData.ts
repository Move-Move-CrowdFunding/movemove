// import loading from '../store/loading'
interface Params {
  url: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  params?: any
}

export default function getFetchData({ url, method = 'GET', params }: Params) {
  return new Promise((resolve, reject) => {
    useFetch(url, {
      method,
      baseURL: 'https://movemove-api.onrender.com',
      onRequest({ options }) {
        console.log('options', options)
        // changeLoading(true)
        options.headers = {
          ...options.headers,
          authorization: 'Bearer ' + useCookie('userToken').value || ''
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