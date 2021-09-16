//front-end
import { DocumentReportIcon, ViewGridIcon } from '@heroicons/react/solid'
import {
  ShoppingCartIcon,
  MailIcon,
  PhotographIcon
} from '@heroicons/react/outline'
import Modal from 'react-modal'
//back-end
import firebase from 'firebase'
import { userCreds, provider, store } from '../../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useEffect } from 'react'

function Header () {
  const [user] = useAuthState(userCreds)

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
            lastActive: firebase.firestore.FieldValue.serverTimestamp(),
            photoURL: user.photoURL,
            displayaName: user.displayName
          },
          { merge: true }
        )
    }
  }, [user])

  return (
    <header className='headerDiv'>
      <div
        className='
      text-white
      flex
      items-center
      space-x-4
      '
      >
        <h1 className='link hidden md:inline-flex'>About</h1>
        <DocumentReportIcon className='headerIcons' />
        <h1 className='link hidden md:inline-flex'>Store</h1>
        <ShoppingCartIcon className='headerIcons' />
      </div>
      <div
        className='
      flex 
      items-center 
      text-white 
      space-x-4'
      >
        <h1 className='link hidden md:inline-flex'>Mail</h1>
        <MailIcon className='headerIcons' />
        <h1 className='link hidden md:inline-flex'>Images</h1>
        <PhotographIcon className='headerIcons' />
        <ViewGridIcon className='h-6 md:h-10 cursor-pointer rounded-full hover:bg-gray-500' />
        {!user ? (
          <button
            onClick={signIn}
            type='submit'
            className='
            text-gray-800
            py-2
            px-6
            rounded-xl 
            bg-blue-300
            active:bg-blue-400
            active:text-white'
          >
            Sign in
          </button>
        ) : (
          <img
            loading='lazy'
            src='https://lh3.googleusercontent.com/ogw/ADea4I4wtUg3MHCpPxuIczZRSnxCyEQ1LVnaxR6OJtwpOw=s32-c-mo'
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

export default Header
