import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
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
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/sing-in">Sing In</Link></li>
          </ul>
        </div>
    </div>
  )
}
