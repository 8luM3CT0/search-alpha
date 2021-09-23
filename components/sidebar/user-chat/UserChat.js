//front-end
//back-end
import { useRouter } from 'next/router'
import getReceiver from '../../../utils/getReceiver'
import { userCreds, store } from '../../../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'

function UserChat ({ id, users }) {
  const router = useRouter()
  const [user] = useAuthState(userCreds)
  const [receiverSnapshot] = useCollection(
    store.collection('users').where('email', '==', getReceiver(users, user))
  )
  const receiver = getReceiver(users, user)
  const receiverPhoto = receiverSnapshot?.docs?.[0]?.data()

  const startChat = () => {
    router.push(`/chat/${id}`)
  }

  return (
    <div
      onClick={startChat}
      className='
        py-6
        px-3
        flex
        items-center
        rounded-full
        cursor-pointer
        justify-evenly
        bg-gray-700
        hover:bg-gray-600
        '
    >
      {receiver ? (
        <img
          loading='lazy'
          src={receiverPhoto?.photoURL}
          className='
                h-12
                md:h-[50px]
                rounded-full
                object-contain
                cursor-pointer
                '
        />
      ) : (
        <img
          className='
                h-12
                md:h-[50px]
                rounded-full
                object-contain
                cursor-pointer
                '
        >
          {receiver[0]}
        </img>
      )}
      <div className='space-y-3 flex-col'>
        <h2
          className='
            font-bold 
            text-blue-200 
            text-lg '
        >
          {receiverPhoto?.displayName}
        </h2>
        <h4
          className='
            text-blue-400 
            font-semibold 
            text-base 
            w-[180px] 
            truncate 
            lg:w-full'
        >
          {receiver}
        </h4>
      </div>
    </div>
  )
}

export default UserChat
