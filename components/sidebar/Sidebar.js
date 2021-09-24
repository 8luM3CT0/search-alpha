//front-end
import { ChatIcon, SearchIcon, UserAddIcon } from '@heroicons/react/outline'
//back-end
import { useRouter } from 'next/router'
import { userCreds, store } from '../../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'
import * as EmailChecker from 'email-validator'
import UserChat from './user-chat/UserChat'

function Sidebar () {
  const router = useRouter()
  const [user] = useAuthState(userCreds)
  const peepChatRef = store
    .collection('chats')
    .where('users', 'array-contains', user.email)
  const [chatSnapshot] = useCollection(peepChatRef)

  const userExists = receiver =>
    !!chatSnapshot?.docs.find(
      chat => chat.data().users.find(user => user === receiver)?.length > 0
    )

  const addAUser = () => {
    const input = prompt(
      'Enter the email of the person you want to chat with:..'
    )

    if (!input) return

    if (
      input !== user.email &&
      !userExists(input) &&
      EmailChecker.validate(input)
    ) {
      store.collection('chats').add({
        users: [user.email, input]
      })
    }
  }

  return (
    <div
      className='
        flex-1
        h-screen
        flex-col
        bg-gray-700
        lg:min-w-[330px]
        lg:max-w-[460px]
        border-r-2
        border-blue-200
        '
    >
      <header
        className='
            top-0
            sticky
            z-50
            justify-between
            flex
            items-center
            space-x-3
            py-3
            bg-gray-700
            px-3
            border-b-2
            border-blue-300
            '
      >
        <div
          className='
        flex
        items-center
        space-x-4
        '
        >
          <SearchIcon
            className='
        text-blue-100 
        h-6 
        lg:h-8 
        active:text-blue-200 
        cursor-pointer
        '
            onClick={() => router.push('/')}
          />
          <ChatIcon
            className='
          text-blue-100 
          h-6 
          lg:h-8 
          active:text-blue-200 
          cursor-pointer'
            onClick={() => router.push('/chat')}
          />
        </div>
        <h2
          className='
        text-xl 
        text-blue-200 
        font-semibold'
        >
          Chat
        </h2>
        <UserAddIcon
          onClick={addAUser}
          className='
          text-blue-100 
          h-6 
          lg:h-8 
          active:text-blue-200 
          cursor-pointer'
        />
      </header>
      <div
        className='
      h-[90vh] 
      overflow-y-scroll 
      scrollbar-hide'
      >
        {chatSnapshot?.docs.map(chat => (
          <UserChat key={chat.id} id={chat.id} users={chat.data().users} />
        ))}
      </div>
      <div
        className='
          bottom-0
          sticky
          z-50
          justify-evenly
          px-3
          py-3
        border-t-2
        border-blue-300
        flex
        items-center
          '
      >
        <img
          loading='lazy'
          src={user?.photoURL}
          alt=''
          className='
          h-12
          md:h-[50px]
          rounded-full 
          object-contain
          cursor-pointer
          '
        />
        <div className='text-center space-y-2'>
          <h2 className='text-lg text-blue-100 font-bold'>
            {user?.displayName}
          </h2>
          <h4 className='text-[16px] text-blue-400 font-semibold'>
            {user?.email}
          </h4>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
