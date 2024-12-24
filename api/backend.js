import vision from "@google-cloud/vision";
import OpenAI from "openai";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config();

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const imageBuffer = req.body.image; // Assuming image data is sent in the body as a buffer
      const client = new vision.ImageAnnotatorClient();

      // Perform text detection on the image buffer
      const [result] = await client.documentTextDetection({
        image: { content: imageBuffer },
      });
      const fullTextAnnotation = result.fullTextAnnotation;

      // OpenAI API integration
      const openai = new OpenAI({
        apiKey: process.env.OpenAI_API_KEY,
      });

      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You will create questions based exactly on the information given to quiz the user, and end all questions with a question mark",
          },
          {
            role: "user",
            content: fullTextAnnotation.text,
          },
        ],
      });

      res.status(200).json({ result: completion.choices[0].message.content });
    } catch (error) {
      res.status(500).json({ error: "Failed to process the image" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
