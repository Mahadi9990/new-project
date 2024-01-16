import { useSelector } from "react-redux"
import {useRef,useState,useEffect} from 'react';
import {getDownloadURL, getStorage,ref, uploadBytesResumable} from 'firebase/storage';
import {app} from '../firebase.js'

// google firebase use
//       allow read;
//       allow write: if
//       request.resource.size < 2 * 1024 * 1024 &&
//       request.resource.contentType.matches('image/.*')


export default function Profile() {
  const {currentUser} =useSelector((state)=>state.user);
  const fileRef =useRef(null);
  const [file,setFile] =useState(undefined)
  const [filePerc,setFilePerc] =useState(0);
  const [fileUploadError,setFileUploadError] =useState(false);
  const [fromData,setFromData] =useState({})

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
              setFromData({...fromData,avater:downloadUrl})
            }
          )
        }
      )
  }

  return (
    <div className='p-3 mx-auto max-w-lg'>
      <p className='text-center text-3xl font-semibold'>Profile</p>
      <form className="flex flex-col gap-4">
        <input onChange={
          (e)=>setFile(e.target.files[0])} 
          type="file" 
          hidden ref={fileRef} accept="image/*"
          />
        <img onClick={()=>fileRef.current.click()} src={fromData.avater || currentUser.avater} alt="profile" className="cursor-pointer mt-2 self-center w-10 h-10 object-cover rounded-full"/>
        <p className="self-center">
          {fileUploadError ?(<span className="text-red-500">Error to upload File</span>):
          filePerc > 0 && filePerc <100 ?(<spna className="text-blue-500">{`Uploading ${filePerc} %` }</spna>):
          filePerc === 100 ?(<span className="text-green-500">Image Uploading successfull</span>):
          ''
          }
          </p>
        <input id='userName' type="text" placeholder="UserName" className="border rounded-lg p-3"/>
        <input id='email' type="text" placeholder="Email" className="border rounded-lg p-3"/>
        <input id='password' type="text" placeholder="Password" className="border rounded-lg p-3"/>
        <button className="text-white bg-slate-500 rounded-lg p-3 uppercase hover:opacity-90
        disabled:opacity-85">Update</button>
      </form>
      <div className="flex flex-row justify-between p-3">
        <spna className="font-semibold text-1xl text-red-600 uppercase">Delet account</spna>
        <spna className="font-semibold text-1xl text-red-600 uppercase">Sing Out</spna>
      </div>
    </div>
  )
}
