importScripts(
    'https://www.gstatic.com/firebasejs/9.13.0/firebase-app-compat.js'
)
importScripts(
    'https://www.gstatic.com/firebasejs/9.13.0/firebase-messaging-compat.js'
)
firebase.initializeApp({
    apiKey: "AIzaSyCym13GQmXtikA7KUXqLhyC4jXsnRRCdVs",
    authDomain: "vocadoz.firebaseapp.com",
    projectId: "vocadoz",
    storageBucket: "vocadoz.appspot.com",
    messagingSenderId: "313695212517",
    appId: "1:313695212517:web:32aa1dfab6d4f6f316d50c",
    measurementId: "G-TW2DV1YY7X"
  });

// Retrieve firebase messaging
const messaging = firebase?.messaging()

messaging.onBackgroundMessage(function (payload) {
    const notificationTitle = payload.notification.title
    const notificationOptions = {
        body: payload.notification.body,
    }

    self.registration.showNotification(notificationTitle, notificationOptions)
})
