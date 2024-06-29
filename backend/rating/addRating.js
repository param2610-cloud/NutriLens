import db from "../db.js";
import { v4 as uuidv4 } from 'uuid';

const addRating=async (user_id,stars)=>{

    const rating = await db.collection('ratings').doc('jgK96opzsQCXD5c4Mk8X').set({"id":uuidv4(),user_id,stars});
    return rating;
}

export default addRating;