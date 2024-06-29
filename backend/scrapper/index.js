import fs, { link } from "fs";
import path from "path";
import puppeteer from "puppeteer";

const barcode = "8901491001137 blinkit";

const google_search = `https://www.google.com/search?q=${barcode}`;

import fetch from "node-fetch";
import { parse } from "node-html-parser";

const fetchIngredients = async (link) => {
  let resp = await fetch(link, {
    headers: {
      accept: "*/*",
      "accept-language": "en-US,en;q=0.6",
      access_token: "null",
      app_client: "consumer_web",
      app_version: "1010101010",
      auth_key:
        "c761ec3633c22afad934fb17a66385c1c06c5472b4898b866b7306186d0bb477",
      "cache-control": "no-cache",
      "content-type": "application/json",
      device_id: "cc49219f-ca56-485f-869e-15d830d42ab7",
      lat: "22.458398250000002",
      lon: "88.38387125",
      pragma: "no-cache",
      priority: "u=1, i",
      rn_bundle_version: "1009003012",
      "sec-ch-ua": '"Not/A)Brand";v="8", "Chromium";v="126", "Brave";v="126"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "sec-gpc": "1",
      session_uuid: "eb264cc2-c65b-4e7b-9d56-be71482ab179",
      web_app_version: "1008010016",
      "x-age-consent-granted": "false",
      cookie:
        "gr_1_deviceId=cc49219f-ca56-485f-869e-15d830d42ab7; city=Petlad; gr_1_lat=22.458398250000002; gr_1_lon=88.38387125; gr_1_locality=957; gr_1_landmark=undefined; __cfruid=82a1525682967fd90f4dfc631066bcb2cfa658b8-1719643157; _cfuvid=6u2m4Tw78CFcoVB8cyGGN8ju7VPlFOvtkDkpf41Q3w4-1719643157560-0.0.1.1-604800000; __cf_bm=VDrITFK.1OuUSPhjSIQCItq6IKXwwkHZOKkiRu8ZaAs-1719655097-1.0.1.1-DyuyT3SEz6_7Y2PMUctLpuW_kXBFxxmi4osynj2QQbkvyXfJTjFSAVUUy1dO3.kOVJo73.032FF7Q.geFn2OkQ",
      Referer:
        "https://blinkit.com/prn/lays-indias-magic-masala-chips-40-g/prid/240092",
      "Referrer-Policy": "strict-origin-when-cross-origin",
    },
    body: null,
    method: "POST",
  });

  // console.log(resp.snippet_list_updater_data.expand_attributes.payload.snippets_to_add);

  // console.log(await resp.json());
  resp = await resp.json();
  const snippets =
    resp.response.snippet_list_updater_data.expand_attributes.payload
      .snippets_to_add;

  const ingredientSnippet = snippets.filter((ele) => {
    if (ele.data && ele.data.title && ele.data.title.text) {
      // console.log(ele.data.title);
      return ele.data.title.text.toLowerCase() === "ingredients";
    }
    return false;
  });

  return ingredientSnippet[0].data.subtitle.text;

  // console.log("Ingredient snippet:", );
  // console.log(resp.snippet_list_updater_data.expand_attributes.payload.snippets_to_add);

  // const root = parse(resp);
  // console.log(root);

  // //   const ingredients="";
  // //   console.log(root);

  // const igre = root.querySelector("div");
  // console.log(igre);
};

