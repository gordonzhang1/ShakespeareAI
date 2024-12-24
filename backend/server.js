// Imports the Google Cloud client library
import vision from "@google-cloud/vision";
import express from "express";
import cors from "cors";
import OpenAI from "openai";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

const storage = multer.memoryStorage(); // Store the file in memory instead of disk
const upload = multer({ storage: storage });

app.post("/backend", upload.single("image"), async (req, res) => {
  try {
    console.log(
      "Google Application Credentials Path:",
      process.env.GOOGLE_APPLICATION_CREDENTIALS
    );

    const imageBuffer = req.file.buffer;
    const client = new vision.ImageAnnotatorClient();

    // Read a local image as a text document
    const [result] = await client.documentTextDetection({
      image: { content: imageBuffer },
    });
    const fullTextAnnotation = result.fullTextAnnotation;
    console.log(`Full text: ${fullTextAnnotation.text}`);

    //OPENAI
    const openai = new OpenAI({
      apiKey: process.env.OpenAI_API_KEY, //Do export OPENAI_API_KEY="your_api_key_here"
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

    console.log(completion.choices[0].message.content);

    res.send(completion.choices[0].message.content);
  } catch {
    res.status(500).send({ error: "Failed to process the image" });
  }
});

app.get("/", (req, res) => {
  res.send("Server is running!");
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
