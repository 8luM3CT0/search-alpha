//front-end
import Head from 'next/head'
import DocHeader from '../components/doc/header/DocHeader'
import '@material-tailwind/react/tailwind.css'
import Button from '@material-tailwind/react/Button'
import Icon from '@material-tailwind/react/Icon'
import Modal from '@material-tailwind/react/Modal'
import ModalBody from '@material-tailwind/react/ModalBody'
import ModalFooter from '@material-tailwind/react/ModalFooter'
import { PlusIcon } from '@heroicons/react/outline'
import documents from '../public/documents.json'
import DocumentRow from '../components/doc/body/DocumentRow'
//back-end
import { useState } from 'react'
import firebase from 'firebase'
import { userCreds, store } from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionOnce } from 'react-firebase-hooks/firestore'

function Docs () {
  const [showModal, setShowModal] = useState(false)
  const [input, setInput] = useState('')
  const [user] = useAuthState(userCreds)
  const [docsSnapshot] = useCollectionOnce(
    store
      .collection('userDocs')
      .doc(user.email)
      .collection('docs')
      .orderBy('timestamp', 'desc')
  )

  const createDocument = () => {
    if (!input) return

    store
      .collection('userDocs')
      .doc(user.email)
      .collection('docs')
      .add({
        filename: input,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
    setInput('')
    setShowModal(false)
  }

  const modal = (
    <Modal size='sm' active={showModal} toggler={() => setShowModal(false)}>
      <ModalBody>
        <input
          type='text'
          value={input}
          onChange={e => setInput(e.target.value)}
          className='outline-none w-full'
          placeholder='Type in the name of your document: '
          onKeyDown={e => e.key === 'Enter' && createDocument()}
        />
      </ModalBody>
      <ModalFooter>
        <Button
          color='blue'
          buttonType='link'
          onClick={e => setShowModal(false)}
          ripple='light'
        >
          Cancel
        </Button>
        <Button color='blue' onClick={createDocument} ripple='dark'>
          Create
        </Button>
      </ModalFooter>
    </Modal>
  )

  return (
    <div className='docsDiv'>
      <Head>
        <title>Docs-Alpha</title>
        <link
          href='https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400&display=swap'
          rel='stylesheet'
        />
        <link
          rel='stylesheet'
          href='https://fonts.googleapis.com/icon?family=Material+Icons'
        />
      </Head>
      <DocHeader />
      {modal}
      <section className='bg-gray-800 pb-10 px-10'>
        <div className='max-w-3xl mx-auto'>
          <div className='py-6 flex items-center justify-between'>
            <h2 className='text-gray-100 text-lg'>Add a new document</h2>
            <Button
              buttonType='outline'
              iconOnly={true}
              ripple='light'
              className='border-0 text-blue-200 rounded-full'
            >
              <Icon name='more_vert' size='3xl' />
            </Button>
          </div>
          <div>
            <div
              onClick={() => setShowModal(true)}
              className='
            grid
            place-items-center
            h-52 
            w-40 
            border-2
            border-blue-400 
            cursor-pointer
            rounded-lg 
            hover:border-blue-300'
            >
              <PlusIcon className='text-blue-200' />
            </div>
            <p className='ml-2 mt-2 font-semibold text-blue-300 text-sm'>
              Blank
            </p>
          </div>
        </div>
      </section>
      <section className='bg-gray-600 px-10 md:px-0'>
        <div className='max-w-3xl mx-auto py-8 text-sm text-blue-200'>
          <div className='flex items-center justify-between pb-5'>
            <h2 className='font-medium flex-grow text-blue-300'>Your files</h2>
            <p className='mr-12 text-blue-100'>Date created</p>
            <Icon name='folder' size='3xl' color='white' />
          </div>
          {docsSnapshot?.docs.map(doc => (
            <DocumentRow
              key={doc.id}
              id={doc.id}
              filename={doc.data().filename}
              timestamp={doc.data().timestamp}
            />
          ))}
        </div>
      </section>
    </div>
  )
}

export default Docs
