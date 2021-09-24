//front-end
import {
  ChevronLeftIcon,
  ChevronDoubleRightIcon,
  PhotographIcon,
  CashIcon,
  EmojiHappyIcon
} from '@heroicons/react/outline'
//back-end
import { useRouter } from 'next/router'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'
import { useState, useRef } from 'react'
import { userCreds, store } from '../../firebase'
import firebase from 'firebase'
import getReceiver from '../../utils/getReceiver'

function Feed ({ chat, messages }) {
  const [user] = useAuthState(userCreds)
  const router = useRouter()
  const [message, setMessage] = useState('')
  const chatBottomRef = useRef(null)
  const [receiverSnapshot] = useCollection(
    store
      .collection('users')
      .where('email', '==', getReceiver(chat.users, user))
  )
  const receiver = receiverSnapshot?.docs?.[0]?.data()
  const receiverEmail = getReceiver(chat.users, user)

  const sendMessage = e => {
    e.preventDefault()

    store
      .collection('users')
      .doc(user.uid)
      .set(
        {
          lastSeen: firebase.firestore.FieldValue.serverTimestamp()
        },
        { merge: true }
      )

    store
      .collection('chats')
      .doc(router.query.id)
      .collection('messages')
      .add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        chatMessage: message,
        user: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL
      })
    setMessage('')
  }

  return (
    <div>
      <header
        className='
            top-0
            bg-gray-800
            sticky
            z-50
            flex
            items-center
            justify-evenly
            px-5
            border-b
            border-blue-300
            py-3
            '
      >
        <ChevronLeftIcon
          onClick={() => router.push('/chat')}
          className='
          text-blue-300 
          h-12 
          lg:hidden 
          cursor-pointer'
        />
        {receiver ? (
          <img
            loading='lazy'
            src={receiver?.photoURL}
            alt=''
            className='
          h-12 
          lg:h-[50px] 
          rounded-full 
          object-contain 
          hover:opacity-90'
          />
        ) : (
          <img
            src={receiverEmail[0]}
            loading='lazy'
            className='
          h-12 
          lg:h-[50px] 
          rounded-full 
          object-contain 
          hover:opacity-90'
          />
        )}
        <h1
          className='
        text-2xl 
        font-bold 
        text-blue-200 
        hover:underline
        hover:animate-pulse
        '
        >
          {receiver?.displayName}
        </h1>
        <h2
          className='
        hidden
        lg:inline-flex
        text-xl 
        font-semibold 
        text-blue-400'
        >
          {receiverEmail}
        </h2>
      </header>
      <div className='h-[90vh] p-[20px]'>
        <div></div>
      </div>
      <footer
        className='
            bg-gray-800
            bottom-0 
            sticky
            z-50
            border-t
            border-blue-300
            flex
            items-center
            px-4
            space-x-4
            py-3
            '
      >
        <EmojiHappyIcon className='chatIcon' />
        <div
          className='
          space-x-2
          px-4
          flex-grow 
          flex 
          items-center 
          rounded-full 
          h-[50px] 
          lg:h-[54px] 
          bg-gray-600'
        >
          <input
            type='text'
            value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder='Chat here...'
            className='
                outline-none 
                border-0 
                bg-transparent 
                flex-grow
                text-gray-300
                '
          />
          <button
            hidden
            onClick={sendMessage}
            disabled={!message}
            type='submit'
          >
            Send
          </button>
          <PhotographIcon className='chatInputIcon' />
          <CashIcon className='chatInputIcon' />
          <ChevronDoubleRightIcon
            disabled={!message}
            onClick={sendMessage}
            className='      
          h-6
          lg:h-12
      text-blue-400
      hover:text-blue-300
      cursor-pointer'
          />
        </div>
        <PhotographIcon className='chatIcon' />
        <CashIcon className='chatIcon' />
      </footer>
    </div>
  )
}

export default Feed
