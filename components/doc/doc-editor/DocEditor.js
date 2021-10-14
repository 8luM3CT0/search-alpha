//front-end
import dynamic from 'next/dynamic'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
//back-end
import { userCreds, store } from '../../../firebase'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useDocumentOnce } from 'react-firebase-hooks/firestore'
import { EditorState } from 'draft-js'
import { convertFromRaw, convertToRaw } from 'draft-js'

const Editor = dynamic(
  () => import('react-draft-wysiwyg').then(module => module.Editor),
  {
    ssr: false
  }
)

function DocEditor () {
  const router = useRouter()
  const [user] = useAuthState(userCreds)
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const { id } = router.query

  const [docSnapshot] = useDocumentOnce(
    store
      .collection('userDocs')
      .doc(user.email)
      .collection('docs')
      .doc(id)
  )

  useEffect(() => {
    if (docSnapshot?.data()?.editorState) {
      setEditorState(
        EditorState.createWithContent(
          convertFromRaw(docSnapshot?.data()?.editorState)
        )
      )
    }
  }, [docSnapshot])

  const onEditorStateChange = editorState => {
    setEditorState(editorState)

    store
      .collection('userDocs')
      .doc(user.email)
      .collection('docs')
      .doc(id)
      .set(
        {
          editorState: convertToRaw(editorState.getCurrentContent())
        },
        {
          merge: true
        }
      )
  }

  return (
    <div className='bg-gray-800 min-h-screen pb-16'>
      <Editor
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        toolbarClassName='flex sticky top-0 z-50 justify-center'
        editorClassName='
        mt-6 
        bg-gray-600 
        text-blue-100
        shadow-lg 
        max-w-6xl 
        mx-auto 
        mb-12 
        border 
        border-blue-200 
        pb-18'
      />
    </div>
  )
}

export default DocEditor