const fetchImages = async (link) => {
  let resp = await fetch(link, {
    "headers": {
      "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
      "accept-language": "en-US,en;q=0.9",
      "cache-control": "max-age=0",
      "priority": "u=0, i",
      "sec-ch-ua": "\"Not/A)Brand\";v=\"8\", \"Chromium\";v=\"126\", \"Google Chrome\";v=\"126\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"Windows\"",
      "sec-fetch-dest": "document",
      "sec-fetch-mode": "navigate",
      "sec-fetch-site": "cross-site",
      "sec-fetch-user": "?1",
      "upgrade-insecure-requests": "1",
      "cookie": "gr_1_deviceId=1e41c4d5-78b4-4554-9ee9-70a2b3286e1f; _gcl_au=1.1.1462852392.1719634039; gr_1_lat=28.4652382; gr_1_lon=77.0615957; gr_1_locality=1849; _gid=GA1.2.1564788996.1719634039; _fbp=fb.1.1719634039631.390347670648404354; gr_1_landmark=undefined; city=Kolkata; __cfruid=f836d204192ba6bd6bd9d23628859cfc80d24ff1-1719640369; _cfuvid=atFtJAwFtH5eSHMZYz5.CA_k2sXeZ15Da9eSrVCMQ2k-1719640369706-0.0.1.1-604800000; __cf_bm=K19vZM2VQx8j0EuLf6p9ydG9oMjpc_d9sNpT1Cug5JM-1719655779-1.0.1.1-SMeWm6SnQ_Btl2mVLHeJLwyAPdcSt5VF1HXE0aC2J8vaPF9XHbZm7PEZPZvHhDEMIZOV4F8jjwRWbWuYxzYfyA; _ga=GA1.1.78518523.1719634039; _ga_JSMJG966C7=GS1.1.1719655782.3.1.1719655831.11.0.0; _ga_DDJ0134H6Z=GS1.2.1719655785.4.1.1719655832.13.0.0",
      "Referer": "https://www.google.com/",
      "Referrer-Policy": "origin"
    },
    "body": null,
    "method": "GET"
  });

  resp = await resp.text();

  const root = parse(resp);
  const allImages = [];

  console.log(root.querySelectorAll("#carousel-items > section > div > img").forEach((img,i)=>{
    let urlMatch;
    if(img){

      urlMatch = img.rawAttrs.match(/src="([^"]+)"/);
    }

if (urlMatch && urlMatch[1]) {
    const imageUrl = urlMatch[1];
    console.log(imageUrl);
    allImages.push(imageUrl);
} else {
    console.log("URL not found.");
}

  }));

  //   console.log(allImages);
  return allImages;
};

const scraping = async () => {
  // Launch a browser and open a new blank page
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // Navigate to the page url
  await page.goto(google_search);

  // Extract the text content of the first h3 element with the specified class
  // and the href attribute of the first a tag with the specified attribute
  const search_data = await page.evaluate(() => {
    // Select the first h3 element with the class LC20lb MBeuO DKV0Md
    const firstH3Element = document.querySelector("h3.LC20lb.MBeuO.DKV0Md");

    // Select the first a tag with the attribute jsname="UWckNb"
    const firstATag = document.querySelector('a[jsname="UWckNb"]');

    // Extract the text content and href attribute
    const textContent = firstH3Element ? firstH3Element.textContent : null;
    const link = firstATag ? firstATag.href : null;

    return { textContent, link };
  });

  // console.log(search_data);

  await browser.close();

  fs.writeFile("data.json", JSON.stringify(search_data), (err) => {
    if (err) {
      throw err;
    }
    console.log("Successfully Saved JSON File!");
  });
  return search_data;
};

// scraping();

scraping().then(async (data) => {
  if (data) {
    console.log("data");
    const parent_data_link = data.link;
    // console.log(data.link);
    const image_links = await fetchImages(data.link);
    const productId = data.link.split("/prid/")[1];

    console.log("link: ----" + parent_data_link);
    console.log(productId);

    const ingredients = await fetchIngredients(
      `https://blinkit.com/v1/layout/product/${productId}`
    );
    // console.log(image_links);
    console.log(ingredients);
    fs.writeFile("links.json", JSON.stringify(image_links), (err) => {
      if (err) {
        throw err;
      }
      console.log("Successfully Saved JSON File!");
    });
    fs.writeFile("ingredients.json", JSON.stringify(ingredients), (err) => {
      if (err) {
        console.log(err);
      }
      console.log("Successfully Saved Ingredients File");
    });
  }
});
