import app from "./firebase/index.js";
import { getFirestore } from "firebase-admin/firestore";

const db = getFirestore();
export default db;
