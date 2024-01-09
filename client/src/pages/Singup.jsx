import React, { useState } from 'react'
import {Link} from 'react-router-dom'

export default function Singup() {
  const [formData,setFormData] =useState({})
  const handleChange = (e)=>{
    setFormData({
      ...formData,
      [e.target.id]:e.target.value
  })
  };
  const handleSubmit = async (e)=>{
    e.preventDefault();
    const res =await fetch('/user/outh',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify(formData),
    });
    const data =await res.json();
    console.log(data);
    
  }
  console.log(formData);
  return (
    <>
      <div className='justify-center' id='main'>
        <h1 className='text-center my-7 text-3xl uppercase'>Sing Up</h1>
        <form action="" onSubmit={handleSubmit} className='flex flex-col text-center gap-4'>
         <input type="text" onChange={handleChange}placeholder='User name' className='border rounded-lg p-3' id='userName'/>
         <input type="email" onChange={handleChange}placeholder='email' className='border rounded-lg p-3' id='email'/>
         <input type="password" onChange={handleChange}placeholder='password' className='border rounded-lg p-3' id='password'/>
         <button type="submit" className='bg-blue-700'>Singup</button>
        </form>
        <p>Have a Acount <span className='text-blue-500 underline'><Link to="/sing-in">SingIn</Link></span></p>
      </div>
    </>
  )
}
