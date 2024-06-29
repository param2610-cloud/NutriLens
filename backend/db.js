
import { getFirestore } from "firebase/firestore";
import app from "./firebase/index.js";

const db = getFirestore(app);
export default db;

