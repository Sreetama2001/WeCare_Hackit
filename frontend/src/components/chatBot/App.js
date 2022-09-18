import React from "react";
import HomePage from "./components/HomePage";
import { Helmet } from "react-helmet";
function ChatBot() {
  return (
    <>
      <Helmet>
        <title>Wecare | Symptom-Checker</title>
      </Helmet>
      <div style={{ backgroundColor: "#041C34" }}>
        <HomePage />
      </div>
    </>
  );
}

export default ChatBot;
