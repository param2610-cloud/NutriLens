import db from "../db.js";
import { v4 as uuidv4 } from "uuid";

const pushTotalRating=async (pid)=>{
    const count_ref = db.collection('ratings_count');
    const added=await count_ref.doc(pid).set({
        total_ratings:totalRatings+=1
    });
    return added;
}

const totalRatings=async (pid)=>{
    
}

const viewRatings = async (pid) => {
    // Create a reference to the collection of ratings for the specified product
    const ratingsRef = db.collection('ratings');

    // Query for all documents where the product ID matches
    const snapshot = await ratingsRef.get();

    if (snapshot.empty) {
        return { success: false, message: 'No ratings found for this product.' };
    }

    // Create an array to hold the ratings
    let ratings = [];

    // Loop through each document and add its data to the ratings array
    snapshot.forEach(doc => {
        ratings.push(doc.data());
        const pushed=pushTotalRating(pid);

        console.log(pushed);
    });

    return { success: true, ratings: ratings };
};

// Example usage
const resp=await viewRatings('productId1234');

    console.log(resp);

// console.log(resp);
export default viewRatings;
