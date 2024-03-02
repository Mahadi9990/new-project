import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function ContactUser({listing}) {
  const [landLoar,setLandLoar]=useState(null)
  const [message,setMessage]=useState('')
  const onChange =(e)=>{
    setMessage(e.target.value);
  }
  useEffect(()=>{
    const fetchFunction =async()=>{
      try {
        const res =await fetch(`/user/create/${listing.userRef}`);
        const data=await res.json()
        setLandLoar(data);
      } catch (error) {
        console.log(error)
      }
    }
    fetchFunction()
  },[listing.userRef])
  return (
    <>
        {landLoar &&(
          <div>
            <p className='font-semibold text-1xl uppercase'>Contact : <span className='lowercase text-red-500'>{landLoar.userName}</span > for <span className=' text-red-500 lowercase'>{listing.title}</span></p>
            <textarea className='w-full border rounded-lg p-3' placeholder='Enter your message here' name="message" id="message" rows="2" value={message} onChange={onChange}></textarea>
            <Link
            to={`mailto:${landLoar.email}?subject=Regarding ${listing.title}&body=${message}`}
            className='text-white bg-black p-1 rounded-lg' 
            >
            Send Message
            </Link>
          </div>
        )}
    </>
  )
}
