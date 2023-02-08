import { instance } from "./api"

const token = (accessToken) => {
  return {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  }
}


export const api = {
  Token : data => instance.post(`/token/` , data),
  signUp : data => instance.post(`/users/` , data),
  GetUsersId : (id) => instance.get(`/users/${id}`),
  GetUsers : () => instance.get('/users/'),
  getFollowers : (id) => instance.get(`users/${id}/subscribers`),
  getFollowings : (id) => instance.get(`users/${id}/subscriptions`),
  GetUser : (accessToken) => instance.get(`/users/current_user/`, token(accessToken)),
  DelPost : (id , accessToken) => instance.delete(`/posts/${id}/`, token(accessToken)),
  getLikedUser : (id, accessToken) => instance.get(`users/${id}/likes/`, token(accessToken)),
  getPostsOfTheUser : (id) => instance.get(`users/${id}/posts`),
  GetPosts : (accessToken) => instance.get(`/posts/`, token(accessToken)),
  TocreatePost : (data, accessToken) => instance.post(`posts/`, data, token(accessToken)),
  createImage : (data, accessToken) => instance.post(`images/`, data, token(accessToken)),
  TocreateStory : (data, accessToken) => instance.post('stories/', data, token(accessToken)),
  getStories : (accessToken) => instance.get('stories', token(accessToken)),
  getMoreStories : (accessToken) => instance.get('stories', token(accessToken)),
  deleteStory : (id, accessToken) => instance.delete(`stories/${id}`, token(accessToken)),
  PostImages : (accessToken) => instance.post('/images/', token(accessToken)),
  getSinglePost : (id, accessToken) => instance.get(`posts/${id}`, token(accessToken)),
  postLike : (data, accessToken) => instance.post('likes/', data, token(accessToken)),
  deleteLike : (id, accessToken) => instance.delete(`likes/${id}`, token(accessToken)),
  getComments : (id, accessToken) => instance.get(`posts/${id}/comments`, token(accessToken)),
  postComments : (data, accessToken) => instance.post('comments/', data, token(accessToken)),
  putUser : (id, data, accessToken) => instance.put(`users/${id}/`, data, token(accessToken)),
  postFollow : (data, accessToken) => instance.post('follow/', data, token(accessToken)),
  unFollow : (id, accessToken) => instance.delete(`follow/${id}`, token(accessToken)),
  getSaves : (id , accessToken) => instance.get(`/users/${id}/saves/`, token(accessToken)),






  dislike : (id , accessToken) => instance.delete(`/likes/${id}/`, token(accessToken)),

  getLikes : (id) => instance.get(`/users/${id}/likes/`),


  PostSave : (data , accessToken) => instance.post('/saves/', data , token(accessToken)),

  UnSave : (id , accessToken) => instance.get(`/saves/${id}/`, token(accessToken)),
}


export const Token = data => instance.post(`/token/` , data)
export const signUp = data => instance.post(`/users/` , data)
export const GetUsersId = (id) => instance.get(`/users/${id}`)
export const GetUsers = () => instance.get('/users/')
export const getFollowers = (id) => instance.get(`users/${id}/subscribers`)
export const getFollowings = (id) => instance.get(`users/${id}/subscriptions`)
export const GetUser = (accessToken) => instance.get(`/users/current_user/`, token(accessToken))

















// getLikes: (id) => axios.get(`/users/${id}/likes/`),
// dislike: (accessToken, id) => axios.delete(`/likes/${id}/`, {
//   headers: {
//     'Authorization': `Bearer ${accessToken}`
//   }
// }),





export const DisLike = (accessToken, id) => instance.delete(`/likes/${id}/`, token(accessToken))

export const getLikes = (id) => instance.get(`/users/${id}/likes/`)


export const Like = (accessToken, data) => instance.post('/likes/' , data , token(accessToken))












export const getSaves = (accessToken, id) => instance.get(`/users/${id}/saves/`, token(accessToken))

export const PostSave = (accessToken, data) => instance.post('/saves/', data , token(accessToken))

export const UnSave = (accessToken, id) => instance.delete(`/saves/${id}/`, token(accessToken))




// export const savessss = (accessToken, data) => instance.post('/saves/', data , {
//   headers: {
//     'Authorization': `Bearer ${accessToken}`
//   }
// })









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



























// export const getUsersPosts = (id) => axios.get(`/users/${id}/posts/`)