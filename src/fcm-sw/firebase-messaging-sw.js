importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-messaging-compat.js');

const app = firebase.initializeApp({
  apiKey: "AIzaSyCn-m9xnJU-7ErsmDyHZu0GdIBtHKGO0BI",
  authDomain: "nnpc-8a25b.firebaseapp.com",
  projectId: "nnpc-8a25b",
  storageBucket: "nnpc-8a25b.appspot.com",
  messagingSenderId: "263377108769",
  appId: "1:263377108769:web:088071885e20a611a70860",
  measurementId: "G-TV49HWPHC2"
})

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  // console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: 'https://res.cloudinary.com/galaxycom/image/upload/v1660548300/nnpc/logo-group_fhpkvp.png'
  };

  // self.registration.showNotification(notificationTitle,
  //   notificationOptions);
  // console.log(payload);
  self.registration.showNotification(notificationTitle, notificationOptions);

});
