import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const OLLAMA_URL = process.env.OLLAMA_URL || "http://localhost/api/chat";

app.use(morgan('tiny'))
app.use(express.json());
app.use(cors());

app.get('/', (req, res)=>{
  return res.status(200).json({ success: "Success" });
});

app.post("/chat", async (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    const response = await fetch(OLLAMA_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "deepseek-r1:1.5b",
        messages: [{ role: "user", content: message }],
        "stream": false
      }),
    });
    
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error communicating with Ollama:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
