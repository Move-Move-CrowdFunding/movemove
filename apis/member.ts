export const getMemberNotificationUnread = (): any =>
  useRequest('get', '/member/notification/unread')
