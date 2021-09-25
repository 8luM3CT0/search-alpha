//front-end
import TimeAgo from 'timeago-react'
//back-end
import { useAuthState } from 'react-firebase-hooks/auth'
import { userCreds } from '../../firebase'

function Message ({ user, message }) {
  const [userLoggedIn] = useAuthState(userCreds)

  return (
    <div
      className='
        p-8
        flex
        items-center
        space-x-3
        min-w-[120px]
        lg:min-w-[190px]
        bg-gray-800
        hover:bg-gray-700
        rounded-full
        '
    >
      <img
        src={message?.photoURL}
        alt=''
        className='h-6 lg:h-12 rounded-full'
      />
      <div>
        <div>
          <div className='flex items-center space-x-3'>
            <h3 className='text-lg font-bold text-blue-200'>
              {message.displayName}
            </h3>
            <p className='text-blue-400 font-normal text-sm'>
              <TimeAgo datetime={message.timestamp} />
            </p>
          </div>
          <h3 className='text-md font-medium text-blue-300'>
            {message.chatMessage}
          </h3>
        </div>
      </div>
    </div>
  )
}

export default Message
