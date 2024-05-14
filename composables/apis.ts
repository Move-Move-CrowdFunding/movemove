export const useGetProjects = (params: any): any => {
  return useDefaultRequest.get('/admin/projects', params)
}
