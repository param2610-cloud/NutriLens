/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 *
 * See the getting started guide for more information
 * https://ai.google.dev/gemini-api/docs/get-started/node
 */

import { configDotenv } from "dotenv";
import getImports from "./import.cjs";
import limits from "./limit_data.json" assert { type: "json" };

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
  GoogleAIFileManager,
} = getImports;
configDotenv();

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);
const fileManager = new GoogleAIFileManager(apiKey);

/**
 * Uploads the given file to Gemini.
 *
 * See https://ai.google.dev/gemini-api/docs/prompting_with_media
 */
async function uploadToGemini(path, mimeType) {
  const uploadResult = await fileManager.uploadFile(path, {
    mimeType,
    displayName: path,
  });
  const file = uploadResult.file;
  console.log(`Uploaded file ${file.displayName} as: ${file.name}`);
  return file;
}

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction:
    'You are John, you analysis images and tell that wheather it is nutrient label or ingredient list,\nif the image is ingredient list than give me a json in the below format:\n{ type: \'ingredient_list\', list: [/* List of all the ingredients in the image */] }\nif the image is nutrient label than give me json in the below format:\n{\n  "type": "nutrient_label"\n  "serving_size":   "20g" (in gram),\n  "nutrients": {\n    "energy":  "539 kcal",\n    "protein": "6.9 g"\n  }\n}\nif the image contains both the nutrient label and ingredient list then give me an array of both the json\n\nGive me every response in json format\nif any else asked or on error then give in this format: {type: "error"}\nAlways give me full response',
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

export async function getImageInfo(path) {
  // TODO Make these files available on the local file system
  // You may need to update the file paths
  const files = [await uploadToGemini(path, "image/jpeg")];

  const chatSession = model.startChat({
    generationConfig,
    // safetySettings: Adjust safety settings
    // See https://ai.google.dev/gemini-api/docs/safety-settings
    history: [
      {
        role: "user",
        parts: [
          {
            fileData: {
              mimeType: files[0].mimeType,
              fileUri: files[0].uri,
            },
          },
        ],
      },
      {
        role: "model",
        parts: [{ text: "give me details" }],
      },
    ],
  });

  const result = await chatSession.sendMessage("");
  return result.response.text();
}

export function getActualAmount(data, wieght) {
  let d2 = {};
  for (let key in data) {
    let num = parseFloat(data[key]);
    d2[key] = ((num / 100) * wieght).toFixed(2);
  }

  return d2;
}

export function getLimits(data) {
  for (let key in data) {
    if (key.toLowerCase() == "energy") continue;
    limits.forEach((lim) => {
      key.split(" ").forEach((e) => {
        if (new RegExp(e, "i").test(lim.nutrient)) {
          data[key] = {
            limit: lim.current_daily_value,
            unit: lim.unit,
            value: typeof data[key] == "object" ? data[key].value : data[key],
          };
        }
      });
    });
  }

  return data;
}
