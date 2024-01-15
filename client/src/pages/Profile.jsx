import { useSelector } from "react-redux"
export default function Profile() {
  const {currentUser} =useSelector((state)=>state.user);
  return (
    <div className='p-3 mx-auto max-w-lg'>
      <p className='text-center text-3xl font-semibold'>Profile</p>
      <form className="flex flex-col gap-4">
        <img src={currentUser.avater} alt="profile" className="mt-2 self-center  h-27 w-27 object-cover rounded-full"/>
        <input type="text" placeholder="UserName" className="border rounded-lg p-3"/>
        <input type="text" placeholder="Email" className="border rounded-lg p-3"/>
        <input type="text" placeholder="Password" className="border rounded-lg p-3"/>
        <button className="text-white bg-slate-500 rounded-lg p-3 uppercase hover:opacity-90
        disabled:opacity-85">Update</button>
      </form>
      <div className="flex flex-row justify-between p-3">
        <spna className="font-semibold text-1xl text-red-600">Delet account</spna>
        <spna className="font-semibold text-1xl text-red-600">Sing Out</spna>
      </div>
    </div>
  )
}
