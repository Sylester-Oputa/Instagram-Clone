import Firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';



const config = {
  apiKey: "AIzaSyAr_huNaHhM0sPoplAJ40xDy_KQsK2UeyQ",
  authDomain: "instagram-892c9.firebaseapp.com",
  projectId: "instagram-892c9",
  storageBucket: "instagram-892c9.firebasestorage.app",
  messagingSenderId: "483579331569",
  appId: "1:483579331569:web:472be75d76e150ead2fa50"
};

const firebase = Firebase.initializeApp(config);

const { FieldValue } = Firebase.firestore;



export { firebase, FieldValue };