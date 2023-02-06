import React, { useEffect, useState } from 'react'
import cls from './Card.module.scss'
import { AiOutlineSend } from 'react-icons/ai'
import { MdFavoriteBorder } from 'react-icons/md'
import { TbMessageCircle } from 'react-icons/tb'
import { BsBookmark } from 'react-icons/bs'
import { FaRegSmile } from 'react-icons/fa'
import { GetPosts, 
  // GetUsersId
} from '../../../config'


const Card = () => {
  const accessToken = localStorage.getItem('accessToken')
  // const [users , setUsers] = useState('')
  const [getPosts , setGetPosts] = useState('')


	const [base, setBase] = React.useState(getPosts)
  const [page, setPage] = React.useState(1)
  let PAGE_SIZE = 9
	const TOTAL_PAGE = Math.ceil(getPosts?.length / PAGE_SIZE)


  console.log(base);



  useEffect(() => {
		update()
	}, [page , getPosts ])


  function update() {
		const base = getPosts?.slice(
			page ,
			page * PAGE_SIZE,
		)
		setBase(base)
	}







  function nextPagination(){
		if(page !== TOTAL_PAGE){
			setPage(page + 1)
		}else {
			setPage(1)
		}
	}

	// function prevPagination(){
	// 	if(page !== 1){
	// 		setPage(page - 1)
	// 	}else {
	// 		setPage(TOTAL_PAGE)
	// 	}
	// }








  
  useEffect(() => {
    GetPosts(accessToken).then(r => {
      setGetPosts(r.data)
    })

    
  } , [accessToken])




  

  

  return (
    <div className={cls.card}>
      {
        base && base.map(item => {
          
          
          // const curUser = () => {
          //   GetUsersId(item.user).then(r => {
          //     setUsers(r.data)
          //   })
          // }
          // console.log(item.user);
          
          return(
            <div key={item.id}>
              <div className={cls.header}>
                <div className={cls.userLogo_data}>
                  <img className={cls.userLogo} src={item.plofileImage} alt="" />
                  
                </div>
                <div className={cls.userData}>
                  <div className={cls.userName}>{item.userName}</div>
                  <div className={cls.userPosition}>{item.userPosition}</div>
                </div>
                <div className={cls.burger}>. . . </div>
              </div>

              <div className={cls.content_data}>
                  {
                  item.post_images?.length >=1 ?
                  <img className={cls.content} src={item.post_images[0]?.image} alt="404" /> :
                  <img className={cls.content} src='https://i.ytimg.com/vi/nrRM4XHJPMM/maxresdefault.jpg' alt="505" />
                }
              </div>
  
              <div className={cls.communication}>
  
                <div className={cls.comm1}>
                  <AiOutlineSend /> 
                  <TbMessageCircle />
                  <MdFavoriteBorder />
                </div>
  
                <div className={cls.comm2}>
                  <BsBookmark/>
  
                </div>
                  
              </div>

              <div>
                  <p>{item.title}</p>
              </div>
              <div className={cls.footer}>
                <input className={cls.inputCommet} type="text" placeholder='Добавте комментарий'/>
                <div className={cls.button}><FaRegSmile /></div>

              </div>
            </div> 
          )
        }
        )
      }
      <button 
				onClick={() => nextPagination()}
        disabled={page === TOTAL_PAGE}
			>
				+++++++++++++++++
			</button>
    </div>
  )
}

export default Card





