import * as firebase from 'firebase'

  // Your web app's Firebase configuration
  const firebaseConfig = {
     apiKey: "AIzaSyBTfv8pIGesRijZbE0KdkVXZW9y7Oya3Jk",
     authDomain: "ecommerce-ryan-3744b.firebaseapp.com",
     projectId: "ecommerce-ryan-3744b",
     storageBucket: "ecommerce-ryan-3744b.appspot.com",
     messagingSenderId: "431248164640",
     appId: "1:431248164640:web:b58e8807c9311afdaa3945"
   };
   // Initialize Firebase
   firebase.initializeApp(firebaseConfig);

   export const auth=firebase.auth();
   export const googleAuthProvider = new firebase.auth.GoogleAuthProvider()