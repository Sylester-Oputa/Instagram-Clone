import { useState, useEffect, useContext } from 'react'
import FirebaseContext from '../context/firebase'

const useAuthListener = () => {

   const [user, setUser] = useState(JSON.parse(localStorage.getItem('authUser')));
   const {firebase} = useContext(FirebaseContext);
   useEffect(() => {
      const listener = firebase.auth().onAuthStateChanged(() => {
         if(authUser) {
            // We have an auth user.... therefore we can store the user in local storage
            localStorage.setItem('authUser');
            JSON.stringify(authUser);
            setUser(authUser);
         } else {
            // If we don't have an auth user.... therefore clear the local storage
            localStorage.removeItem('authUser')
            setUser(null)
         }
      });
   
      return () => listener();
   }, [firebase]);
  return { user };
};

export default useAuthListener