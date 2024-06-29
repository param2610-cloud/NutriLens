import express from "express";
import addRating from "../rating/addRating.js";


const app=express();

app.post("/rate", async (req,res)=>{


    const {user_id,stars}=req.body;

    try {
        
        const rating=await addRating(user_id,stars);
        res.status(200).send(rating);
    } catch (error) {
        console.log(error);
    }
    // res.status(200).send("Healthy");
})

app.listen("8080",async (req,res)=>{
    console.log("Server is listening at 8080");
})