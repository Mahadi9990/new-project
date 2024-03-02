import {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { Swiper, SwiperSlide} from 'swiper/react'
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle'
import {useSelector} from 'react-redux'
import ContactUser from './ContactUser';
export default function Listing() {
  SwiperCore.use([Navigation]);
  const params =useParams()
  const [listing,setListing] =useState(null)
  const [error,setError] =useState(false)
  const [loading,setLoading] =useState(false)
  const { currentUser } =useSelector((state)=>state.user)
  const [contact,setContact] =useState(false)

  useEffect(()=>{
    const fetchFunction =async()=>{
      try {
        setLoading(true)
        const res =await fetch(`/user/create/get/${params.listingId}`)
        const data=await res.json()
        if(data.success === false){
          setLoading(false)
          setError(true)
          return;
        }
        setLoading(false)
        setError(false)
        setListing(data); 
      } catch (error) {
        setError(true)
        setLoading(false)
      }
    }
    fetchFunction()
  },[params.listingId])
  return (
    <main>
      {error && <p className='text-center text-2xl my-7'>something is wrond</p>}
      {loading && <p className='text-center text-2xl my-7'>Loading...</p>}
      {listing && !error && !loading &&
        <div className='p-1'>
          <Swiper navigation>
            {listing.image.map((url) =>
              (
              <SwiperSlide key={url}>
                <div style={{
                  background:`url(${url}) center no-repeat`,
                  backgroundSize:'cover',
                  backgroundImage:'center'
                }} className='h-[500px] '></div>
              </SwiperSlide>
              )
              )}
          </Swiper>
          <p className='text-2xl font-semibold uppercase my-2'>{listing.title} - $ {listing.market}{listing.type === 'rent'? <span className='lowercase'>/month</span>:' '}</p>
          <p className='text-1xl font-semibold my-2'>loaction: {listing.address}</p>
          <div className='flex gap-4'>
            <div className='rounded-lg left w-full max-w-[200px] bg-red-500 p-2 text-center text-2xl font-semibold'>{listing.type === 'rent'? 'For Rent':'For sele'}</div>
            {listing.offer && 
                        <div className='rounded-lg right w-full max-w-[200px] bg-green-500 p-2 text-center text-2xl font-semibold'>
                         Discount-$ {+listing.market - +listing.discount}
                          </div>

            }
          </div>
          <p className='lowercase my-2'><span className=' text-center text-1xl font-semibold uppercase'>Discription</span> - {listing.textArea}</p>
          <ul className='font-semibold flex flex-row justify-around gap-1 flex-wrap text-green-600 text-1xl'>
            <li>Bed: {listing.badroom}</li>
            <li>Bath: {listing.bathroom}</li>
            {listing.parking && <li>Parking</li>}
            {listing.furnished && <li>Furnished</li>}
          </ul>
          {currentUser && listing.userRef !== currentUser._id && !contact &&
            <button onClick={()=>setContact(true)} className='item-center bg-slate-500 uppercase text-black rounded-lg p-3 hover:opacity-95'>Contact landloar</button>
          }
          {contact && <ContactUser listing={listing}/>}
        </div>
      }
    </main>
  )
}


