import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import FirebaseContext from '../context/firebase'
import UserContext from '../context/user'
import * as ROUTES from '../constants/routes'
import { IoHomeOutline } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";

const Header = () => {

  const { firebase } = useContext(FirebaseContext);
  const { user } = useContext(UserContext)

  return (
    <header className='h-16 bg-white border-b border-gray-primary mb-8'>
      <div className='container mx-auto max-w-screen-lg h-full'>
        <div className='flex justify-between h-full'>
          <div className='text-gray-700 text-center flex items-center align-items cursor-pointer'>
            <h1 className='flex justify-center w-full'>
              <Link to={ROUTES.DASHBOARD}>
                <img src='/images/logo.png' alt='Instagram' className='mt-2 w-6/12' />
              </Link>
            </h1>
          </div>
          <div className='text-gray-700 text-center flex items-center align-items'>
            {user ? (
              <>
                <Link to={ROUTES.DASHBOARD}>
                  <IoHomeOutline className='w-8 mr-6 text-black-light' title="Home" />
                </Link>
                <button 
                  type='button' 
                  title="Sign out" 
                  onClick={() => firebase.auth().signOut()} 
                  onKeyDown={(event) => {if(event.key === 'Enter'){firebase.auth().signOut()}}}
                >
                  <CiLogout className='w-8 mr-6 text-black-light' title='LogOut' />
                </button>
                <div className="flex items-center cursor-pointer">
                  <Link to={`/p/${user.displayName}`}>
                    <img className='rounded-full h-8 w-8 flex' src={`/images/avatars/${user.displayName}.jpg`} alt={`${user.displayName} profile`} />
                  </Link>
                </div>
              </>
            ) : (
              <>
                <Link to={ROUTES.LOGIN}>
                  <button 
                    className='bg-blue-medium font-bold text-sm rounded text-white w-20 h-8' 
                    type='button' 
                    title="Login"
                  >
                    Login
                  </button>
                </Link>
                <Link to={ROUTES.SIGN_UP}>
                  <button 
                    className='font-bold text-sm rounded text-blue-medium w-20 h-8' 
                    type='button' 
                    title='Sign Up'
                  >
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header