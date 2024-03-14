import React, { useCallback, useEffect, useState } from 'react'
import {useFetcher, useNavigate} from 'react-router-dom'
import ListingItem from '../components/ListingItem';

export default function Search() {
  const [sidebarData,setSidebarData] =useState({
    searchTerm:'',
    type:"all",
    parking:false,
    furnished:false,
    offer:false,
    sort:"createdAt",
    order:"desc",
  })
  const [showMore, setshowMore] = useState(false);
  const [loading, setloading] = useState(false);
  const [listings, setlistings] = useState([]);
  console.log(listings)
  const navigate =useNavigate()
  useEffect(()=>{
    const urlParams =new URLSearchParams(location.search)
    const searchTermFromUrl =urlParams.get('searchTerm')
    const typeFromUrl =urlParams.get('type')
    const offerFromUrl =urlParams.get('offer')
    const parkingFromUrl =urlParams.get('parking')
    const furnishedFromUrl =urlParams.get('furnished')
    const sortFromUrl =urlParams.get('sort')
    const orderFromUrl =urlParams.get('order')

    if(
      searchTermFromUrl ||
      typeFromUrl || 
      offerFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      sortFromUrl ||
      orderFromUrl
      ){
        setSidebarData({
          searchTerm:searchTermFromUrl || " ",
          type:typeFromUrl || "all",
          parking:parkingFromUrl === "true" ? true :false,
          furnished:furnishedFromUrl === "true" ? true :false,
          offer:offerFromUrl === "true" ? true :false,
          sort:sortFromUrl || "created_at",
          order:orderFromUrl || "desc"
        })
    }

    const fetchFunction =async()=>{
      setloading(true);
      setshowMore(false)
      const searchQuery =urlParams.toString()
      const res = await fetch(`/user/new/get?${searchQuery}`);
      const data =await res.json()
      setlistings(data);
      setloading(false);
      if(data.length > 8){
        setshowMore(true)
      }else{
        setshowMore(false)
      }
    }
    fetchFunction();

  },[location.search])


  const handleChange =(e)=>{
    if(e.target.id === "all" || e.target.id === "rent" || e.target.id === "sale"){
      setSidebarData({...sidebarData,type:e.target.id})
    }
    if(e.target.id === 'searchTerm'){
      setSidebarData({...sidebarData,searchTerm:e.target.value})
    }
    if(e.target.id === "parking" || e.target.id === "furnished" || e.target.id === "offer"){
      setSidebarData({...sidebarData,[e.target.id]:e.target.checked || e.target.checked === "true" ? true : false})
    }
    if(e.target.id === 'sort_order'){
      const sort =e.target.value.split("_")[0] || "createdAt"
      const order =e.target.value.split("_")[1] || "desc"
      setSidebarData({...sidebarData,sort,order})
    }
  }
  const handleSubmit =(e)=>{
    e.preventDefault()
    const urlParams =new URLSearchParams()
    urlParams.set('searchTerm',sidebarData.searchTerm);
    urlParams.set('type',sidebarData.type);    
    urlParams.set('offer',sidebarData.offer);
    urlParams.set('furnished',sidebarData.furnished);
    urlParams.set('parking',sidebarData.parking);
    urlParams.set('sort',sidebarData.sort);
    urlParams.set('order',sidebarData.order);
    const searchQuery =urlParams.toString()
    navigate(`/search?${searchQuery}`)
  }
  const onShowMoreClick = async()=>{
    const numberOfListing =listings.length
    const startIndex = numberOfListing;
    const urlParams =new URLSearchParams(location.search)
    urlParams.set('startIndex',startIndex);
    const searchQuery =urlParams.toString()
    const res =await fetch(`user/new/get?${searchQuery}`)
    const data=await res.json()
    if(data.length < 9){
      setshowMore(false)
    }
    setlistings([...listings,...data])
  }
  return (
    <div className='flex flex-col md:flex-row justify-start'>
    <form className="p-3" onSubmit={handleSubmit}>
        <div className="flex items-center gap-2">
            <label className='font-semibold text-2xl'>SearchTerm :</label>
            <input 
            type="text" 
            className='border-4 rounded-lg p-2'
            id='searchTerm'
            value={sidebarData.searchTerm}
            onChange={handleChange}
            />
        </div>
          <div className="flex flex-row gap-2 flex-wrap my-2">
              <div className="flex gap-2">
                <label className='font-semibold text-2xl'> Type:</label>
                <div className='flex gap-1 items-center'>
                  <input
                    type="checkbox" 
                    id="all"
                    onChange={handleChange}
                    checked={sidebarData.type === "all"}
                  />
                  <span>Rent&Sele</span>
                </div>
              </div>
              <div className='flex gap-1 items-center'>
                  <input 
                    type="checkbox" 
                    id="rent"
                    onChange={handleChange}
                    checked={sidebarData.type === "rent"}
                    />
                  <span>Rent</span>
                </div>
                <div className='flex gap-1 items-center'>
                  <input 
                    type="checkbox" 
                    id="sale"
                    onChange={handleChange}
                    checked={sidebarData.type === "sale"}
                    />
                  <span>Sale</span>
                </div>
                <div className='flex gap-1 items-center'>
                  <input 
                    type="checkbox" 
                    id="offer"
                    onChange={handleChange}
                    checked={sidebarData.offer}
                  />
                  <span>Offer</span>
                </div>
                
          </div>
          <div className="flex flex-row gap-2 flex-wrap my-2">
              <div className="flex gap-2">
                <label className='font-semibold text-2xl'> Amenities:</label>
                <div className='flex gap-1 items-center'>
                  <input 
                    type="checkbox" 
                    id="parking"
                    onChange={handleChange}
                    checked={sidebarData.parking}
                  />
                  <span>Parking</span>
                </div>
              </div>
              <div className='flex gap-1 items-center'>
                  <input 
                    type="checkbox" 
                    id="furnished"
                    onChange={handleChange}
                    checked={sidebarData.furnished}
                  />
                  <span>Furnished</span>
                </div>
          </div>
          <div className="flex items-center gap-3">
            <label className='font-semibold text-2xl'>sort:</label>
            <select 
              id="sort_order" 
              className='border rounded-lg p-3'
              onChange={handleChange}
              defaultValue={"createdAt_desc"}
            >
              <option value="regularPrice_desc">Price high to low</option>
              <option value="regularPrice_asc">Price low to high</option>
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Oldest</option>
            </select>
          </div>
          <button 
            className='bg-green-500 rounded-lg p-2 mt-5 uppercase hover:opacity-80 font-semibold'

          >Search</button>
      </form>
    <div className="">
      <label className='font-semibold text-3xl'>Listing :</label>
      <div className="flex flex-row flex-wrap gap-4 p-3">

      {!loading && listings.length === 0 &&(
        <p>NO list is Found</p>
      )}
      {loading &&(
        <p>Loading...</p>
      )}
      {!loading && listings && listings.map((listing)=>
        <ListingItem key={listing._id} listing={listing}/>
      )}
      
      </div>
      {showMore && (
        <button
          onClick={onShowMoreClick}
        >show More</button>
      )}
    </div>
    </div>
  )
}
