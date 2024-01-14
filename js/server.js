const express = require("express")
const Openai = require("openai")
const cors = require("cors")

const app = express()
const port = 3000

app.use(cors())

const openai = new Openai({
  apiKey: "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",
})

app.use(express.json())

app.post("/generate-name", async (req, res) => {
  try {
    const { keyword } = req.body

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Create 10 unique and imaginative brand names that incorporate the essence of the keyword '${keyword}'. The names should be catchy, easy to remember, and relevant to the theme suggested by the keyword. Each brand name must be distinctive, suggesting a fresh and innovative approach or product related to the keyword. Ensure the names are suitable for a global audience and are versatile enough for various types of businesses or products associated with the keyword. Avoid any direct references to existing brand names or trademarks.`,
        },
      ],
      max_tokens: 100,
    })

    const suggestion = response.choices[0].message.content.trim()

    res.json({ suggestion })
  } catch (error) {
    console.error(error)
    res.status(500).send("An error occurred")
  }
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
