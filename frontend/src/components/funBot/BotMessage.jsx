import React, { useState, useEffect } from "react";
import Typewriter from "typewriter-effect";

export default function BotMessage({ fetchMessage }) {
	const [isLoading, setLoading] = useState(true);
	const [message, setMessage] = useState("");
	const [flag, setflag] = useState(false);

	useEffect(() => {
		async function loadMessage() {
			const msg = await fetchMessage();
			setMessage(msg);
			setLoading(false);
		}
		loadMessage();
	}, [fetchMessage]);

	function bottyping(msg) {}

	return (
		<div className="message-container">
			<div
				className="bot-message"
				id="botmessage"
				style={flag ? { color: "red" } : null}
			>
				{isLoading ? (
					<div class="dot-elastic"></div>
				) : (
					<div id="botmessage">
						<Typewriter
							onInit={(typewriter) => {
								typewriter
									.typeString(message)
									.callFunction(() => {
										console.log("String typed out!");
									})
                  .changeDelay(10)
									.start();
							}}
						/>
					</div>
				)}
			</div>
		</div>
	);
}
