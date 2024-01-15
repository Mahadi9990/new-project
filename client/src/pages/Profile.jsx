import { useSelector } from "react-redux"
export default function Profile() {
  const {currentUser} =useSelector((state)=>state.user);
  return (
    <div className='p-3 mx-auto max-w-lg'>
      <p className='text-center text-3xl font-semibold'>Profile</p>
     
    </div>
  )
}
