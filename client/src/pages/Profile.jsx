import { useSelector } from "react-redux"
import {useRef,useState,useEffect} from 'react';
import {getDownloadURL, getStorage,ref, uploadBytesResumable} from 'firebase/storage';
import {app} from '../firebase.js'
import {Link} from 'react-router-dom'
import {
   updateUserStart,
   updateUserSuccess,
   updateUserFailure,
   deleteUserStart,
   deleteUserSuccess,
   deleteUserFailure,
   singOutUserStart,
   singOutUserSuccess,
   singOutFailuor
  } from "../app/user/userSlice.js";
import { useDispatch } from "react-redux";
// google firebase use
//       allow read;
//       allow write: if
//       request.resource.size < 2 * 1024 * 1024 &&
//       request.resource.contentType.matches('image/.*')


export default function Profile() {
  const {currentUser,loading,error} =useSelector((state)=>state.user);
  const fileRef =useRef(null);
  const [file,setFile] =useState(undefined)
  const [filePerc,setFilePerc] =useState(0);
  const [fileUploadError,setFileUploadError] =useState(false);
  const [formData,setFormData] =useState({})
  const dispatch =useDispatch();
  const [showListing,setShowListing] =useState(false);
  const [userUpdateSuccessfuly,setUserUpdateSuccessfully] =useState(false);
  const [userListings,setUserListings] =useState([])
  useEffect(()=>{
    if(file){
      handleFlieUpload(file)
    }
  },[file])

  const handleFlieUpload=(file)=>{
      const storage =getStorage(app);
      const fileName = new Date().getTime() +file.name
      const storageRef =ref(storage,fileName)
      const uploadTask =uploadBytesResumable(storageRef,file)

      uploadTask.on('state_changed',
      (snapshot)=>{
        const progress =(snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setFilePerc(Math.round(progress))
      },
        (error)=>{
          setFileUploadError(true);
        },
        ()=>{
          getDownloadURL(uploadTask.snapshot.ref).then(
            (downloadUrl)=>{
              setFormData({...formData,avatar:downloadUrl})
            }
          )
        }
      )
  }

  const handleUpdate =(e)=>{
    setFormData({...formData,[e.target.id]:e.target.value});
  }
  const handleSubmit =async(e) =>{
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/user/data/update/${currentUser._id}`, {
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify(formData),
      });
        const data =await res.json()
        if(data.success === false){
          dispatch(updateUserFailure(error.message));
          return
        }
        dispatch(updateUserSuccess(data));
        setUserUpdateSuccessfully(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  }
  const handleDelete =async(e) =>{
    try {
      dispatch(deleteUserStart());
      const res =await fetch(`user/data/delete/${currentUser._id}`,{
        method:"DELETE"
      })
      const data =await res.json()
      if(data.success === false){
        dispatch(deleteUserFailure(data.message))
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  }
  const handleSingOut =async()=>{
    try {
      dispatch(singOutUserStart())
      const res =await fetch('user/singout');
      const data =await res.json();

      if(data.success === false){
        dispatch(singOutFailuor(error.message));
        return;
      }
      dispatch(singOutUserSuccess(data));
    } catch (error) {
      dispatch(singOutFailuor(data.message))
    }
  }
  const handleShowList =async ()=>{
    try {
      setShowListing(false)
      const res =await fetch(`user/create/listing/${currentUser._id}`)
      const data =await res.json()
      if(data.success === false){
        setShowListing(true);
        return;
      }
      setUserListings(data);
    } catch (error) {
      setShowListing(true);
    }
  }
  const handleDeleteList = async(listingId)=>{
    try {
      const res =await fetch(`/user/create/delete/${listingId}`,{
        method:"DELETE"
      })
      const data =await res.json()
      if(data.success === false){
        console.log(data.message);
        return;
      }
      setUserListings((prev)=>{
        prev.filter((listing)=>{
          listing._id !== listingId
        })
      })
    } catch (error) {
      console.log(error.message)
    }
  }
  return (
    <div className='p-3 mx-auto max-w-lg'>
      <p className='text-center text-3xl font-semibold'>Profile</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input onChange={
          (e)=>setFile(e.target.files[0])} 
          type="file" 
          hidden ref={fileRef} accept="image/*"
          />
        <img onClick={()=>fileRef.current.click()} src={ formData.avatar|| currentUser.avatar} alt="profile" className="cursor-pointer mt-2 self-center w-10 h-10 object-cover rounded-full"/>
        <p className="self-center">
          {fileUploadError ?(<span className="text-red-500">Error to upload File</span>):
          filePerc > 0 && filePerc <100 ?(<span className="text-blue-500">{`Uploading ${filePerc} %` }</span>):
          filePerc === 100 ?(<span className="text-green-500">Image Uploading successfull</span>):
          ''
          }
          </p>
        <input onChange={handleUpdate} defaultValue={currentUser.userName} id='userName' type="text" placeholder="UserName" className="border rounded-lg p-3"/>
        <input onChange={handleUpdate} defaultValue={currentUser.email} id='email' type="text" placeholder="Email" className="border rounded-lg p-3"/>
        <input onChange={handleUpdate} id='password' type="password" placeholder="Password" className="border rounded-lg p-3"/>
        <button disabled={loading}className="text-white bg-slate-500 rounded-lg p-3 uppercase hover:opacity-90
        disabled:opacity-85">{loading ? "Loading":"Update"}</button>
      <Link to="/create-listing" className="text-white bg-green-500 rounded-lg p-3 uppercase hover:opacity-90
        disabled:opacity-85 text-center">
        Create Listing
      </Link>
      </form>
      <div className="flex flex-row justify-between p-3">
        <span onClick={handleDelete}className="cursor-pointer font-semibold text-1xl text-red-600 uppercase">Delete account</span>
        <span onClick={handleSingOut}className="cursor-pointer font-semibold text-1xl text-red-600 uppercase">Sing Out</span>
      </div>
      <button onClick={handleShowList} className="text-green-600 text-2xl font-semibold w-full">Show list</button>
      {userListings && userListings.length > 0 && 
      userListings.map((listing)=>(
        <div key={listing._id}className="pt-1 flex justify-between gap-3 text-center ">
          <img className="w-20 h-20 rounded-lg" src={listing.image[0]} alt="" />
          <p className="m-auto truncate">{listing.title}</p>
          <div className="flex flex-col item-center">
            <span onClick={ ()=>handleDeleteList(listing._id) } className="uppercase cursor-pointer text-red-500">delete</span>
            <Link to={`/update/listing/${listing._id}`}>
              <span className="uppercase cursor-pointer text-green-500">edit</span>
            </Link>
          </div>
        </div>
        ))}
      <p>{error ? error : " "}</p>
      <p className="py-5 text-green-600 text-center ">{userUpdateSuccessfuly ? 'Update user Successfully': " "}</p>
    </div>
  )
}
