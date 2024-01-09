import React from 'react'
import {Link} from 'react-router-dom'

export default function Singin() {
  return (
    <>
      <div className='justify-center' id='main'>
        <h1 className='text-center my-7 text-3xl uppercase'>Sing Up</h1>
        <form action="" className='flex flex-col text-center gap-4'>
         <input type="email" placeholder='email' className='border rounded-lg p-3'/>
         <input type="password" placeholder='password' className='border rounded-lg p-3'/>
         <button type="submit" className='bg-blue-700'>Singup</button>
        </form>
        <p>Dont Have a Acount <span className='text-blue-500 underline'><Link to="/sing-up">SingUp</Link></span></p>
      </div>
    </>
  )
}
