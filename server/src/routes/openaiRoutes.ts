import { Router } from "express";
import OpenAI from "openai";
import axios from "axios";
import * as cheerio from "cheerio";

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

router.post("/scrape", async (req, res) => {
  try {
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const { url, instructions } = req.body;

    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    //extract visible text only
    const text = $("body").text().replace(/\s+/g, " ").trim();

    //https://platform.openai.com/docs/api-reference/completions/create
    //FYI:: Legacy

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You extract structured data from webpage text.",
        },
        {
          role: "user",
          content: `Extract the following rom this page: ${instructions}`,
        },
      ],
      temperature: 0,
    });

    res.json({
      result: completion.choices[0].message.content,
    });
  } catch (err) {
    //make sure to set an error response
    res.status(500).json({
      error: "scraping failed.",
    });
  }
});

export default router;
