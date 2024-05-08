import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBbo5QASBE3r1SI9Mdu4QOXthhWpfYW6K0",
  authDomain: "web-senac.firebaseapp.com",
  projectId: "web-senac",
  storageBucket: "web-senac.appspot.com",
  messagingSenderId: "499922571929",
  appId: "1:499922571929:web:441853204c48ecc35a1e08",
  measurementId: "G-8YDGLGTY6Q"
};

// Inicialize o aplicativo Firebase
const app = initializeApp(firebaseConfig);

// Inicialize Firebase Authentication
const auth = getAuth(app);

// Inicialize Firestore
const db = getFirestore(app);

// Exporte `auth` e `db`
export { auth, db, app };
