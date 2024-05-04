export const makeRequest = async (message) => {
	const response = await fetch("http://localhost:3000/edpoint", {
		method: "POST",
		headers: {
			"content-type": "application/json",
		},
		body: JSON.stringify({ message }),
	})

	return response.json()
}
