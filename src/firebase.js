import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { firebaseConfig } from "./firebaseConfig";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth();
const analytics = getAnalytics(app);
