import { useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Login from './apps/Login';
import Register from './apps/Registert';
import Main from './components/Main';
import Navbar from './components/Navbar';
import Profile from './page/Account';
import Accounts from './page/Accounts';
import Edit from './page/Edit';
import Interesting from './page/Interesting';
import Messages from './page/Messages/Messages';
import MorePosts from './page/MorePosts';
import MoreStories from './page/MoreStories';
import Reels from './page/Reels/Reels';
import Subscribers from './page/Subscribers';
import Subscriptions from './page/Subscriptions';
import ToCreate from './page/ToCreate';


function App() {
  const accessToken = localStorage.getItem('accessToken')
  const navigate = useNavigate();
  
  useEffect(() => {
    accessToken && navigate('/');
  }, [accessToken]);

  return(
    <>
      {
        accessToken ? 
        <div className="App_container">
          <Navbar />
          <Routes>
            <Route path='/' element={<Main/>} />
            <Route path='/account' element={<Profile/>} />
            <Route path='/account/edit' element={<Edit/>} />
            <Route path='/ToCreate' element={<ToCreate/>} />
            <Route path='/reels' element={<Reels/>} />
            <Route path='/messages' element={<Messages/>} />
            <Route path='/interesting' element={<Interesting/>} />
            <Route path='/stories/:id' element={<MoreStories/>} />
            <Route path='/users/:id' element={<Accounts/>} />
            <Route path="/users/:id/subscribers" element={<Subscribers />} />
            <Route path="/users/:id/subscriptions" element={<Subscriptions />} />
            <Route path="/posts/:id" element={<MorePosts />} />
            <Route path='*' element={<Navigate to='/'/>} />
          </Routes>
        </div> :
        <div>
          <Routes>
            <Route path='/user/register' element={<Register/>} />
            <Route path='/auth/login' element={<Login/>} />
            <Route path="*" element={<Navigate to={'/auth/login'} />} />
          </Routes>
        </div>

      }
    </>
  )
}

export default App;
