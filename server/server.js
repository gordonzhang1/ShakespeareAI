// Imports the Google Cloud client library
import vision from "@google-cloud/vision";

// Creates a client
const client = new vision.ImageAnnotatorClient();

const fileName = "/Users/gordonzhang/Downloads/APITEST.jpeg";

// Read a local image as a text document
const [result] = await client.documentTextDetection(fileName);
const fullTextAnnotation = result.fullTextAnnotation;
console.log(`Full text: ${fullTextAnnotation.text}`);

import OpenAI from "openai";
const openai = new OpenAI({
  apiKey: process.env.OpenAI_API_KEY, //Do export OPENAI_API_KEY="your_api_key_here"
});

const completion = await openai.chat.completions.create({
  model: "gpt-4o-mini",
  messages: [
    {
      role: "system",
      content:
        "You will create a series of questions based on the information given to quiz the user",
    },
    {
      role: "user",
      content: fullTextAnnotation.text,
    },
  ],
});

console.log(completion.choices[0].message);
