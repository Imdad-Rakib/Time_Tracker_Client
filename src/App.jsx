import Login from "./components/controllers/loginController";
import SignUpController from "./components/controllers/signUpController";
import SuccessMessage from "./components/views/successMessage";
import {useState} from 'react'
import PasswordRecoveryController from "./components/controllers/passwordRecoveryController";
import ResetPasswordController from "./components/controllers/resetPasswordController";
import Home from "./components/views/home";
import NotFound from "./components/views/notFound";
import Records from "./components/views/records";


import {BrowserRouter, Routes, Route} from 'react-router-dom'
export default function App(){
  const [userData, setUserData] = useState({})

  // this function is lifting state up from signUpController
  function getFormData(data){
    setUserData(data);
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/records' element={<Records />} />
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<SignUpController getFormData = {getFormData}/>} />
        <Route path='/success' element={<SuccessMessage userData = {userData}/>}/>
        <Route path='/passwordrecovery' element={<PasswordRecoveryController/>} />
        <Route path='/resetpassword' element={<ResetPasswordController/>} />
        <Route path='*' element={<NotFound/>} />
      </Routes>
    </BrowserRouter>
  );
}
