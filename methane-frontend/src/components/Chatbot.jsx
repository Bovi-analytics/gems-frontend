// Chatbot.jsx
import React, { useState, useRef, useEffect } from "react";
import "../Chatbot.css"; // move the CSS to a separate file

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);

  const messagesEndRef = useRef(null);

  const apiUrl = fullscreen
    ? "http://localhost:5000/api/v1/gems/chat-full-page"
    : "http://localhost:5000/api/v1/gems/chat";

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || thinking) return;

    setMessages((prev) => [...prev, { text, sender: "user" }]);
    setInput("");
    setThinking(true);

    setMessages((prev) => [...prev, { text: "Bovi is thinking...", sender: "typing" }]);

    try {
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const data = await res.json();
      const reply = data.response || "No response from the model.";

      setMessages((prev) =>
        [...prev.filter((msg) => msg.sender !== "typing"), { text: reply, sender: "bot" }]
      );
    } catch (error) {
      setMessages((prev) =>
        [...prev.filter((msg) => msg.sender !== "typing"), { text: "Oops! Something went wrong.", sender: "bot" }]
      );
    }
    setThinking(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <>
      <button className="chat-toggle" onClick={() => setIsOpen(!isOpen)}>💬</button>

      {isOpen && (
        <div className={`chat-container ${fullscreen ? "fullscreen" : ""}`}>
          <div className={`chat-header ${fullscreen ? "fullscreen-header" : ""}`}>
            Ask Bovi
            <button onClick={() => setFullscreen(!fullscreen)}>⤢</button>
          </div>

          <div className={`chat-messages ${fullscreen ? "fullscreen-messages" : ""}`}>
            {messages.map((msg, i) => (
              <div key={i} className={`message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything..."
              disabled={thinking}
            />
            <button onClick={sendMessage} disabled={thinking}>Send</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
