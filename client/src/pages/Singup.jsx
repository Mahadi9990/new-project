import React, { useState } from 'react'
import {Link ,useNavigate} from 'react-router-dom'
import OAuth from '../components/OAuth';

export default function Singup() {
  const [formData,setFormData] =useState({})
  const [error ,setError] =useState(null);
  const [loading ,setLoading] =useState(false);
  const navigate =useNavigate();
  const handleChange = (e)=>{
    setFormData({
      ...formData,
      [e.target.id]:e.target.value
  })
  };
  const handleSubmit = async (e)=>{
    e.preventDefault();
    setLoading(true);
    try {
      const res =await fetch('/user/sing-up',{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify(formData),
      });
      const data =await res.json();
      if(data.success === false){
        setError(data.message);
        setLoading(false);
        return
      }
      setLoading(false);
      navigate('/sing-in')
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  }
  return (
    <>
      <div className='justify-center' id='main'>
        <h1 className='text-center my-7 text-3xl uppercase'>Sing Up</h1>
        <form action="" onSubmit={handleSubmit} className='flex flex-col text-center gap-4'>
         <input type="text" onChange={handleChange}placeholder='User name' className='border rounded-lg p-3' id='userName'/>
         <input type="email" onChange={handleChange}placeholder='email' className='border rounded-lg p-3' id='email'/>
         <input type="password" onChange={handleChange}placeholder='password' className='border rounded-lg p-3' id='password'/>
         <button disabled={loading} type="submit" className='bg-blue-700 uppercase'>{loading ? 'Loading...': 'sing up'}</button>
         <OAuth/>
        </form>
        <p>Have a Acount <span className='text-blue-500 underline'><Link to="/sing-in">SingIn</Link></span></p>
        {error && <p className='text-red-500 m-3'>{error}</p>}
      </div>
    </>
  )
}
