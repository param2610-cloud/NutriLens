import express from "express";

const app = express();

// app.post("/rate", async (req, res) => {
//   // console.log(req.body);
//   const { user_id, stars } = req.body;

//   try {
//     const rating = await addRating(user_id, stars);
//     res.status(200).send(rating);
//   } catch (error) {
//     console.log(error);
//   }
//   // res.status(200).send("Healthy");
// });

app.get("/getProduct", (req, res) => {
  let { code } = req.query;

  res.send("ok");
  console.log(code);
});

app.listen("8080", async (req, res) => {
  console.log("Server is listening at 8080");
});
