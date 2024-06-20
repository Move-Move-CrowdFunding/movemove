export const regPhone = (data: string) => {
  console.log(/^09[0-9]{8}$/.test(data))
  return /^09[0-9]{8}$/.test(data)
}
