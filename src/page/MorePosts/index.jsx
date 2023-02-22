import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { deleteComment, deleteLike, getComments, getSinglePost, GetUsersId, PostComments, postLike } from '../../config';
import cls from './MorePosts.module.scss'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { FiMessageCircle, FiSend } from 'react-icons/fi';
import { BsBookmark } from 'react-icons/bs';
import { BiTrash } from 'react-icons/bi'
import { useState } from 'react';
import Loading from '../../components/Loading';
import { useForm } from 'react-hook-form';


const MorePosts = () => {
  const accessToken = localStorage.getItem('accessToken');
  const navigate = useNavigate();
  const { id } = useParams();
  const [data , setData] = useState(null);
  const [isLiked , setIsLiked] = useState(false);
  const [commentsData , setCommentsData] =  useState(null);
  const [comments , setComments] = useState(false);
  const [comValue , setComValue] = useState('');
  const [curUser , setCurUser] = useState('')


  const {
    register, 
    handleSubmit, 
    reset
  } = useForm()




  useEffect(() => {
    getSinglePost(id, accessToken).then((r) => setData(r.data));
  }, [accessToken , id]);


  useEffect(() => {
    GetUsersId(data?.user).then(r => {
      setCurUser(r.data)
    })
  } , [data?.user])

  const handleLike = (id) => {
    postLike({ post: Number(id) }, accessToken);
  };

  const handleDeleteLike = (id) => {
    deleteLike(id, accessToken);
  };










  // const getComment = (id) => {
  //   getComments(id, accessToken).then((r) => setCommentsData(r.data));
  // };



  
  useEffect(() => {
    getComments(Number(id))
    .then(res => {
      setCommentsData(res.data)
    })


  } , [])





  
  // 
  // function handleRemoveCard(itemId){
  //   deleteToStudent(id , itemId).then(() => {
  //     GetMoreClass(id).then(r => {
  //       const newData = Object.entries(r.data.students).map(([id, item]) => {
  //         return {
  //           id,
  //           ...item
  //         }
  //       })
  //       setStudentData(newData)
  //     })
  //   })
  // }

  // const onSubmit = (value) => {
  //   const data = {
  //     ...value ,
  //     date: new Date().toLocaleDateString(),
  //     // names: teachers.name ,
  //   }
  //   postStudents(id , {...data}).then(() => {
  //     GetMoreClass(id).then(r => {
  //       const newData = Object.entries(r.data.students).map(([id, item]) => {
  //         return {
  //           id,
  //           ...item
  //         }
  //       })
  //       setStudentData(newData)
  //     })
  //   })
  // }











  // const postComment = (id) => {
  //   PostComments({body: comValue, post: id, parent: id}, accessToken)
  //   // .then(r => console.log(r.data))
  // };



  const delete_comment = (id) => {
    deleteComment(accessToken, id).then(() => {
      getComments(Number(id))
      .then(res => {
        setCommentsData(res.data)
      })
    })
  }








  const comment = (data) => {
    if(data.body.length !== 0){
      PostComments(accessToken, {...data, post: Number(id), parent: null}).then(() => {
        getComments(Number(id))
        .then(res => {
          setCommentsData(res.data)
        })
      })
    }
  }






  


  

// console.log(commentsData.user);

const [MessageCurUser , setMessageCurUser] = useState('')

const avatar = commentsData && commentsData.map(item => setMessageCurUser(item))




console.log(MessageCurUser);









// if (!productBase) return <div className={cls.loading}><Loader/></div>
if (!data && !curUser) return <div style={{textAlign:'center'}}><Loading /></div>

  return (
    <div className={cls.post_card_data}>
      <div className={cls.post_card_right}>
        <img
          src={
            data?.post_images?.length >= 1
              ? data?.post_images[0]?.image
              : 'https://proprikol.ru/wp-content/uploads/2020/11/kartinki-oshibki-32.jpeg'
          }
          alt=""
        />
      </div>
      <div className={cls.post_card_left}>
        <div className={cls.post_card_header}>
          <img
            onClick={() => navigate(`/users/${data?.user}`)}
            // src="https://animeblurayuk.files.wordpress.com/2018/08/black-clover-season1-part1-screenshot1.jpg"
            src={curUser?.avatar}
            alt=""
          />
          <h3 onClick={() => navigate(`/users/${data?.user}`)}>{curUser?.username}</h3>
          <h3>{data?.title}</h3>
        </div>






        <div className={cls.post_card_body}>
          {/* <img
            onClick={() => navigate(`/users/${data?.user}`)}
            src="https://animeblurayuk.files.wordpress.com/2018/08/black-clover-season1-part1-screenshot1.jpg"
            alt=""
          />
          <h3 onClick={() => navigate(`/users/${data?.user}`)}>user</h3>
          <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima magni obcaecati quam sed molestias expedita sint inventore maiores consectetur, explicabo assumenda veniam iure voluptatem maxime ipsum minus architecto numquam natus.</h3> */}

          {
            commentsData?.map(item => (
              <div className={cls.post_card}>
                <img
                  onClick={() => navigate(`/users/${data?.user}`)}
                  src="https://animeblurayuk.files.wordpress.com/2018/08/black-clover-season1-part1-screenshot1.jpg"
                  alt=""
                />
                <h3 onClick={() => navigate(`/users/${data?.user}`)}>user</h3>
                <h3>{item.body}</h3>
                <BiTrash onClick={() => delete_comment(item.id)}/>
                {/* {
                  Number(curUser) === user?.id ? 
                    <li 
                      onClick={() => delete_comment(item.id)}
                    >
                      <BiTrash />
                    </li>
                  : 
                  null
                } */}
              </div>
            ))
          }
        </div>







        <div className={cls.post_card_footer}>
          <div className={cls.likes_block}>
            <div className={cls.likes}>
              {isLiked ? (
                <AiFillHeart
                  onClick={() => {
                    handleDeleteLike(data?.id);
                    setIsLiked(!isLiked);
                  }}
                />
              ) : (
                <AiOutlineHeart
                  onClick={() => {
                    handleLike(data?.id);
                    setIsLiked(!isLiked);
                  }}
                />
              )}
              <FiMessageCircle
                // onClick={() => {
                //   setComments(!comments);
                //   getComment(data?.id);
                // }}
              />
              <FiSend />
            </div>
            <div>
              <BsBookmark />
            </div>
          </div>
          {comments && commentsData?.length >= 1 && <div className={cls.comments_drop}>comments</div>}
          <div className={cls.about_block}>
            <div className={cls.count_of_likes}>
              <span>{data?.liked?.length} likes</span>
            </div>
          </div>
          {/* <div className={cls.comment_block}> */}
            {/* <input 
              onInput={(e) => setComValue(e.target.value)}
              value={comValue} 
              type="text" 
              placeholder="Add a comment..." 
            />
            <button disabled={comValue.length === 0} onClick={() => postComment(data?.id )}>Post</button> */}



            <form 
              // className={cls.post_comments}
              className={cls.comment_block}
              onSubmit={handleSubmit(data => comment(data))}
            >
              <input 
                type="text" 
                placeholder='Type your comment...'
                {...register('body')}
              />
              <button>
                Post
              </button>
            </form>





          {/* </div> */}
        </div>
      </div>
    </div>
  )
}

export default MorePosts
