import firebase from 'firebase'

const config = {
  projectID: process.env.FIREBASE_PROJECT_ID
}

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

export default firebase