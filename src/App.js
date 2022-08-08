import {Routes, Route} from 'react-router-dom'
import LandingPages from './Pages/LandingPages';
import Homepage from './Pages/Homepage';
import Register from './Pages/Register';
import Login from './Pages/Loginpage';
import ForgotPass from './Pages/ForgotPass';
import ProfilPage from './Pages/ProfilPage';
import EditProfil from './Pages/EditProfil';
import ChangePassword from './Pages/ChangePassword';
import VerifiedPage from './Pages/VerifiedPage';
import axios from 'axios';
import { API_URL } from './helper';
import { loginAction } from './action/useraction';
import { useDispatch, useSelector } from 'react-redux';
import { useState,useEffect } from 'react';

function App() {

  const dispatch = useDispatch()
  
  const keepLogin=()=>{
    let sosmed = localStorage.getItem('sosmed')
    if(sosmed){
      axios.get(API_URL+`/auth/keep`,{
        headers:{
          'Authorization': `Bearer ${sosmed}`
        }
      })
      .then((res)=>{
        console.log(res.data)
        if(res.data.idusers){
          localStorage.getItem('sosmed', res.data.idusers);
          delete res.data.token
          dispatch(loginAction(res.data));
        }
      })
      .catch((err)=>{
        console.log(err);
      })
    }
  }

  useEffect(() => {
    keepLogin();
}, []);

  return (
    <div>
      <Routes>
        <Route path='/' element={<LandingPages/>}/>
        <Route path='/home' element={<Homepage/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/reset' element={<ForgotPass/>}/>
        <Route path='/profil' element={<ProfilPage/>}/>
        <Route path='/edit' element={<EditProfil/>}/>
        <Route path='/change' element={<ChangePassword/>}/>
        <Route path='/verification/:token' element={<VerifiedPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
