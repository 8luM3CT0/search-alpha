import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
import '@material-tailwind/react/tailwind.css'
import 'react-dropdown/style.css'
import Router from 'next/router'
import ProgressBar from '@badrap/bar-of-progress'
import { useAuthState } from 'react-firebase-hooks/auth'
import { userCreds, store } from '../firebase'
import { useEffect } from 'react'
import firebase from 'firebase'
import Home from './index'

function MyApp ({ Component, pageProps }) {
  const [user] = useAuthState(userCreds)
  useEffect(() => {
    if (user) {
      store
        .collection('users')
        .doc(user.uid)
        .set(
          {
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            lastSeen: firebase.firestore.FieldValue.serverTimestamp()
          },
          { merge: true }
        )
    }
  }, [user])

  const progress = new ProgressBar({
    size: 4,
    color: '#bfdbfe',
    className: 'z-50',
    delay: 100
  })

  Router.events.on('routeChangeStart', progress.start)
  Router.events.on('routeChangeComplete', progress.finish)
  Router.events.on('routeChangeError', progress.finish)

  if (!user) return <Home />

  return (
    <>
      <link
        rel='stylesheet'
        href='https://fonts.googleapis.com/icon?family=Material+Icons'
      />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
