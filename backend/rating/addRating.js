import db from "../db.js";
import { v4 as uuidv4 } from "uuid";
// const pushTotalRating = async (pid) => {
//   const countRef = db.collection("ratings_count").doc(pid);

//   // Fetch the current total_ratings value
//   const doc = await countRef.get();

//   if (doc.exists) {
//     // If the document exists, increment the total_ratings value
//     const currentTotalRatings = doc.data().total_ratings;
//     const newTotalRatings = currentTotalRatings + 1;

//     // Update the document with the new total_ratings value
//     await countRef.update({ total_ratings: newTotalRatings });
//   } else {
//     // If the document does not exist, create it with total_ratings set to 1
//     await countRef.set({ total_ratings: 1 });
//   }

//   return { success: true, message: "Total ratings updated successfully." };
// };

const pushTotalRating = async (pid, stars, rate_pid) => {
  // Validate stars parameter
  if (typeof stars !== "number" || isNaN(stars)) {
    throw new Error("Invalid stars value. Must be a number.");
  }

  const countRef = db.collection("ratings_count").doc(pid);
  const rate_Ref = db.collection("ratings").doc(rate_pid);

  // Fetch the current total_ratings and total_stars values
  const doc = await countRef.get();
  const rate_doc = await rate_Ref.get();

  if (doc.exists) {
    // If the document exists, increment the total_ratings value and add to total_stars
    const currentData = doc.data();
    const currentTotalRatings = currentData.total_ratings || 0;
    const currentTotalStars = currentData.total_stars || 0;

    // const rate_stars = rate_doc.data().stars || 0;
    const rate_stars = rate_doc.data().stars || 0;

    console.log(rate_stars);

    let newTotalRatings = currentTotalRatings;
    let newTotalStars;
    console.log("rate_stars "+rate_stars+"stars"+stars);
    if (rate_stars < stars) {
      newTotalStars = currentTotalStars + (stars - rate_stars );
    }
    else{
      newTotalStars = currentTotalStars - (rate_stars-stars);

    }
  //  newTotalStars = currentTotalStars + stars;
  console.log(newTotalStars);

    // Update the document with the new total_ratings and total_stars values
    await countRef.set({
      total_ratings: newTotalRatings,
      total_stars: newTotalStars,
      average_stars:newTotalStars/newTotalRatings
    });
  } else {
    // If the document does not exist, create it with total_ratings set to 1 and total_stars set to stars
    await countRef.set({
      total_ratings: 1,
      total_stars: stars,
      average_stars:stars

    });
  }

  return {
    success: true,
    message: "Total ratings and stars updated successfully.",
  };
};

// Example usage

// // Example usage
// pushTotalRating('productId123', 5)
//     .then(result => console.log(result))
//     .catch(error => console.error(error));

// // Example usage
// pushTotalRating('productId123')
//     .then(result => console.log(result))
//     .catch(error => console.error(error));

const addRating = async (pid, user_id, stars) => {
  // Create a reference to the specific rating document
  let uid = uuidv4();
  const ratingRef = db.collection("ratings").doc(uid);

  // Get the current data of the rating document
  const doc = await ratingRef.get();

  if (doc.exists) {
    // If the document exists, check if the user has already rated the product
    // const existingRating = doc.data().user_id === user_id;

    
    const pushed = await pushTotalRating(pid, stars, uid);
    await ratingRef.set({
      user_id,
      stars: stars,
      pid
    });
    console.log(pushed);
    return { success: true, message: "Rating added successfully." };
    
  } else {
    // If the document does not exist, create a new rating
    console.log(user_id);
    await ratingRef.set({ user_id, stars,pid });
    const pushed = pushTotalRating(pid, stars, );
    console.log(pushed);
    return { success: true, message: "Rating added successfully." };
  }
};

// Example usage
const resp = await addRating("productId1347", "userId95", 3);

//  addRating("product2","pritam_6",1);
console.log(resp);
export default addRating;
