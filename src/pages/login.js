import React, { useContext, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import FirebaseContext from '../context/firebase';
import * as ROUTES from '../constants/routes';

const Login = () => {
   const navigate = useNavigate();
   const { firebase } = useContext(FirebaseContext);
   const [ emailAddress, setEmailAddress ] = useState("");
   const [ password, setPassword] = useState("");
   const [ error, setError] = useState("");

   const isInvalid = password === "" || emailAddress === "";

   const handleLogin = async (event) => {
      event.preventDefault();
      try {
         await firebase.auth().signInWithEmailAndPassword(emailAddress, password);
         navigate(ROUTES.DASHBOARD);
      } catch (error) {
         if (error.code === "auth/invalid-credential"){
            setError('The email address or password is incorrect. Please try again.');
         } else if (error.code === "auth/invalid-email") {
            setError('Invalid email format.');
         } else {
            setError(error.message);
         }
         setEmailAddress('');
         setPassword('');
      }
   };

   useEffect(() => {
      document.title = 'Login - Instagram';
   }, []);

  return (
    <div className='container flex mx-auto max-w-screen-md items-center h-screen'>
      <div className='flex w-3/5'>
         <img 
            src='/images/iphone-with-profile.jpg'
            alt='iPhone with Instagram app'
         />
      </div>
      <div className='flex flex-col w-2/5'>
         <h1 className='flex justify-center w-full'>
            <img 
               className='mt-2 w-6/12 mb-4'
               src='/images/logo.png'
               alt='Instagram'
            />
         </h1>
         {error && <p className='mb-4 text-xs text-red-primary'>{error}</p>}
         <form onSubmit={handleLogin} method='POST'>
            <input 
               aria-label='Enter your email address' 
               type='text' 
               placeholder='Email address' 
               className='text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2' 
               onChange={({ target }) => setEmailAddress(target.value)}
               value={emailAddress}
            />
            <input 
               aria-label='Enter your password' 
               type='password' 
               placeholder='Password' 
               className='text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2' 
               onChange={({ target }) => setPassword(target.value)}
               value={password}
            />

            <button 
               disabled={isInvalid} 
               type='submit' 
               className={`bg-blue-medium text-white w-full rounded h-8 font-bold ${isInvalid && "opacity-50"}`}
            >
               Log In
            </button>
            <div className='flex justify-center items-center flex-col w-full bg-white rounded p-4 border border-gray-primary mt-4'>
               <p>Don't have an account?{` `} 
                  <Link to={ROUTES.SIGN_UP} className='font-bold text-sky-600'>Sign Up</Link>
               </p>
            </div>
         </form>
      </div>
    </div>
  )
}

export default Login;