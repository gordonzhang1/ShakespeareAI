import vision from "@google-cloud/vision";
import OpenAI from "openai";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config();

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single("image"); // Ensure this matches the frontend field name

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Use multer middleware to handle multipart/form-data
  upload.single("image")(req, res, async (err) => {
    // Handle any multer errors
    if (err) {
      return res
        .status(400)
        .json({ error: "Error processing the file upload" });
    }

    try {
      const imageBuffer = req.file?.buffer; // Access the image buffer from req.file

      if (!imageBuffer) {
        return res.status(400).json({ error: "No image file uploaded" });
      }

      // Initialize the Google Vision client
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
  });
}
