import {GoogleAuthProvider,getAuth, signInWithPopup} from 'firebase/auth';
import {app} from '../firebase';
import {useDispatch} from 'react-redux'
import { singInSuccess } from '../app/user/userSlice';
import {useNavigate} from 'react-router-dom';
export default function OAuth() {
  const dispatch =useDispatch()
  const navigate =useNavigate()
    const handleClickWithGoogle =async()=>{
        try {
            const provider =new GoogleAuthProvider();
            const auth =getAuth(app);
            const result = await signInWithPopup(auth,provider)
            const res =await fetch('/user/google',{
              method:"POST",
              headers:{
                'Content-Type':'application/json'
              },
              body:JSON.stringify({name:result.user.displayName,email:result.user.email,photo:result.user.photoURL})
            })
            const data =await res.json();
            dispatch(singInSuccess(data));
            navigate('/')
          } catch (error) {
            console.log('could not sing in with Google',error);
        }
    }
  return (
    <button type='button' onClick={handleClickWithGoogle} className='bg-red-500 text-white p-3 rounded-lg'>Connect with google</button>
  )
}
