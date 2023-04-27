import firebase from 'firebase/compat/app'

const firebaseConfig = {
  apiKey: 'AIzaSyB64qQA3GzI2uEh33OvtzBNPY_5P1GFns4',
  authDomain: 'netflix-clone-733d7.firebaseapp.com',
  projectId: 'netflix-clone-733d7',
  storageBucket: 'netflix-clone-733d7.appspot.com',
  messagingSenderId: '367423489329',
  appId: '1:367423489329:web:9e97b9482de68b90175c10',
  measurementId: 'G-P0W6F96RSJ',
}

firebase.initializeApp(firebaseConfig)

export const storage = firebase.storage
