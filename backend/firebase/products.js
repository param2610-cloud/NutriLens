import app from "./index.js";
import { getFirestore } from "firebase-admin/firestore";

const db = getFirestore();

// Function to get a document by ID from the 'products' collection
const getProductById = async (id) => {
  try {
    let ref = db.collection("products");
    let snapshot = await ref.get();
    snapshot.forEach((doc) => {
      console.log(doc.id, "=>", doc.data());
    });
  } catch (error) {
    console.error("Error getting document:", error);
  }
};

getProductById("4QCFwPolzEpbIUjXcC88");
