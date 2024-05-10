import { defineStore } from 'pinia'

export const useFollowingStore = defineStore('following', () => {
  const followingList = ref(['123'])

  const toggleFollowing = (id) => {
    console.log(id)
  }

  const checkFollowing = (id) => {
    return followingList.value.find((item) => item === id)
  }
  return { followingList, toggleFollowing, checkFollowing }
})
