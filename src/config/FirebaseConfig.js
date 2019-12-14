import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// THIS IS USED TO INITIALIZE THE firebase OBJECT
// PUT YOUR FIREBASE PROJECT CONFIG STUFF HERE
var firebaseConfig = {
    apiKey: "AIzaSyAle3gtW4wivxAUKWMO6RxM3FIBirjLqFs",
    authDomain: "final-project-316-a81bc.firebaseapp.com",
    databaseURL: "https://final-project-316-a81bc.firebaseio.com",
    projectId: "final-project-316-a81bc",
    storageBucket: "final-project-316-a81bc.appspot.com",
    messagingSenderId: "402466731788",
    appId: "1:402466731788:web:fc017a30b1c250218c3b29",
    measurementId: "G-7YZ7C4Z2DP"
};
firebase.initializeApp(firebaseConfig);

// NOW THE firebase OBJECT CAN BE CONNECTED TO THE STORE
export default firebase;
