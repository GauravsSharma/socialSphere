import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Login from './components/login/Login';
import Sidebar from './components/sidebar/Sidebar';
import Register from './components/register/Register';
import { loadUser } from './actions/User';
import Home from './components/home/Home';
import Account from './components/account/Account';
import CreatePost from './components/createPost/CreatePost';
import ForgotPassword from './components/forgotPassword/ForgotPassword';
import ResetPassword from './components/forgotPassword/ResetPassword';
import Search from './components/search/Search';
const App = () => {
  const [isSideHidden, setIsSideBarHidden] = useState(true);
  const { isAuthenticated } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(loadUser());
    if(!isAuthenticated){
      navigate("/login")
    }
  }, [dispatch,isAuthenticated]);



  return (
    <div className='flex w-full relative h-screen'>
      {isSideHidden && <Sidebar />}
      
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register setIsSideBarHidden={setIsSideBarHidden} />} />
          <Route path="/profile" element={<Account setIsSideBarHidden={setIsSideBarHidden} />} />
          <Route path="/profile/:id" element={<Account setIsSideBarHidden={setIsSideBarHidden} />} />
          <Route path="/login" element={<Login setIsSideBarHidden={setIsSideBarHidden} />} />
          <Route path="/createpost" element={<CreatePost setIsSideBarHidden={setIsSideBarHidden} />} />
          <Route path="/search" element={<Search setIsSideBarHidden={setIsSideBarHidden} />} />
          <Route path="/forgot/reset/password" element={<ForgotPassword setIsSideBarHidden={setIsSideBarHidden} />} />
          <Route path="password/reset/:token" element={<ResetPassword setIsSideBarHidden={setIsSideBarHidden} />} />
        </Routes>
      </div>
  
  );
};

export default App;
