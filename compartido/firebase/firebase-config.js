/* ==========================================================
   Academia de Gloria Valentina
   firebase-config.js
   Configuración central de Firebase
   ========================================================== */

import { initializeApp } from
  "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";

import { getFirestore } from
  "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

import { getAuth } from
  "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAlaMwXJ7tmisb689lYzlTVjc__nJoLg9U",
  authDomain: "academia-gloria.firebaseapp.com",
  projectId: "academia-gloria",
  storageBucket: "academia-gloria.firebasestorage.app",
  messagingSenderId: "975244787235",
  appId: "1:975244787235:web:ada8bf0c1f0d53b4b77b96"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
