import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import axios from "axios";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan("tiny"));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  return res.status(200).json({ success: "Success" });
});

app.post("/chat", async (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    const data = await getGeneratedResult(message);
    res.json(data);
  } catch (error) {
    console.error("Error communicating with API:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

async function getConversationId() {
  try {
    const data = JSON.stringify({ "summary": "{summary of the conversation}" });

    const response = await axios.post(
      `${process.env.RAG_EPSILLA_WEB}/conversation/${process.env.RAG_EPSILLA_USER_KEY}/create`,
      data,
      {
        headers: {
          "X-API-Key": process.env.RAG_EPSILLA_API_KEY,
          "Content-Type": "application/json",
        },
        maxBodyLength: Infinity,
      }
    ); 

    if(response.data.statusCode !== 200) res.status(400).json({ error: "Faild to fetch Conversation Id" });
    return response.data.result.conversationId;
  } catch (error) {
    console.error("Error fetching conversation ID:", error);
    throw error;
  }
}

async function getRequestUUID(chat) {
  try {
    let conversationId = await getConversationId();
     if (!conversationId) {
      throw new Error("Invalid conversation ID");
    }
    const data = JSON.stringify({ message: chat });

    const response = await axios.post(
      `${process.env.RAG_EPSILLA_WEB}/chat/${process.env.RAG_EPSILLA_USER_KEY}/${conversationId}`,
      data,
      {
        headers: {
          "X-API-Key": process.env.RAG_EPSILLA_API_KEY,
          "Content-Type": "application/json",
        },
        maxBodyLength: Infinity,
      }
    );

    if(response.data.statusCode !== 200) res.status(400).json({ error: "Faild to fetch Request UUID" });
    return response.data.result;
  } catch (error) {
    console.error("Error fetching Request UUID:", error);
    throw error;
  }
}

async function getGeneratedResult(chat, maxRetries = 5, delayMs = 2000) {
  try {
    let requestUUID = await getRequestUUID(chat);
     
    if (!process.env.RAG_EPSILLA_USER_KEY || !process.env.RAG_EPSILLA_API_KEY) {
      throw new Error("Missing environment variables: RAG_EPSILLA_USER_KEY or RAG_EPSILLA_API_KEY");
    }

   const url = `${process.env.RAG_EPSILLA_WEB}/stream/${process.env.RAG_EPSILLA_USER_KEY}/${requestUUID}`;
 
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      const response = await axios.get(url, {
        headers: {
          "X-API-Key": process.env.RAG_EPSILLA_API_KEY,
          "Content-Type": "application/json",
        },
        maxBodyLength: Infinity,
      }); 
 
      if (response.data.statusCode !== 200) {
        throw new Error("Invalid API response: " + JSON.stringify(response.data));
      }

      const resultData = response.data.result;
      
      if (resultData.completed && resultData.result["Generated Result"]) {
         return resultData.result["Generated Result"];
      }

      console.log(`Attempt : ${attempt}, Result not ready, waiting ${delayMs / 1000} seconds before retrying...`);
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }

    console.warn("Max retries reached. Returning null.");
    return null;
  } catch (error) {
    console.error("Error fetching generated result:", error.message);
    throw error;
  }
}

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
