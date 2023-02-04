import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { getMoreStories } from '../../config'
import cls from './getMoreStories.module.scss'

const MoreStories = () => {
  const accessToken = localStorage.getItem('accessToken');  
  const [moreStories , setMoreStories] = useState('')
  const { id } = useParams();


    

  // useEffect(() => {
  //   getMoreStories(id).then(r => {
  //     console.log(r);
  //     setMoreStories(r.data)
  //   })
  // } , [])


  useEffect(() => {
    getMoreStories(accessToken).then((r) => {
      setMoreStories(r.data?.user === Number(id) ? r.data : null);
    });
  }, []);

  console.log(moreStories);

  return (
    <div>
      
    </div>
  )
}

export default MoreStories
