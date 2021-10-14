//front-end
import Button from '@material-tailwind/react/Button'
import Icon from '@material-tailwind/react/Icon'
import { DocumentTextIcon } from '@heroicons/react/outline'
//back-end
import { userCreds, store } from '../../firebase'
import { useRouter } from 'next/router'
import { useDocumentOnce } from 'react-firebase-hooks/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'

function Document () {
  const [user] = useAuthState(userCreds)
  const router = useRouter()
  const { id } = router.query
  const [snapshot, loadingSnapshot] = useDocumentOnce(
    store
      .collection('userDocs')
      .doc(user.email)
      .collection('docs')
      .doc(id)
  )

  if (!loadingSnapshot && !snapshot?.data()?.filename) {
    router.replace('/')
  }

  return (
    <div className='h-screen bg-gray-800'>
      <header className='documentHeader'>
        <span onClick={() => router.push('/docs')} className='cursor-pointer'>
          <DocumentTextIcon className='h-10 text-blue-200 cursor-pointer' />
        </span>
        <div className='ml-2 flex-grow px-2 text-blue-200'>
          <h2 className='underline mb-2 hover:animate-pulse'>
            {snapshot?.data()?.filename}
          </h2>
          <div className='flex items-center text-sm space-x-1 -ml-1 h-8 text-blue-100'>
            <p className='docOption'>File</p>
            <p className='docOption'>Edit</p>
            <p className='docOption'>View</p>
            <p className='docOption'>Insert</p>
            <p className='docOption'>Format</p>
            <p className='docOption'>Tools</p>
          </div>
        </div>
        <Button
          color='lightblue'
          buttonType='filled'
          size='regular'
          className='h-10'
          rounded={false}
          block={false}
          iconOnly={false}
          ripple='light'
        >
          <Icon name='people' size='md' />
          Share
        </Button>
        <img
          loading='lazy'
          src={user?.photoURL}
          alt=''
          className='
        cursor-pointer 
        h-10 
        w-10 
        rounded-full 
        ml-2'
        />
      </header>
    </div>
  )
}

export default Document
