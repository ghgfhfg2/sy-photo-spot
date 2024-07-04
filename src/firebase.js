import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebaseConfig";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth();
const storage = getStorage(app);
const provider = new GoogleAuthProvider();

export { db, auth, storage, provider };
