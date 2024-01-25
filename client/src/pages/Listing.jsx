import React from 'react'

export default function Listing() {
  return (
    <div className="main">
        <h1 className='uppercase text-5xl my-5 text-center font-semibold'>Create List</h1>
      <form className='p-5 flex flex-row justify-center items-start gap-4'>
          <div className='left-area'>
            <div className='flex flex-col gap-3'>
                <input className='outline-none bg-slate-300 rounded-lg p-3 'required type="text" placeholder='Title' id='titel'/>
                <textarea className='outline-none bg-slate-300 rounded-lg p-3 'required placeholder="Discription" name="" id="textArea" cols="30" rows="2"></textarea>
                <input className='outline-none bg-slate-300 rounded-lg p-3 'required type="text" placeholder='Address' id='address'/>
            </div>
            <div className='flex flex-row flex-wrap'>
              <div className='flex gap-2 p-3'>
                <input id="sale" type="checkbox" />
                <label >Sale</label>
              </div>
              <div className='flex gap-2 p-3'>
                <input id="rent" type="checkbox" />
                <label >rent</label>
              </div>
              <div className='flex gap-2 p-3'>
                <input id="offer" type="checkbox" />
                <label>Offer</label>
              </div>
              <div className='flex gap-2 p-3'>
                <input id="parking" type="checkbox" />
                <label>Parking spot</label>
              </div>
              <div className='flex gap-2 p-3'>
                <input id="furnished" type="checkbox" />
                <label >Furnished</label>
              </div>
            </div>
            <div className='flex flex-col gap-4 justify-between'>
              <div>
                <input id='market' type="number" max="500000000" min="50" placeholder="50" />
                <span>Market prices</span>
              </div>
              <div>
                <input id='discount' type="number" max="500000000" min="50" placeholder="0"/>
                <span>Discount prices</span>
              </div>
            </div>
          </div>
          <div className="right-area">
              <div className='flex justify-between items-start p-5'>
                <input type="file" id='image' accept='image/*' multiple/>
                <button className='bg-green-500 p-2 rounded font-semibold'>UPLOAD</button>
              </div>
              <button className="text-center text-white bg-green-500 border rounded-lg p-3 uppercase hover:opacity-90
            disabled:opacity-85">Create Listing</button>
          </div>          
      </form>
    </div>
  )
}
