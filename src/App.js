import {Routes, Route} from 'react-router-dom'
import LandingPages from './Pages/LandingPages';
import Homepage from './Pages/Homepage';
import Register from './Pages/Register';
import ForgotPass from './Pages/ForgotPass';
import ProfilPage from './Pages/ProfilPage';
import EditProfil from './Pages/EditProfil';
import ChangePassword from './Pages/ChangePassword';
import VerifiedPage from './Pages/VerifiedPage';
import axios from 'axios';
import { API_URL } from './helper';
import { loginAction } from './action/useraction';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import NotFoundPage from './Pages/NotFoundPage';
import PostingDetail from './Pages/PostingDetail';

function App() {

  const dispatch = useDispatch()

  const { idusers} = useSelector(({ userReducer }) => {
    return {
      idusers: userReducer.idusers,
      status: userReducer.status
    }
  })
  
  const keepLogin=()=>{
    let sosmed = localStorage.getItem('sosmed')
    if(sosmed){
      axios.get(API_URL+`/auth/keep`,{
        headers:{
          'Authorization': `Bearer ${sosmed}`
        }
      })
      .then((res)=>{
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
        {
          idusers ?
          <>
          <Route path='/home' element={<Homepage/>}/>
          <Route path='/profil' element={<ProfilPage/>}/>
          <Route path='/edit' element={<EditProfil/>}/>
          <Route path='/change' element={<ChangePassword/>}/>
          <Route path='/p/:id' element={<PostingDetail/>}/>
          </>
          :
          <>
          <Route path='/' element={<LandingPages/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/reset' element={<ForgotPass/>}/>
          </>
        }
          <Route path='/verification/:token' element={<VerifiedPage/>}/>
        <Route path='*' element={<NotFoundPage/>} />
      </Routes>
    </div>
  );
}

export default App;
