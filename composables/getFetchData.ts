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
        options.headers = {
          ...options.headers,
          authorization: 'Bearer ' + useCookie('userToken').value || ''
        }
        if (method !== 'GET') {
          options.body = params
        }
      },
      onResponse({ request, response }) {
        if(response.ok){
        resolve(response._data)
        } else {
          reject(response?._data)
        }
      },
      onResponseError({ request, response }) {
        reject(response?._data)
      }
    })
  })
}