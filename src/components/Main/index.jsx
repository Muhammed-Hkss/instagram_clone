import React, { useEffect, useState } from 'react'
import { getLikes, GetPosts, getSaves, GetUser, GetUsers } from '../../config'
import Loading from '../Loading'
import Recommendations from '../Recommendations'
import Slider from '../Slider'
import Card from './Card'
import cls from './Main.module.scss'
import { BiMessageAltAdd } from 'react-icons/bi'

const Main = () => {
  const accessToken = localStorage.getItem('accessToken')
  const [ currentUser, setCurretnUser ] = React.useState('')
  const [users , setUsers] = useState('')
  const [getPosts , setGetPosts] = useState('')
	const [data, setBase] = useState(getPosts)
  const [ saves, setSaves ] = useState(null)
  const [page, setPage] = useState(1)
  const [ likes, setLikes ] = useState(null)
  let PAGE_SIZE = 9
	const TOTAL_PAGE = Math.ceil(getPosts?.length / PAGE_SIZE)



  
  
  const [ refresh, setRefresh ] = useState('')






  useEffect(() => {
    GetPosts(accessToken).then(r => {
      setGetPosts(r.data)
    })
  } , [accessToken])



  useEffect(() => {
    const base = getPosts?.slice(
			page ,
			page * PAGE_SIZE,
		)
		setBase(base)
	}, [page , getPosts , PAGE_SIZE ])


  function nextPagination(){
		if(page !== TOTAL_PAGE){
			setPage(page + 1)
		}else {
			setPage(1)
		}
	}

  useEffect(() => {

    GetUsers().then(r => {
      setUsers(r.data)
    })

    getSaves(accessToken , currentUser?.id  )
    .then(res => {
      setSaves(res.data)
    })

    getLikes(currentUser?.id)
    .then(res => {
      setLikes(res.data)
    })
  } , [data])




  




  useEffect(() => {
    GetUser(accessToken).then(r => {
      setCurretnUser(r.data)
    })
  } , [accessToken])

  


  if (!data) return <div style={{position:'relative' , top:'20rem' , textAlign:'center'}}><Loading /></div>

  return (
    
    <>
      <div className={cls.container}>
        
        <div className={cls.slider_card}>
          <Slider />
          {
            data && data.map(item => (
              <Card key={item.id} likes={likes} data={data} saves={saves} setRefresh={setRefresh} refresh={refresh} item={item} users={users} />
            ))
          }
          <button 
            className={cls.add_cart_btn}
            onClick={() => nextPagination()}
            disabled={page === TOTAL_PAGE}
          >
            <BiMessageAltAdd />
          </button>
        </div>
        
        <div className={cls.recommendations}>
          <Recommendations />
        </div>
      </div>
    </>
  )
}


export default Main