import { useState, useRef, useEffect } from "react"
import Markdown from "react-markdown"
import { makeRequest } from "./api/makeRequest"

import "./App.scss"

function App() {
	const [data, setData] = useState()
	const [message, setMessage] = useState("")
	const [chat, setChat] = useState([])
	const [loading, setLoading] = useState(false)

	const anchorRef = useRef(null)
	const scrollToElement = () => anchorRef.current.scrollIntoView()

	useEffect(() => {
		if (chat.length > 0) {
			scrollToElement()
		}
	}, [chat])

	const askChatGPT = async (e) => {
		e.preventDefault()

		setLoading(true)

		setChat((state) => [
			...state,
			{
				role: "admin",
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

		setLoading(false)
	}

	return (
		<div className='chat'>
			<div className='chat__messages'>
				{chat.map((item, index) => (
					<div
						key={index}
						ref={anchorRef}
						className={`chat__item chat__item--${item.role}`}>
						<div className={`message`}>
							<h3 className='message__title'>{item.role}</h3>
							<Markdown className='message__desc'>{item.message}</Markdown>
						</div>
					</div>
				))}
			</div>
			<form className='chat-form' onSubmit={askChatGPT}>
				<input
					className='chat-form__input'
					type='text'
					value={message}
					onChange={(e) => setMessage(e.target.value)}
				/>
				<button className='chat-form__btn chat-form__btn--submit' type='submit'>
					Send
				</button>
			</form>
		</div>
	)
}

export default App
