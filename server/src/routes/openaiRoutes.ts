import { Router } from "express";
import OpenAI from "openai";

const router = Router();

router.post("/ask", async (req, res) => {
  const { prompt } = req.body;

  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const completion = await client.chat.completions.create({
    model: "gpt-40-mini",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  res.json({
    reply: completion.choices[0].message.content,
  });
});

export default router;
