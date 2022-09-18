import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import Messages from "./funBot/Messages";
import BotMessage from "./funBot/BotMessage";
import UserMessage from "./funBot/UserMessage";
import Input from "./funBot/Input";

import API from "../ChatbotAPI";

// import "../assets/scss/components/chatbot.scss"


const FunBot = () => {
	const [messages, setMessages] = useState([]);
    
	useEffect(() => {
		async function loadWelcomeMessage() {
			setMessages([
				<BotMessage
					key="0"
					fetchMessage={async () => await API.GetChatbotResponse("hi")}
				/>,
			]);
		}
		loadWelcomeMessage();
	}, []);

	const send = async (text) => {
		const newMessages = messages.concat(
			<UserMessage key={messages.length + 1} text={text} />,
			<BotMessage
				key={messages.length + 2}
				fetchMessage={async () => await API.GetChatbotResponse(text)}
			/>
		);
		setMessages(newMessages);
	};

	return (
		<div className="body">
		<header className="header">
			Wecare Fun Bot
		</header>
		<div className="chatbot">
			<Messages messages={messages} />
			<Input onSend={send} />
		</div>
		</div>
	);
};

const rootElement = document.getElementById("root");
ReactDOM.render(<FunBot />, rootElement);

export default FunBot;
