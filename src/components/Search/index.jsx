import React, { useEffect, useState } from 'react'
import cls from './Search.module.scss'
import { useNavigate} from 'react-router-dom'
import { GetUsers } from '../../config'

const Search = ({setSearch}) => {
  const accessToken = localStorage.getItem('accessToken')
  const navigate = useNavigate()
  const [users , setUsers] = useState(null)
  const [username, setUsername] = useState("");


  

  useEffect(() => {
    GetUsers(accessToken).then(r => {
      setUsers(r.data)
    })
  } , [accessToken])


  const debouncedSearchTerm = useDebounce(username, 400);

  function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    
  
    useEffect(() => {
        const handler = setTimeout(() => {
          setDebouncedValue(value);
        }, delay);
        return () => {
          clearTimeout(handler);
        };
      },[value, delay]);
    return debouncedValue;
  }

  const SearchUsers = users && users.filter(item =>item.username.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ? item : null)






  return (
    <div className={cls.right_navbar}>
      <h2 className={cls.left_navbar_logo}>Поисковый запрос</h2>
      <div className={cls.input_data}>
          <input 
            placeholder='Поиск' 
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
      </div>
      
      <ul  className={cls.search_users_data}>
          {
          debouncedSearchTerm.length < 2 ? '' :
            SearchUsers.length < 2 ?


            SearchUsers && SearchUsers.map(item => {
              return(
                <li 
                  onClick={() => 
                    navigate(`/users/${item.id}` , setSearch(false))
                  }
                  key={item.id}
                >
                  <p>{item.username}</p>
                </li>
              )
            }) : 
            
            SearchUsers && SearchUsers.map(item => {
              return(
                <li 
                  onClick={() => 
                    navigate(`/users/${item.id}` , setSearch(false))
                  }
                  key={item.id}
                >
                  {
                    item.avatar === null ? 
                    <img className={cls.profile_image} src="https://bazametrov.ru/uploads/new-agency/default_logo_user.jpg" alt="" /> : 
                    <img className={cls.profile_image} src={item.avatar} alt="" />
                  }
                  <div>
                    <p>{item.username}</p>
                    <p>{item.bio}</p>
                  </div> 
                </li>
              )
            })
          }
      </ul>
    </div>
  )
}

export default Search