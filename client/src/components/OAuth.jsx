import {GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import {app} from '../firebase';


export default function OAuth() {
  const handelClickWithGoogle = async ()=>{
    try {
      const provider =new GoogleAuthProvider()
      const auth =getAuth(app);

      const result = await signInWithPopup(auth,provider);
      console.log(result);
    } catch (error) {
      console.log('can not connect with google',error)
    }
  }
  return (
    <div>
        <button onClick={handelClickWithGoogle} className='uppercase bg-red-600 p-3 rounded-lg'>connect with google</button>
    </div>
  )
}
