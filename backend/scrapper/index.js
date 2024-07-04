import {getImageInfo} from '../GetInfo.js'
import puppeteer from "puppeteer-extra";

export const product_name_fetch_go_upc = async (barcode) => {
  let browser;
  try {
    browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    const go_upc_search = `https:/www.google.com/search?q=details of ${barcode}`;
    await page.goto(go_upc_search);
    

    await page.waitForSelector('a[jsname="UWckNb"]');

    const anchor_element = await page.$('a[jsname="UWckNb"]');

    const Product_name = await page.evaluate(
      (element) => element.querySelector("h3.LC20lb").textContent,
      anchor_element
    );

    console.log("Name: ", Product_name);
    if (Product_name == null) {
      return false;
    }
    return Product_name;
  } catch (error) {
    console.error("Error during scraping:", error);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};
export const jio_mart_fetch = async (ProductName) => {
  if (!ProductName) {
    return false;
  }
  //link fetch
  const Data = await jio_mart_product_fetch_link(ProductName);
  if (!Data.success) {
    console.log("data 1 failed")
    return { success: false, link: null };
  }
  
  //image fetch
  const Data1 = await jio_mart_image_fetch(Data.link);
  console.log("asdad",Data1.imgSrc);
  if (!Data1.success) {
    console.log("data 2 failed")
    return { success: false, link: null };
  }
  const Data2 = await jio_mart_image_details_fetch(Data1.imgSrc);
  if (!Data2) {
    console.log("data 3 failed")
    return {productdetails:null,success:true}
  }
  return {productdetails:Data2,success:true}
};

export const jio_mart_product_fetch_link = async (Product_name) => {
  let browser;
  const isSameProduct = (H3Word, Product_name) => {
    const wordInH3 = H3Word.toLowerCase().split(/\s+/);
    const wordInName = Product_name.toLowerCase().split(/\s+/);
    const setH3 = new Set(wordInH3);
    const setName = new Set(wordInName);
    for (let word of setName) {
      if (setH3.has(word)) {
        return true;
      }
    }
    return false;
  };
  try {
    browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    const jio_mart_search = `https://www.google.com/search?q=${Product_name} jio mart`;
    await page.goto(jio_mart_search);

    await page.waitForSelector('a[jsname="UWckNb"]');

    const anchor_element = await page.$('a[jsname="UWckNb"]');

    if (anchor_element) {
      const href = await page.evaluate(
        (element) => element.getAttribute("href"),
        anchor_element
      );

      const product_h3_text = await page.evaluate(
        (element) => element.querySelector("h3.LC20lb").textContent,
        anchor_element
      );

      const company_name_element = await page.$("span.VuuXrf");
      const company_name = company_name_element
        ? await page.evaluate(
            (element) => element.textContent,
            company_name_element
          )
        : null;

      if (company_name != "JioMart") {
        return { success: false, link: null };
      } else if (
        company_name == "JioMart" &&
        href &&
        isSameProduct(product_h3_text, Product_name)
      ) {
        return { success: true, link: href };
      } else {
        return { success: false, link: null };
      }
    } else {
      console.error("Anchor element not found");
    }
  } catch (error) {
    console.error("Error during scraping from big basket: ", error);

    return { success: false, link: null };
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};

export const jio_mart_image_fetch = async (link) => {
  let browser;
  if (!link) {
    return { imgSrc: null, success: false };
  }

  try {
    browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(link, { waitUntil: "networkidle2" });
    const imgSrc = await page.evaluate(() => {
      const div = document.querySelector('[aria-label^="5"]');
      if (div) {
        const img = div.querySelector("img");
        if (img) {
          const image_url = img.src;
          const resized_image_url = image_url.replace(
            "Resize=(150,150)",
            "Resize=(420,420)"
          );
          return (
            resized_image_url ||
            img
              .getAttribute("data-src")
              .replace("Resize=(150,150)", "Resize=(420,420)") ||
            null
          );
        }
      }
      return null;
    });

    return { imgSrc, success: !!imgSrc };
  } catch (error) {
    console.log("Error fetching the image:", error);
    return { imgSrc: null, success: false };
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};

export const jio_mart_image_details_fetch = async (link) => {
  try {
    const imageInfo = await getImageInfo(null, link);
    console.log("Image Info:", imageInfo);
    return imageInfo
  } catch (error) {
    console.error("Error processing image:", error);
  }
};



