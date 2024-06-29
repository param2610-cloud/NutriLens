import db from "../db.js";
import { v4 as uuidv4 } from "uuid";

const deleteRating = async (pid, user_id) => {
  // Create a reference to the specific rating document
  const ratingRef = db.collection("ratings").doc(pid);

  // Get the current data of the rating document
  const doc = await ratingRef.get();

  if (doc.exists) {
    // Check if the rating belongs to the user
    const existingRating = doc.data().user_id === user_id;

    if (existingRating) {
      // Delete the rating document
      await ratingRef.delete();
      return { success: true, message: "Rating deleted successfully." };
    } else {
      return { success: false, message: "No rating found for this user." };
    }
  } else {
    return { success: false, message: "No rating found for this product." };
  }
};

// Example usage
// const resp=await deleteRating('productId1234', 'userId456');

// console.log(resp);

export default deleteRating;
