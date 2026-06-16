import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Middleware for parsing JSON
app.use(express.json());

// Initialize Gemini Client
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
}

// API Routes
app.post("/api/check-writing", async (req, res) => {
  try {
    const { challengeTitle, userText, prompt } = req.body;

    if (!userText || userText.trim().length === 0) {
      return res.status(400).json({ error: "Text is empty." });
    }

    if (!ai) {
      return res.status(500).json({ 
        error: "Gemini API client is not configured. Please ensure your GEMINI_API_KEY is active in the AI Studio panel." 
      });
    }

    const systemInstruction = `You are an expert tutor of European Portuguese (PT-PT). 
Your task is to analyze writing submissions in European Portuguese from foreign learners (beginners/intermediates/expats).
Analyze the writing strictly according to European Portuguese grammar, spelling (1990 Orthographic Agreement), vocabulary, and social politeness customs (which heavily favor indirect address like "o senhor" rather than "você").

Check for:
1. Brazilianisms (e.g. using gerunds like 'estou comendo' instead of 'estou a comer'; using pronoun proclisis 'me dá' instead of enclisis 'dê-me'; using vocab like 'celular' instead of 'telemóvel'). Highlight these and correct them to PT-PT.
2. Grammar errors (subject-verb agreement, gender alignment, pronoun placement).
3. Politeness and register (especially for bureaucratic and housing emails, which require formal headers and proper endings like "Com os meus melhores cumprimentos").

Return a response STRICTLY in valid JSON format matching the requested schema. Do not enclose in markdown blocks like \`\`\`json or \`\`\`. Do not include any text other than the raw JSON itself.`;

    const modelPrompt = `
Challenge Topic: "${challengeTitle}"
Scenario Context: "${prompt}"

Learner's Submitted Writing:
"${userText}"

Examine the learner's writing carefully, grade it, point out corrections, provide a polite standard PT-PT rewrite, and explain the why behind the errors.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: modelPrompt,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: {
              type: Type.INTEGER,
              description: "A score from 0 to 100 assessing grammar, spelling, vocab suitability, and natural flow."
            },
            grade: {
              type: Type.STRING,
              description: "Approximate CEFR level demonstrated (A1, A2, B1, B2)."
            },
            corrections: {
              type: Type.ARRAY,
              description: "List of specific errors identified, corrected, and explained in English.",
              items: {
                type: Type.OBJECT,
                properties: {
                  incorrect: { type: Type.STRING, description: "The incorrect snippet or sentence written by the user." },
                  correct: { type: Type.STRING, description: "The corrected European Portuguese replacement." },
                  explanation: { type: Type.STRING, description: "Explanation of why this was wrong and the PT-PT rule (especially if it corresponds to Brazilian vs European custom)." }
                },
                required: ["incorrect", "correct", "explanation"]
              }
            },
            generalFeedback: {
              type: Type.STRING,
              description: "Overall pedagogical evaluation in English, offering encouragement and strategic study feedback."
            },
            politeRewrite: {
              type: Type.STRING,
              description: "Provide a flawless, extremely natural, polite European Portuguese rewrite of their entire draft."
            }
          },
          required: ["score", "grade", "corrections", "generalFeedback", "politeRewrite"]
        }
      }
    });

    const parsedText = response.text || "{}";
    res.setHeader("Content-Type", "application/json");
    res.send(parsedText);
  } catch (error: any) {
    console.error("Gemini writing check error:", error);
    res.status(500).json({ error: error?.message || "An error occurred during writing analysis." });
  }
});

// Serve Vite dev server in development, static files in production
async function bootstrap() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server starting on port ${PORT}...`);
  });
}

bootstrap();
