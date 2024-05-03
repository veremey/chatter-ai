import express from "express"
import cors from "cors"
import OpenAI from "openai"
import dotenv from "dotenv"

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

const openai = new OpenAI({
	// eslint-disable-next-line no-undef
	apiKey: process.env.REACT_APP_OPENAI_API_KEY,
})

app.post("/edpoint", async (req, res) => {
	const chatCompletion = await openai.chat.completions.create({
		messages: [{ role: "user", content: req.body.message }],
		model: "gpt-3.5-turbo",
	})

	res.send(chatCompletion.choices[0].message)
})

// eslint-disable-next-line no-undef
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`server is RUNNIING at port - ${port}`))
