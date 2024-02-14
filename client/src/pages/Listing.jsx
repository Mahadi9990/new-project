import {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { Swiper, SwiperSlide} from 'swiper/react'
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle'
export default function Listing() {
  SwiperCore.use([Navigation]);
  const params =useParams()
  const [listing,setListing] =useState(null)
  const [error,setError] =useState(false)
  const [loading,setLoading] =useState(false)

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
        <>
          <Swiper navigation>
            {listing.image.map((url) =>
              (
              <SwiperSlide key={url}>
                <div style={{background:`url(${url}) center no-repeat`,backgroundSize:'cover'}} className='h-[550px]'></div>
              </SwiperSlide>
              )
              )}
          </Swiper>
        </>
      }
    </main>
  )
}
