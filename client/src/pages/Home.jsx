import React ,{useState,useEffect}from 'react'
import {Link} from 'react-router-dom'
import ListingItem from '../components/ListingItem';
import { Swiper, SwiperSlide} from 'swiper/react'
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle'

export default function Home() {
  const [offerList, setofferList] = useState([]);
  const [rentList, setrentList] = useState([]);
  const [saleList, setsaleList] = useState([]);
  SwiperCore.use([Navigation]);

  useEffect(() => {
    const fetctOfferList=async()=>{
      try {
        const res=await fetch(`/user/new/get?offer=true&limit=4`)
        const data=await res.json()
        setofferList(data)
        fetchRentList()
      } catch (error) {
        console.log(error)
      }
    }
    const fetchRentList=async()=>{
      try {
        const res=await fetch(`/user/new/get?type=rent&limit=4`)
        const data=await res.json()
        setrentList(data)
        fetchSaleList()
      } catch (error) {
        console.log(error)
      }
    }
    const fetchSaleList=async()=>{
      try {
        const res=await fetch(`/user/new/get?type=sale&limit=4`)
        const data=await res.json()
        setsaleList(data)
      } catch (error) {
        console.log(error)
      }
    }
    fetctOfferList();
  }, []);
  return (
    <div>
        {/*Top Area*/}
        <div className=" pt-5 ps-5">
          <h1 className='text-4xl font-semibold'>Find Your Next 
          <span className='ps-2 text-pink-600'>Prefect</span>
          <br />
          <span className='text-slate-600'>Place is here</span>
          </h1>
          <p className='pt-3'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sequi aspernatur nemo illo temporibus delectus inventore possimus ab ipsa maxime veritatis!</p>
          <Link to={'/search'}className="text-blue-500">Let's get start....</Link>
        </div>
        {/* slider Area */}
        <Swiper navigation>
          {offerList && offerList.length >0 && offerList.map(
            (listing)=>(
              <SwiperSlide key={listing._id}>
            <div style={{
              background:`url(${listing.image[0]}) center no-repeat`,
              backgroundSize:'cover',
              backgroundImage:'center'
            }} className='h-[500px] '></div>
          </SwiperSlide>
            )
          )}
          
        </Swiper>
        {/* Offer,parking,markit */}
      {offerList && offerList.length > 0 && (
        <div className="p-5">
        <div className="">
          <h1>Recent Offer</h1>
          <Link to={`/search?offer=true`}>Show more</Link>
        </div>
        <div className="flex flex-row">
          {offerList.map((listing)=>(
            <ListingItem key={listing._id} listing={listing}/>
          ))}
        </div>
      </div>
      )}
      {rentList && rentList.length > 0 && (
        <div className="p-5">
        <div className="">
          <h1>Recent rent</h1>
          <Link to={`/search?type=rent`}>Show more</Link>
        </div>
        <div className="flex flex-row">
          {rentList.map((listing)=>(
            <ListingItem key={listing._id} listing={listing}/>
          ))}
        </div>
      </div>
      )}
      {saleList && saleList.length > 0 && (
        <div className="p-5">
        <div className="">
          <h1>Recent sale</h1>
          <Link to={`/search?type=sale`}>Show more</Link>
        </div>
        <div className="flex flex-row">
          {saleList.map((listing)=>(
            <ListingItem key={listing._id} listing={listing}/>
          ))}
        </div>
      </div>
      )}
    </div>
  )
}
