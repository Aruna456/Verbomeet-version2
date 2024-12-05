import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Landing from './pages/Landing'
import { SignIn,SignUp } from './pages/AuthPage'
import Home from './pages/Home'
import Debates from './pages/Debates'
import UserProfile from './pages/UserProfile'
const App = () => {
  return (
    <div>
        <BrowserRouter>
       <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/signIn' element={<SignIn/>}/>
        <Route path='/signUp' element={<SignUp/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/debates' element={<Debates/>}/>
        <Route path='/profile' element={<UserProfile/>}/>
       </Routes>
       </BrowserRouter> 
     
    </div>
  )
}

export default App