// Import stylesheets
import './style.css';
// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

import * as firebaseui from 'firebaseui';

// Document elements
const startRsvpButton = document.getElementById('startRsvp');
const guestbookContainer = document.getElementById('guestbook-container');

const form = document.getElementById('leave-message');
const input = document.getElementById('message');
const guestbook = document.getElementById('guestbook');
const numberAttending = document.getElementById('number-attending');
const rsvpYes = document.getElementById('rsvp-yes');
const rsvpNo = document.getElementById('rsvp-no');

var rsvpListener = null;
var guestbookListener = null;

// Add Firebase project configuration object here

// esto me lo dio al montar la app web::
// Your web app's Firebase configuration

 var firebaseConfig = {
    apiKey: "AIzaSyBmrPJXyJSFoqUI-Pk5V6c5vZiX-vvvV10",
    authDomain: "fir-codelab-gdgasturias.firebaseapp.com",
    databaseURL: "https://fir-codelab-gdgasturias.firebaseio.com",
    projectId: "fir-codelab-gdgasturias",
    storageBucket: "fir-codelab-gdgasturias.appspot.com",
    messagingSenderId: "903232176647",
    appId: "1:903232176647:web:98d0a770b440983f37e0a2"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);



// FirebaseUI config
const uiConfig = {
  credentialHelper: firebaseui.auth.CredentialHelper.NONE,
  signInOptions: [
    // Email / Password Provider.
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    signInSuccessWithAuthResult: function(authResult, redirectUrl){
      // Handle sign-in.
      // Return false to avoid redirect.
      return false;
    }
  }
};

// const ui = new firebaseui.auth.AuthUI(firebase.auth());
