import React, { useState } from 'react'
import { createImage, TocreatePost , TocreateStory } from '../../config';

import cls from './ToCreate.module.scss'


const ToCreate = () => {



  const accessToken = localStorage.getItem('accessToken')
  const [ file, setFile ] = useState(null)
  // const [ urlFile, setUrlFile ] = useState(null)
  const [fileStory, setFileStory] = useState(null)
  const [value, setValue] = useState  ('')

  const handleCreatePost = () => {
    TocreatePost({title: value}, accessToken)
    .then(r => {
      const formData = new FormData()
      formData.append('image', file);
      formData.append('post', r.data.id)
      createImage(formData , accessToken)
    })
  }




  const handleCreateStory = () => {
    const formData = new FormData()
    formData.append('file', fileStory)
    TocreateStory(formData, accessToken)
    .then(r => console.log(r.data))
  }



    


  return (
  
    <div className={cls.container}>

      <div className={cls.row}>
        <div className={cls.image_data}>
          {/* <img src={!file && !fileStory ? "https://www.mediplus.nl/static/version1617954515/frontend/Totem/mediplus/nl_NL/Magento_Catalog/images/product/placeholder/image.jpg" : 
            !fileStory ? 
            URL.createObjectURL(filePost) : 
            URL.createObjectURL(fileStory)} alt="" 
          /> */}
          {
            !file && !fileStory ? 
            <img src="https://www.mediplus.nl/static/version1617954515/frontend/Totem/mediplus/nl_NL/Magento_Catalog/images/product/placeholder/image.jpg" alt="" /> : 
            !fileStory ?
            <img src={`${file}`} alt="505" /> :
            <img src={fileStory} alt="404" />
          }
          
        </div>
        <div className={cls.input_for_posts}>
          <div className={cls.create_post}>
            <label htmlFor='filePost'>Choose photos for posts</label>
              <input 
                type="file" 
                id={"filePost"}
                onChange={e => setFile(e.target.files[0])}
              />
              


            {
              file && (
                <>
                  <div className={cls.post_title_data}>
                    <textarea value={value} onInput={e => setValue(e.target.value)} placeholder='Write a description'></textarea>
                    <button disabled={value.length <= 1} onClick={handleCreatePost}>Create</button>
                  </div>
                </>
              )
            }
          </div>
          
          <div className={cls.create_story}>
            <label htmlFor='fileStory'>Choose photos for story</label>
            <input 
              type="file" 
              name='fileStory' 
              id='fileStory' 
              onInput={(e) => setFileStory(e.target.files[0])}
            />
            {
              fileStory && (
                <>
                  <button onClick={handleCreateStory}>Post</button>
                </>
              )
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default ToCreate