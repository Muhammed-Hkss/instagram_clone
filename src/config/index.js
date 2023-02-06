import { instance } from "./api"

const token = (accessToken) => {
  return {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  }
}

export const Token = data => instance.post(`/token/` , data)
export const signUp = data => instance.post(`/users/` , data)
export const GetUsersId = (id) => instance.get(`/users/${id}`)
export const GetUsers = () => instance.get('/users/')
export const getFollowers = (id) => instance.get(`users/${id}/subscribers`)
export const getFollowings = (id) => instance.get(`users/${id}/subscriptions`)
export const GetUser = (accessToken) => instance.get(`/users/current_user/`, token(accessToken))
// export const DelPost = (accessToken) => instance.delete(`/users/current_user/`, token(accessToken))
// deletePost: (accessToken, id) => axios.delete(`/posts/${id}/`, {

// }),

export const DelPost = (id , accessToken) => instance.delete(`/posts/${id}/`, token(accessToken))



export const getLikedUser = (id, accessToken) => instance.get(`users/${id}/likes/`, token(accessToken))
export const getPostsOfTheUser = (id) => instance.get(`users/${id}/posts`)
export const GetPosts = (accessToken) => instance.get(`/posts/`, token(accessToken))
export const TocreatePost = (data, accessToken) => instance.post(`posts/`, data, token(accessToken))
export const createImage = (data, accessToken) => instance.post(`images/`, data, token(accessToken))
export const TocreateStory = (data, accessToken) => instance.post('stories/', data, token(accessToken))
export const getStories = (accessToken) => instance.get('stories', token(accessToken))
export const getMoreStories = (accessToken) => instance.get('stories', token(accessToken))
export const deleteStory = (id, accessToken) => instance.delete(`stories/${id}`, token(accessToken))
export const PostImages = (accessToken) => instance.post('/images/', token(accessToken))
export const getSinglePost = (id, accessToken) => instance.get(`posts/${id}`, token(accessToken))
export const postLike = (data, accessToken) => instance.post('likes/', data, token(accessToken))
export const deleteLike = (id, accessToken) => instance.delete(`likes/${id}`, token(accessToken))
export const getComments = (id, accessToken) => instance.get(`posts/${id}/comments`, token(accessToken))
export const postComments = (data, accessToken) => instance.post('comments/', data, token(accessToken))
export const putUser = (id, data, accessToken) => instance.put(`users/${id}/`, data, token(accessToken))
export const postFollow = (data, accessToken) => instance.post('follow/', data, token(accessToken))
export const unFollow = (id, accessToken) => instance.delete(`follow/${id}`, token(accessToken))