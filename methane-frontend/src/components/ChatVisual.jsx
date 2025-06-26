import React, { useState, useRef, useEffect } from "react";
import "../ChatVisual.css";

const ChatVisual = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text) return;

    setMessages((prev) => [...prev, { type: "user", text }]);
    setInput("");
    setLoading(true);

    const timeoutId = setTimeout(() => {
      setMessages((prev) => [...prev, { type: "bot", text: "⏳ Please wait while I'm starting my engine..." }]);
    }, 10000);

    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_API_URL}/api/v1/gems/chat-visual`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      clearTimeout(timeoutId);

      const data = await response.json();

      if (data.image_url) {
        setMessages((prev) => [...prev, { type: "image", url: data.image_url }]);
      } else {
        setMessages((prev) => [...prev, { type: "bot", text: data.response || "No response." }]);
      }
    } catch (error) {
      clearTimeout(timeoutId);
      setMessages((prev) => [...prev, { type: "bot", text: "❌ Error generating visual." }]);
      console.error(error);
    }

    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="chat-visual-container">
      <div className="chat-thread">
        {messages.map((msg, i) => (
          <div key={i} className={`chat-msg ${msg.type}`}>
            {msg.type === "image" ? (
              <img src={`http://localhost:5000${msg.url}`} alt="Chart" className="chat-image" />
            ) : (
              msg.text
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-row">
        <input
          type="text"
          placeholder="Ask Bovi-Bot visual question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
        />
        <button onClick={sendMessage} disabled={loading}>
          {loading ? "Thinking..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default ChatVisual;
