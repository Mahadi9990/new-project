import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Contact from './pages/Contact';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Singin from './pages/Singin';
import Singup from './pages/Singup';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<Home/>}/>
        <Route path={'/contact'} element={<Contact/>}/>
        <Route path={'/profile'} element={<Profile/>}/>
        <Route path={'/sing-in'} element={<Singin/>}/>
        <Route path={'/sing-up'} element={<Singup/>}/>
      </Routes>
    </BrowserRouter>
  )
}
