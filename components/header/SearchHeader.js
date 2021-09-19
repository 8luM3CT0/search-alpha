//front-end
import {
  ShoppingCartIcon,
  MailIcon,
  ChatIcon,
  UserAddIcon,
  SearchIcon
} from '@heroicons/react/outline'
import SearchIcons from './SearchIcons'
//back-end
import { useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import { useAuthState } from 'react-firebase-hooks/auth'
import { userCreds, store } from '../../firebase'

function SearchHeader () {
  const router = useRouter()
  const [user] = useAuthState(userCreds)
  const searchInputRef = useRef(null)

  const signIn = () => {
    userCreds.signInWithPopup(provider).catch(alert)
  }

  useEffect(() => {
    if (user) {
      store
        .collection('users')
        .doc(user.uid)
        .set(
          {
            email: user.email,
            photoURL: user.photoURL,
            displayName: user.displayName
          },
          { merge: true }
        )
    }
  }, [user])

  return (
    <header
      className='
      bg-gray-700
    sticky 
    z-50 
    top-0 
    flex 
    items-center 
    py-5 
    px-6
    justify-evenly 
    border-b-2 
    border-gray-600'
    >
      <div className='flex items-center lg:mr-4'>
        {/**logo */}
        <h1
          onClick={() => router.push('/')}
          className='
      text-blue-200
      font-bold
      text-lg
      lg:text-2xl
      font-google-sans
      cursor-pointer
      underline
      animate-pulse
      '
        >
          SearchAlpha
        </h1>
      </div>
      <div className='flex-col flex-shrink lg:flex-grow space-y-3'>
        <form
          className='
        flex 
        flex-grow
        bg-gray-300
        items-center 
        py-3 
        px-5 
        w-full 
        max-w-md 
        sm:max-w-2xl 
        lg:max-w-2xl
        rounded-full
        '
        >
          <input
            type='text'
            value={searchInputRef}
            className='flex-grow border-0 outline-none bg-transparent'
          />
        </form>
        <div className='flex items-center space-x-4'>
          {/**StoreIcon */}
          {/**MailIcon */}
          {/**ChatIcon */}
        </div>
      </div>
      <div
        className='
      flex 
      items-center 
      text-white 
      space-x-4'
      >
        <div onClick={() => router.push('/')} className='searchLinks'>
          <SearchIcon className='linkIcon' />
          <h2 className='linkTitle'>Home</h2>
        </div>
        <div className='searchLinks'>
          <MailIcon className='linkIcon' />
          <h2 className='linkTitle'>Mail</h2>
        </div>
        <div className='searchLinks'>
          <ChatIcon className='linkIcon' />
          <h2 className='linkTitle'>Chat</h2>
        </div>
        <div className='searchLinks'>
          <ShoppingCartIcon className='linkIcon' />
          <h2 className='linkTitle'>Store</h2>
        </div>
        {!user ? (
          <UserAddIcon
            onClick={signIn}
            className='
        h-6 
        md:h-8 
        text-blue-200 
        border 
        border-blue-100
        active:text-blue-300
        cursor-pointer
        rounded-full
        '
          />
        ) : (
          <img
            onClick={() => userCreds.signOut()}
            loading='lazy'
            src={user?.photoURL}
            alt=''
            className='
          h-8 
          md:h-10
          rounded-full 
          object-contain
          cursor-pointer
          '
          />
        )}
      </div>
    </header>
  )
}

export default SearchHeader
