import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBKJnubTaBHp-yR-qBDnEHzkXceTc_4zpA",
  authDomain: "auth-app-baf07.firebaseapp.com",
  projectId: "auth-app-baf07",
  storageBucket: "auth-app-baf07.appspot.com",
  messagingSenderId: "984638504251",
  appId: "1:984638504251:web:a8d0cbdc77192e4d8c4b1e",
  measurementId: "G-97Z2TNN3KV",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
