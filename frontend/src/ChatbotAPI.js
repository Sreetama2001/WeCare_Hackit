import axios from "axios";
// import fetch  from 'node-fetch';
async function moodGuesser(message) {
	// http://tweetmoodchk.d7cgcshfajbxf6dv.eastus.azurecontainer.io/mood

	const response = axios
		.get("https://official-joke-api.appspot.com/random_joke")
		.then(function (response) {
			// handle success
			console.log(response.data);
		})
		.catch(function (error) {
			// handle error
			console.log(error);
		})
		.then(function () {
			// always executed
		});

	return response.data.setup + response.data.punchline;
}

async function getMeme() {
	const response = axios
		.get("https://meme-api.herokuapp.com/gimme/IndianDankMemes")
		.then(function (response) {
			// handle success
			console.log(response.data);
		})
		.catch(function (error) {
			// handle error
			console.log(error);
		})
		.then(function () {
			// always executed
		});

	return response.data.setup + response.data.punchline;
}

// const API = {
// 	GetChatbotResponse: async (message) => {
// 		return new Promise(function (resolve, reject) {
// 			setTimeout(function () {
// 				if (message === "hi" || message === "hello" || message === "hey")
// 					resolve(
// 						" Hi ! How was ur Day :) ? "
// 					);
// 				else if (message === "joke") {
// 					axios
// 						.get("https://official-joke-api.appspot.com/random_joke")
// 						.then(function (response) {
// 							// handle success
// 							console.log(response.data);
// 							resolve(response.data.setup + " " + response.data.punchline);
// 						})
// 						.catch(function (error) {
// 							// handle error
// 							console.log(error);
// 						});
// 				} else {
// 					// resolve("I am  your mood guesser bot 😀, I will send you jokes if you are sad ? I can your mood for sure ;)");

// 				}
// 			}, 1000);
// 		});
// 	},
// };

const API = {
	GetChatbotResponse: async (message) => {
		return new Promise(async (resolve, reject) => {
			try {
				if (
					message.toLowerCase() === "hi" ||
					message.toLowerCase() === "hello" ||
					message.toLowerCase() === "hey"
				) {
					resolve(" Hi 👋 ! How was ur Day :) ? ");
				} else if (message === "joke") {
					// Call the joke API
					const jokeResponse = await axios.get(
						"https://official-joke-api.appspot.com/random_joke"
					);
					const { setup, punchline } = jokeResponse.data;
					resolve(`${setup} ${punchline}`);
				} else {
					// Call the mood detection API
					const moodResponse = await axios.post("https://wecare12.azurewebsites.net/mood", {
						mood: message,
					});
					const { flag, reply } = moodResponse.data;

					if (flag) {
						// Call the joke API
						const jokeResponse = await axios.get(
							"https://official-joke-api.appspot.com/random_joke"
						); // flag-- true -- red else blue  // joke next line // have good day next line
						const { setup, punchline } = jokeResponse.data;
						// resolve(`${reply}`);
						resolve(
							`${reply} Here is your joke : <br/> <br/> Setup : ${setup} <br/> <br/> Joke : ${punchline}`
						);
					} else {
						resolve(`${reply} Try me again 😇!`);
						// resolve(`I am  your mood guesser bot 😀, I will send you jokes if you are sad ;)!`);
					}
				}
			} catch (error) {
				console.log(error);
				reject(error);
			}
		});
	},
};

export default API;

// uvicorn app.app:app --reload
