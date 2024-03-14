import React from 'react'
import {Link} from 'react-router-dom'

export default function ListingItem({listing}) {
  return (
    <div>
      <Link to={`/listing/${listing._id}`}>
        <div className="flex flex-col gap-3 bg-slate-400 p-1">
          <img src={listing.image[0]} alt="" className='h-[120px] sm:h-[120px] w-full object-cover'/>
          <p className='w-[150px]'>{listing.textArea}</p>
        </div>
      </Link>
    </div>
  )
}
