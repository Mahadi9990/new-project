import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import About from './pages/About';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Singin from './pages/Singin';
import Singup from './pages/Singup';
import CreateListing from './pages/CreateListing';
import newUpdate from './pages/newUpdate';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import Listing from './pages/Listing';
import Search from './pages/Search';

export default function App() {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path={'/'} element={<Home/>}/>
        <Route path={'/about'} element={<About/>}/>
        <Route path={'/listing/:listingId'} element={<Listing/>}/>
        <Route path={'/search'} element={<Search/>}/>
        <Route element={<PrivateRoute/>}>
          <Route path={'/profile'} element={<Profile/>}/>
          <Route path={'/create-listing'} element={<CreateListing/>}/>
          <Route path={'/update/listing/:listingId'} element={<newUpdate/>}/>
        </Route>
        <Route path={'/sing-in'} element={<Singin/>}/>
        <Route path={'/sing-up'} element={<Singup/>}/>
      </Routes>
    </BrowserRouter>
  )
}
