import React, { useContext, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import FirebaseContext from '../context/firebase';
import * as ROUTES from '../constants/routes';
import { doesUsernameExist } from '../services/firebase';

const SignUp = () => {
   const navigate = useNavigate();
   const { firebase } = useContext(FirebaseContext);
   const [username, setUsername] = useState("");
   const [fullName, setFullName] = useState("");
   const [ emailAddress, setEmailAddress ] = useState("");
   const [ password, setPassword] = useState("");
   const [ error, setError] = useState("");

   const isInvalid = password === "" || emailAddress === "";

   const handleSignUp = async (event) => {
      event.preventDefault();
      const usernameExists = await doesUsernameExist(username);
      if(!usernameExists.length){
         try {
            const createdUserResult = await firebase.auth().createUserWithEmailAndPassword(emailAddress, password);
            await createdUserResult.user.updateProfile({
               displayName: username
            })

            // firebase user collection
            await firebase.firestore().collection('users').add({
               userId: createdUserResult.user.uid,
               username: username.toLowerCase(),
               fullName,
               emailAddress: emailAddress.toLowerCase(),
               following: [],
               dateCreated: Date.now()
            });
            navigate(ROUTES.DASHBOARD);
         
         } catch (error) {
            if (error.code === "auth/email-already-in-use"){
               setError('This email address has been used. Please try again.');
            } else if (error.code === "auth/invalid-email") {
               setError('Invalid email format.');
            }
         }
            setFullName('');
            setEmailAddress('');
            setPassword('');            
         } else {
            setError("This user already has an account. Try Log In");
      }
   };

   useEffect(() => {
      document.title = 'Sign Up - Instagram';
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
         <form onSubmit={handleSignUp} method='POST'>
            <input 
               aria-label='Enter username' 
               type='text' 
               placeholder='Username' 
               className='text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2' 
               onChange={({ target }) => setUsername(target.value)}
               value={username}
            />
            <input 
               aria-label='Enter your Full Name' 
               type='text' 
               placeholder='Full Name' 
               className='text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2' 
               onChange={({ target }) => setFullName(target.value)}
               value={fullName}
            />
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
               Sign Up
            </button>
            <div className='flex justify-center items-center flex-col w-full bg-white rounded p-4 border border-gray-primary mt-4'>
               <p>Have an account?{` `} 
                  <Link to={ROUTES.LOGIN} className='font-bold text-sky-600'>Log In</Link>
               </p>
            </div>
         </form>
      </div>
    </div>
  )
}

export default SignUp;