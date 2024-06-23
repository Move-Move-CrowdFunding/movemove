// export const getAdminProjects = (params: any): any => {
//   return useDefaultRequest('/admin/projects', params)
// }
export const getAdminProjects = (params: any): any => useRequest('get', '/admin/projects', params)

export const getAdminProjectItem = (id: string): any => useRequest('get', `/admin/projects/${id}`)
