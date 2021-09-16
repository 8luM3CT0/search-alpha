import firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyAjFeoTIWpd__nuXtVPX05NQErl0GxF8Fo',
  authDomain: 'nextjs-search.firebaseapp.com',
  projectId: 'nextjs-search',
  storageBucket: 'nextjs-search.appspot.com',
  messagingSenderId: '1010024957815',
  appId: '1:1010024957815:web:d7195f51870ae0215a0372',
  measurementId: 'G-6B4ST3XP4P'
}

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app()

const userCreds = app.auth()
const store = app.firestore()
const provider = new firebase.auth.GoogleAuthProvider()

export { userCreds, store, provider }
