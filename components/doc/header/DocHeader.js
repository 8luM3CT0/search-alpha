//front-end
import { DocumentTextIcon } from '@heroicons/react/solid'
import {
  SearchCircleIcon,
  ChatIcon,
  SearchIcon
} from '@heroicons/react/outline'
//back-end
import { useRouter } from 'next/router'
import { userCreds } from '../../../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

function DocHeader () {
  const [user] = useAuthState(userCreds)
  const router = useRouter()

  return (
    <header
      className='
    bg-gray-800 
    z-50 sticky 
    top-0 
    py-4 
    px-10 
    flex 
    items-center 
    justify-between
    border-b-2 
    space-x-4
    border-blue-400'
    >
      <div
        className='
            flex
            items-center
            space-x-4
            '
      >
        <DocumentTextIcon
          className='
        h-10 
        cursor-pointer 
        text-blue-300'
        />
        <h1
          className='
        link 
        font-google-sans 
        text-gray-100 
        hidden 
        md:inline-flex'
        >
          Docs
        </h1>
      </div>
      {/**docs searchbar */}
      <div className='docHeaderInput'>
        <input
          type='text'
          placeholder='Search Docs...'
          className='
          text-white
          border-0 
          outline-none 
          bg-transparent 
          border-b-2 
          border-blue-200 
          flex-1'
        />
        <SearchIcon className='text-blue-200 h-7' />
      </div>
      {/**docs icons */}
      <div className='flex items-center space-x-4'>
        <div onClick={() => router.push('/')}>
          <h1 className='link text-gray-100'>Search</h1>
          <SearchCircleIcon className='headerIcons text-blue-200' />
        </div>
        <div onClick={() => router.push('/chat')}>
          <h1 className='link text-gray-100'>Chat</h1>
          <ChatIcon className='headerIcons text-blue-200' />
        </div>
        <img
          src={user?.photoURL}
          alt=''
          className='
          h-8 
          md:h-10 
          rounded-full 
          object-contain 
          cursor-pointer'
        />
      </div>
    </header>
  )
}

export default DocHeader
