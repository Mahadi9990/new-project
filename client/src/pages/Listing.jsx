import { useState } from "react"
import { getDownloadURL, getStorage, uploadBytesResumable,ref } from "firebase/storage";
import { app } from "../firebase";

export default function Listing() {
 const [files,setFiles] =useState([])
const [fromData,setFromData] =useState({
  image:[]
})
const [uploadButton,setUploadButton] =useState(false);
const [imageUploadError,setImageUploadError] =useState(false);
console.log(fromData);
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
      console.log('Upload is ' + progress + '% done')},
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
    i  !== index
  )})
 }
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
                    <div className="flex flex-col self-center">
                      <button type="button" onClick={()=>{handleDeletImage(index)}}className="uppercase text-red-500">Delete</button>
                      <button className="uppercase text-green-500">Edit</button>
                    </div>
                  </div>
                )):""
              }
              <button className="text-center text-white bg-green-500 border rounded-lg p-3 uppercase hover:opacity-90
            disabled:opacity-85">Create Listing</button>
          </div>          
      </form>
    </div>
  )
}
