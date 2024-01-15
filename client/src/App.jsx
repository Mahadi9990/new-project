import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Contact from './pages/Contact';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Singin from './pages/Singin';
import Singup from './pages/Singup';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';

export default function App() {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path={'/'} element={<Home/>}/>
        <Route path={'/contact'} element={<Contact/>}/>
        <Route element={<PrivateRoute/>}>
          <Route path={'/profile'} element={<Profile/>}/>
        </Route>
        <Route path={'/sing-in'} element={<Singin/>}/>
        <Route path={'/sing-up'} element={<Singup/>}/>
      </Routes>
    </BrowserRouter>
  )
}
