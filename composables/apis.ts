// export const useGetProjects = (params: any): any => {
//   return useDefaultRequest('/admin/projects', params)
// }
export const useGetProjects = (params: any): any => useRequest('get', '/admin/projects', params)
