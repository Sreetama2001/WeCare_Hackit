import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import Messages from "./chatBot/Messages";
import BotMessage from "./chatBot/BotMessage";
import UserMessage from "./chatBot/UserMessage";
import Input from "./chatBot/Input";

import API from "../ChatbotAPI";

// import "../assets/scss/components/chatbot.scss"

const ChatBot = () => {
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
				flag={async () => await API.GetChatbotResponse(text)}
			/>
		);
		setMessages(newMessages);
	};

	return (
		<div className="body">
			<header className="header">Wecare Automated Chat</header>
			<div className="chatbot">
				<Messages messages={messages} />
				<Input onSend={send} />
			</div>
		</div>
	);
};

export default ChatBot;
