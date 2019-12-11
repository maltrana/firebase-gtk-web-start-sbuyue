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
const url = document.getElementById('url');

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
    {
      provider:firebase.auth.EmailAuthProvider.PROVIDER_ID,
       defaultCountry: 'es',
    }

  ],
  callbacks: {
    signInSuccessWithAuthResult: function(authResult, redirectUrl){
      // Handle sign-in.
      // Return false to avoid redirect.
      return false;
    }
  }
};

const ui = new firebaseui.auth.AuthUI(firebase.auth());

// Listen to RSVP button clicks
startRsvpButton.addEventListener("click",
 () => {
    if (firebase.auth().currentUser) {
      // User is signed in; allows user to sign out
      firebase.auth().signOut();
    } else {
      firebase.auth().languageCode = "es";
      // No user is signed in; allows user to sign in
      ui.start("#firebaseui-auth-container", uiConfig);
    }
});


// Listen to the current Auth state
firebase.auth().onAuthStateChanged((user)=> {
  if (user) {
    startRsvpButton.textContent = "Salir";
    guestbookContainer.style.display = "block";
  }
  else {
    startRsvpButton.textContent = "Entrar";
    guestbookContainer.style.display = "none";
  }
});


// Listen to the form submission
form.addEventListener("submit", (e) => {
   // Prevent the default form redirect
   e.preventDefault();
 
   // Write a new message to the database collection "guestbook"
   firebase.firestore().collection("guestbook").add({
      text: input.value,
      url: url.value,
      timestamp: Date.now(),
      name: firebase.auth().currentUser.displayName,
      userId: firebase.auth().currentUser.uid
   })
 
   // clear message input field
   input.value = ""; 
   url.value = ""; 
   
   // Return false to avoid redirect
   return false;
});


// Create query for messages
firebase.firestore().collection("guestbook")
  .orderBy("timestamp","desc")
  .onSnapshot((snaps) => {
       // Reset page
       guestbook.innerHTML = "";
      
       // Loop through documents in database
       snaps.forEach((doc) => {
         // Create an HTML entry for each document and add it to the chat
         const entry = document.createElement("p");
         entry.innerHTML =  doc.data().name + " : " + doc.data().text+' <a href="'+ doc.data().url+'" target="_blank">'+ doc.data().url+'</a>';
         guestbook.appendChild(entry);
   });
});
