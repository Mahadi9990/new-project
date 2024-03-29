import React, { useState } from 'react'
import {Link ,useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux';
import { singInStart,singInFailuor,singInSuccess } from '../app/user/userSlice';
import OAuth from '../components/OAuth';

export default function Singup() {
  const [formData,setFormData] =useState({})
  const {loading,error} =useSelector((state)=>state.user);
  const navigate =useNavigate();
  const dispatch =useDispatch();
  const handleChange = (e)=>{
    setFormData({
      ...formData,
      [e.target.id]:e.target.value
  })
  };
  const handleSubmit = async (e)=>{
    e.preventDefault();
    dispatch(singInStart());
    try {
      const res =await fetch('/user/sing-in',{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify(formData),
      });
      const data =await res.json();

      if(data.success === false){
        dispatch(singInFailuor(data.message));
        return
      }
      dispatch(singInSuccess(data));
      navigate('/')
    } catch (error) {
      dispatch(singInFailuor(error.message));
    }
  }
  return (
    <>
      <div className='justify-center max-w-lg mx-auto' id='main'>
        <h1 className='text-center my-7 text-3xl uppercase'>Sing In</h1>
        <form action="" onSubmit={handleSubmit} className='flex flex-col text-center gap-4'>
         <input type="email" onChange={handleChange}placeholder='email' className='border rounded-lg p-3' id='email'/>
         <input type="password" onChange={handleChange}placeholder='password' className='border rounded-lg p-3' id='password'/>
         <button disabled={loading} type="submit" className='bg-blue-700 uppercase rounded-lg p-3'>{loading ? 'Loading...': 'sing IN'}</button>
          <OAuth/>
        </form>
        <p>Dont Have a Acount <span className='text-blue-500 underline'><Link to="/sing-up">SingUp</Link></span></p>
        {error && <p className='text-red-500 m-3'>{error}</p>}
      </div>
    </>
  )
}
