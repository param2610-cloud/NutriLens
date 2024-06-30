import express from "express";
import { addProductWithId, getProductById } from "../firebase/products.js";
import { fetchImages, fetchIngredients, scraping } from "../scrapper/index.js";
import { getActualAmount, getImageInfo, getLimits } from "../GetInfo.js";
import addRating from "../rating/addRating.js";
import viewRatings from "../rating/viewRating.js";

const app = express();

app.get("/getProduct", async (req, res) => {
  try {
    let { code } = req.query;
    let details = await getProductById(code);
    if (details) return res.send(details);

    let data = await scraping(code);
    if (data.link) {
      const productId = data.link.split("/prid/")[1];
      let [images, ingredients] = await Promise.all([
        fetchImages(data.link),
        // fetchIngredients(`https://blinkit.com/v1/layout/product/${productId}`),
      ]);
      let maybe = images.filter((e) => {
        let f = e.split("/sliding_image/")[1];
        if (f) {
          let hello = f.split(".jpg?")[0];
          return ["d", "b", "c"].includes(hello[hello.length - 1]);
        }
        return false;
      });

      let list = maybe
        .map((e) => e.split("/sliding_image/")[1].split("?")[0])
        .map(async (e) => {
          return getImageInfo(
            null,
            `https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=100,metadata=none,w=5000,h=500/app/images/products/sliding_image/${e}`
          );
        });

      let name = {};

      for (let item of list) {
        let f = await item;
        name[f.type] = f.list || f.nutrients;
      }

      let g = getLimits(getActualAmount(name["nutrient_label"], 40));
      name["name"] = data.textContent;
      name["nutrient_label"] = g;
      name["barcode"] = code;
      name["images"] = images;

      addProductWithId(code, name);

      return res.send(name);
    }

    res.status(404).send("404");
  } catch (err) {
    console.log(err);
    res.status(500).send("failed");
  }
});

app.get("/add-rating", async (req, res) => {
  try {
    let { rating, user_id, code } = req.query;

    await addRating(code, user_id, rating);

    res.send("ok");
  } catch (err) {
    res.status(500).send("failed");
  }
});

app.get("/get-rating", async (req, res) => {
  try {
    let { code } = req.query;

    let resp = await viewRatings(code);

    res.send(resp);
  } catch (err) {
    res.status(500).send("failed");
  }
});

app.listen("8080", async (req, res) => {
  console.log("Server is listening at 8080");
});
