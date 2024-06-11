import { defineStore } from 'pinia'

export const useFollowingStore = defineStore('following', () => {
  const followingList = ref(['66403c34b00d1fe281742a62', '123'])

  // const toggleFollow = async (id) => {
  //   console.log(id)
  //   await getFetchData({
  //     url: `/member/collection`,
  //     method: 'POST',
  //     params: { projectId: id }
  //   })
  //     .then((res) => {
  //       console.log(res)
  //     })
  //     .catch((err) => console.log(err))
  // }

  const checkFollowing = (id) => {
    return followingList.value.find((item) => item === id)
  }
  return { followingList, toggleFollowing, checkFollowing }
})
