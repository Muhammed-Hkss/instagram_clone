import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { deleteLike, getComments, getSinglePost, postComments, postLike } from '../../config';
import cls from './MorePosts.module.scss'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { FiMessageCircle, FiSend } from 'react-icons/fi';
import { BsBookmark } from 'react-icons/bs';


const MorePosts = () => {
  const accessToken = localStorage.getItem('accessToken');
  const [data, setData] = React.useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = React.useState(false);
  const [commentsData, setCommentsData] = React.useState(null);
  const [comments, setComments] = React.useState(false);
  const [comValue, setComValue] = React.useState('');


  console.log(data);


  useEffect(() => {
    getSinglePost(id, accessToken).then((r) => setData(r.data));
  }, []);

  const handleLike = (id) => {
    postLike({ post: Number(id) }, accessToken);
  };

  const handleDeleteLike = (id) => {
    deleteLike(id, accessToken);
  };

  const getComment = (id) => {
    getComments(id, accessToken).then((r) => setCommentsData(r.data));
  };

  const postComment = (id) => {
    postComments({body: comValue, post: id, parent: id}, accessToken)
    .then(r => console.log(r.data))
  };



  return (
    // <div style={{display:'flex' , justifyContent:'center'}}>
    //   xcfbdsbndfgbdsxbds
    // </div>
    <div className={cls.post_card_data}>
      <div className={cls.post_card_right}>
        <img
          src={
            data?.post_images?.length >= 1
              ? data?.post_images[0]?.image
              : 'https://www.desktopbackground.org/download/1920x1080/2013/10/16/655112_top-one-piece-boss-luffy-wallpapers_1920x1080_h.jpg '
          }
          alt=""
        />
      </div>
      <div className={cls.post_card_left}>
        <div className={cls.post_card_header}>
          <img
            onClick={() => navigate(`/users/${data?.user}`)}
            src="https://animeblurayuk.files.wordpress.com/2018/08/black-clover-season1-part1-screenshot1.jpg"
            alt=""
          />
          <h3 onClick={() => navigate(`/users/${data?.user}`)}>user</h3>
        </div>
        <div className={cls.post_card_body}>
          <img
            onClick={() => navigate(`/users/${data?.user}`)}
            src="https://animeblurayuk.files.wordpress.com/2018/08/black-clover-season1-part1-screenshot1.jpg"
            alt=""
          />
          <h3 onClick={() => navigate(`/users/${data?.user}`)}>user</h3>
          <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima magni obcaecati quam sed molestias expedita sint inventore maiores consectetur, explicabo assumenda veniam iure voluptatem maxime ipsum minus architecto numquam natus.</h3>
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
                onClick={() => {
                  setComments(!comments);
                  getComment(data?.id);
                }}
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
            {/* <div>
              <p>
                <span onClick={() => navigate(`/users/${data?.user}`)}>user</span> ​{data?.title}
                <span>... more</span>
              </p>
            </div> */}
          </div>
          <div className={cls.comment_block}>
            <input 
              onInput={(e) => setComValue(e.target.value)}
              value={comValue} 
              type="text" 
              placeholder="Add a comment..." 
            />
            <button disabled={comValue.length === 0} onClick={() => postComment(data?.id )}>Post</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MorePosts
