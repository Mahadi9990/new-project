import { Link ,useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux';
import { CiSearch } from "react-icons/ci";
import { useEffect, useState } from 'react';

export default function Header() {
  const {currentUser} =useSelector((state)=>state.user)
  const [searchTerm,setSearchTerm] =useState("")
  const navigate =useNavigate();
  const handleSubmit =(e)=>{
    e.preventDefault()
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm',searchTerm);
    const searchQuary =urlParams.toString()
    navigate(`/search?${searchQuary}`)
  }
  useEffect(()=>{
    const urlParams =new URLSearchParams(location.search);
    const searchTermFromUrl =urlParams.get('searchTerm');
    if(searchTermFromUrl){
      setSearchTerm(searchTermFromUrl)
    }
  },[location.search])
  return (
    <div className='flex justify-between p-3'>
        <div className="left">
          <h1><Link to="/">Real State</Link></h1>
        </div>
        <form onSubmit={handleSubmit}className="flex gap-1">
          <input 
            type="text"  
            className='border-4 rounded-lg p-2'
            value={searchTerm}
            onChange={(e)=>setSearchTerm(e.target.value)}
          />
          <button>
            <CiSearch size={30} color="black" />
          </button>
        </form>
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
