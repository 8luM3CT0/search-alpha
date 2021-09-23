//front-end
import Sidebar from '../../components/sidebar/Sidebar'
import Feed from '../../components/feed/Feed'
//back-end
import { userCreds, store } from '../../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

function ChatArea ({ chat, messages }) {
  const [user] = useAuthState(userCreds)
  return (
    <div
      className='
        h-screen
        flex
        bg-gray-800
        overflow-hidden
        '
    >
      <div className='hidden lg:inline-flex'>
        <Sidebar />
      </div>
      <main
        className='
            flex-1
            scrollbar-hide
            '
      >
        <Feed />
      </main>
    </div>
  )
}

export default ChatArea

export async function getServerSideProps (context) {
  const ref = store.collection('chats').doc(context.query.id)
}
