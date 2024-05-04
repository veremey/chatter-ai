import { useState } from "react"
import { makeRequest } from "./api/makeRequest"
import "./App.css"

function App() {
	const [data, setData] = useState()
	const [message, setMessage] = useState("")
	const [chat, setChat] = useState([])

	const askChatGPT = async (e) => {
		e.preventDefault()

		setChat((state) => [
			...state,
			{
				role: "Admin",
				message,
			},
		])

		setMessage("")
		const response = await makeRequest(message)
		setData(response)

		setChat((state) => [
			...state,
			{
				role: "chatGPT",
				message: response.content,
			},
		])
	}

	return (
		<div>
			<div>
				{chat.map((item, index) => (
					<div key={index}>
						<div>
							<div>{item.role}</div>
							<div>{item.message}</div>
						</div>
					</div>
				))}
				{JSON.stringify(data, null, 2)}
			</div>
			<form onSubmit={askChatGPT}>
				<input type='text' value={message} onChange={(e) => setMessage(e.target.value)} />
				<button type='submit'>Send</button>
			</form>
		</div>
	)
}

export default App
