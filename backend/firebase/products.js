import db from "../db.js";
import app from "./index.js";

// Function to get a document by ID from the 'products' collection
export const getProductById = async (id) => {
  try {
    let ref = db.collection("products").doc(id);
    let snapshot = await ref.get();
    if (snapshot.exists) return snapshot.data();
    else return null;
  } catch (error) {
    console.error("Error getting document:", error);
  }
};

export const addProductWithId = async (id, doc) => {
  try {
    let ref = await db.collection("products").doc(id).set(doc);
    return ref;
  } catch (error) {
    console.error("Error getting document:", error);
  }
};
