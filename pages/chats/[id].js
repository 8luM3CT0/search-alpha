//front-end
import Sidebar from '../../components/sidebar/Sidebar'
import Feed from '../../components/feed/Feed'
//back-end
import { userCreds, store } from '../../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import getReceiver from '../../utils/getReceiver'

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
      <div className='hidden'>
        <Sidebar />
      </div>
      <main
        className='
            flex-grow
            scrollbar-hide
            '
      >
        <Feed chat={chat} messages={messages} />
      </main>
    </div>
  )
}

export default ChatArea

export async function getServerSideProps (context) {
  const ref = store.collection('chats').doc(context.query.id)

  //return chat
  const chatResults = await ref.get()
  const chat = {
    id: chatResults.id,
    ...chatResults.data()
  }

  //return messages
  const chatInputs = await ref
    .collection('messages')
    .orderBy('timestamp', 'asc')
    .get()

  const messages = chatInputs.docs
    .map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
    .map(messages => ({
      ...messages,
      timestamp: messages.timestamp.toDate().getTime()
    }))

  return {
    props: {
      chat: chat,
      messages: JSON.stringify(messages)
    }
  }
}
