import { useEffect, useState } from "react";
import { getDownloadURL, getStorage, uploadBytesResumable,ref } from "firebase/storage";
import { app } from "../firebase";
import {useSelector} from 'react-redux';
import {useNavigate ,useParams} from 'react-router-dom';

export default function UpdataList() {
const {currentUser} =useSelector(state =>state.user)
const [files,setFiles] =useState([]);
const params =useParams();
const navigate =useNavigate();
const [fromData,setFromData] =useState({

  image:[],
  title:"",
  textArea:"",
  address:"",
  type:"rent",
  offer:false,
  parking:false,
  furnished:false,
  market:0,
  discount:0,
  bathroom:0,
  badroom:0

})
const [uploadButton,setUploadButton] =useState(false);
const [imageUploadError,setImageUploadError] =useState(false);
const [loading,setLoading] =useState(false)
const [error,setError] =useState(false)
const [creatListMongoose,setCreatListMongoose] =useState(false);

useEffect(()=>{
  const fetchFunction =async()=>{
    const listingId =params.listingId
    const res =await fetch(`/user/create/get/${listingId}`);
    const data =await res.json();
    if(data.success === false){
      console.log(data.message)
      return;
    };
    setFromData(data);
  }
  fetchFunction();
},[]);

const handleImageUpload = () =>{
  if(files.length > 0 && files.length +fromData.image.length < 4){
    setUploadButton(true);
    setImageUploadError(false)
const promises =[]
  for( let i=0; i < files.length; i++){
    promises.push(storeImage(files[i]));
  }
    Promise.all(promises).then((urls)=>{
      setFromData({...fromData,image:fromData.image.concat(urls)})
      setImageUploadError(false);
      setUploadButton(false)
    }).catch((err)=>{
      setImageUploadError("Image Upload Error")
    })
 }else{
  setImageUploadError('You can only upload 3 image');
  setUploadButton(false)
 }
}
 const storeImage =async(file)=>{
  return new Promise((resolve,reject) =>{
    const storage = getStorage(app)
    const fileName = new Date().getTime() + file.name;
    const storageRef =ref(storage,fileName);
    const uploadTask =uploadBytesResumable(storageRef,file);
    
    uploadTask.on('state_changed', 
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    },
    (error)=>{
        reject(error);
      },
      ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl)=>{
          resolve(downloadUrl);
        })
      })
  })
 }
 const handleDeletImage =(index)=>{
  setFromData({...fromData, image:fromData.image.filter((_,i)=>
    i !== index
  )}
  )}
  const handleChange =(e)=>{
    if(e.target.id === "sale" || e.target.id === "rant"){
      setFromData({...fromData,type:e.target.id})
    }
    if(e.target.id === "offer" || e.target.id === "furnished" || e.target.id === "parking"){
      setFromData({...fromData,[e.target.id]:e.target.checked})
    }
    if(e.target.type === "text" || e.target.type === "number" || e.target.type === "textarea"){
      setFromData({...fromData ,
        [e.target.id] :e.target.value
      })
    }
  }
  const handleSubmit =async(e)=>{
    e.preventDefault()

    try {
      if(fromData.image.length < 1) return setError("You should add one image")
      if(+fromData.market  < +fromData.discount) return setError("Market Price is Gaterthan Discount price")

      setLoading(true)
      setError(false)
      const res = await fetch(`/user/create/update/${params.listingId}`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          ...fromData,userRef:currentUser._id
        })
      });
      const data =await res.json()
      if(data.success === false){
        setError(data.message);
        setLoading(false);
      }
      setCreatListMongoose(true);
      navigate(`/listing/${data._id}`);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  }
  return (
    <div className="main">
        <h1 className='uppercase text-5xl my-5 text-center font-semibold'>Update List</h1>
      <form onSubmit={handleSubmit} className='p-5 flex flex-row justify-center items-start gap-4'>
          <div className='left-area'>
            <div className='flex flex-col gap-3'>
                <input 
                  onChange={handleChange} 
                  value={fromData.title} 
                  className='outline-none bg-slate-300 rounded-lg p-3' 
                  required 
                  type="text" 
                  placeholder='title' 
                  id='title'
                />
                <textarea 
                  onChange={handleChange} 
                  value={fromData.textArea} 
                  className='outline-none bg-slate-300 rounded-lg p-3' 
                  required 
                  placeholder="Discription" 
                  name="" 
                  id="textArea" 
                  cols="30" 
                  rows="2"
                  type="textarea"
                >
                </textarea>
                <input 
                  onChange={handleChange} 
                  value={fromData.address} 
                  className='outline-none bg-slate-300 rounded-lg p-3'
                  required 
                  type="text" 
                  placeholder='Address' 
                  id='address'
                />
            </div>
            <div className='flex flex-row flex-wrap'>
              <div className='flex gap-2 p-3'>
                <input 
                 id="sale"
                 type="checkbox" 
                 onChange={handleChange}
                 checked={fromData.type === 'sale'}
                />
                <label>Sale</label>
              </div>
              <div className='flex gap-2 p-3'>
                <input 
                  id="rent" 
                  type="checkbox" 
                  onChange={handleChange}
                  checked={fromData.type === 'rent'}
                />
                <label>rent</label>
              </div>
              <div className='flex gap-2 p-3'>
                <input 
                  id="offer" 
                  type="checkbox" 
                  checked={fromData.offer}
                  onChange={handleChange}
                  />
                <label>Offer</label>
              </div>
              <div className='flex gap-2 p-3'>
                <input 
                  id="parking" 
                  type="checkbox" 
                  checked={fromData.parking}
                  onChange={handleChange}
                />
                <label>Parking spot</label>
              </div>
              <div className='flex gap-2 p-3'>
                <input 
                  id="furnished" 
                  type="checkbox" 
                  checked={fromData.furnished}
                  onChange={handleChange}
                />
                <label >Furnished</label>
              </div>
            </div>
            <div className="p-5">
              <div className="p-2">
                  <input 
                  id='bathroom' 
                  type="number" 
                  placeholder="0"
                  max="9"
                  min="0"
                  value={fromData.bathroom}
                    onChange={handleChange}
                  />
                  <span>Bathroom</span>
                </div>
                <div className="p-2">
                <input 
                 id='badroom' 
                 type="number"  
                 placeholder="0"
                 value={fromData.badroom}
                  onChange={handleChange}
                  max="9"
                  min="0"
                 />
                <span>Badroom</span>
              </div>
            </div>
            <div className='flex flex-col gap-4 justify-between'>
              <div>
                <input 
                  id='market' 
                  type="number" 
                  max="500000000"
                  min="50" 
                  placeholder="50" 
                  value={fromData.market}
                  onChange={handleChange}
                  />
                <span>Market prices</span>
              </div>
              {fromData.offer && (
                <div>
                <input 
                 id='discount' 
                 type="number" 
                 max="500000000"
                 min="50" 
                 placeholder="0"
                 value={fromData.discount}
                  onChange={handleChange}
                 />
                <span>Discount prices</span>
              </div>
              )}
              

            </div>
          </div>
          <div className="right-area">
              <div className='flex justify-between items-start p-5'>
                <input disabled={uploadButton} onChange={(e)=>setFiles(e.target.files) } type="file" id='image' accept='image/*' multiple/>
                <button type="button" onClick={handleImageUpload} className='bg-green-500 p-2 rounded font-semibold'>
                  {uploadButton ? "UPLOADING...": 'UPLOAD'}
                  </button>
              </div>
              <p className="text-red-500 pb-5 font-semibold">{imageUploadError ? imageUploadError : ""}</p>
              {
                fromData.image.length > 0 ? fromData.image.map((url,index)=> (
                  <div key={url}className="flex justify-between self-center p-1">
                    <img className="w-20 h-20 border rounded-lg gap-3" src={url}/>
                    <div className="flex self-center">
                      <button type="button" onClick={()=>{handleDeletImage(index)}}className="uppercase text-red-500">Delete</button>
                    </div>
                  </div>
                )):""
              }
              <button className="text-center text-white bg-green-500 border rounded-lg p-3 uppercase hover:opacity-90
            disabled:opacity-85">Update Listing</button>
            {error && <p className="text-red-500 pt-3">{error}</p>}
            {creatListMongoose && <p className="text-green-500 font-semibold pt-5">Create list successfully</p>}
          </div> 
                   
      </form>
    </div>
  )
}
