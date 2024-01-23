import React from 'react'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux';


export default function Header() {
  const {currentUser} =useSelector((state)=>state.user)
  return (
    <div className='flex justify-between p-3'>
        <div className="left">
          <h1><Link to="/">Real State</Link></h1>
        </div>
        <div className="middle">
          <input type="text" />
        </div>
        <div className="right">
          <ul className='flex flex-row gap-5'>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <Link to="/profile">
            {currentUser ? (<img src={currentUser.avatar} className='object-cover rounded-full w-7 h-7 '/>):
          ( <li>Sing In</li>)  
          }
            </Link>

          </ul>
        </div>
    </div>
  )
}
