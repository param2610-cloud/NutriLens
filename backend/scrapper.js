import fetch from "node-fetch";
import { parse } from "node-html-parser";

let resp = await fetch(
  "https://blinkit.com/prn/lays-indias-magic-masala-chips-40-g/prid/240092",
  {
    headers: {
      accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
      "accept-language": "en-GB,en-US;q=0.9,en;q=0.8,hi;q=0.7,bn;q=0.6",
      "cache-control": "no-cache",
      pragma: "no-cache",
      priority: "u=0, i",
      "sec-ch-ua":
        '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "sec-fetch-dest": "document",
      "sec-fetch-mode": "navigate",
      "sec-fetch-site": "cross-site",
      "sec-fetch-user": "?1",
      "upgrade-insecure-requests": "1",
    },
    referrerPolicy: "no-referrer",
    body: null,
    method: "GET",
  }
);

resp = await resp.text();

const root = parse(resp);
const allImages = [];

root
  .querySelectorAll("#carousel-items > section > div > img")
  .forEach((img) => {
    let f = img.getAttribute("src");
    if (f) allImages.push(f);
  });

console.log(allImages);
