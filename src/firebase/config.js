import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA9PZk7St5pYDOcQDo4QBMXlUmt6tzF5Vc",
  authDomain: "shoppydo-bead6.firebaseapp.com",
  projectId: "shoppydo-bead6",
  storageBucket: "shoppydo-bead6.appspot.com",
  messagingSenderId: "77297274171",
  appId: "1:77297274171:web:8bd5b72511d06ea3307b1e"
};

const firebase = initializeApp(firebaseConfig);

const firebaseData = getFirestore(firebase)

export { firebaseData };