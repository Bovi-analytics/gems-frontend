// import React, { useState, useRef, useEffect } from "react";
// import { marked } from "marked";
// import DOMPurify from "dompurify";
// import "../Chatbot.css";

// const Chatbot = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [fullscreen, setFullscreen] = useState(false);
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [thinking, setThinking] = useState(false);

//   const messagesEndRef = useRef(null);

//   const apiUrl = fullscreen
//     ? `${process.env.REACT_APP_BASE_API_URL}/api/v1/gems/chat-full-page`
//     : `${process.env.REACT_APP_BASE_API_URL}/api/v1/gems/chat`;

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const sendMessage = async () => {
//     const text = input.trim();
//     if (!text || thinking) return;

//     setMessages((prev) => [...prev, { text, sender: "user" }]);
//     setInput("");
//     setThinking(true);

//     setMessages((prev) => [...prev, { text: "Bovi is thinking...", sender: "typing" }]);

//     try {
//       const res = await fetch(apiUrl, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ message: text }),
//       });

//       const data = await res.json();
//       const reply = data.response || "No response from the model.";

//       setMessages((prev) =>
//         [...prev.filter((msg) => msg.sender !== "typing"), { text: reply, sender: "bot" }]
//       );
//     } catch (error) {
//       setMessages((prev) =>
//         [...prev.filter((msg) => msg.sender !== "typing"), { text: "Oops! Something went wrong.", sender: "bot" }]
//       );
//     }

//     setThinking(false);
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter") sendMessage();
//   };

//   const renderMessage = (msg) => {
//     if (msg.sender === "bot") {
//       const isSimpleText = !msg.text.includes("**") && !msg.text.includes("```") && !msg.text.includes("- ");
//       const sanitizedHtml = DOMPurify.sanitize(marked.parse(msg.text));
//       return isSimpleText
//         ? msg.text.replace(/\n/g, "<br>") // fallback formatting
//         : sanitizedHtml;
//     }

//     return msg.text.replace(/\n/g, "<br>");
//   };

//   return (
//     <>
//       <button className="chat-toggle" onClick={() => setIsOpen(!isOpen)}>💬</button>

//       {isOpen && (
//         <div className={`chat-container ${fullscreen ? "fullscreen" : ""}`}>
//           <div className={`chat-header ${fullscreen ? "fullscreen-header" : ""}`}>
//             Ask Bovi
//             <button onClick={() => setFullscreen(!fullscreen)}>⤢</button>
//           </div>

//           <div className={`chat-messages ${fullscreen ? "fullscreen-messages" : ""}`}>
//             {messages.map((msg, i) => (
//               <div
//                 key={i}
//                 className={`message ${msg.sender}`}
//                 dangerouslySetInnerHTML={{ __html: renderMessage(msg) }}
//               />
//             ))}
//             <div ref={messagesEndRef} />
//           </div>

//           <div className="chat-input">
//             <input
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyDown={handleKeyDown}
//               placeholder="Ask me anything..."
//               disabled={thinking}
//             />
//             <button onClick={sendMessage} disabled={thinking}>Send</button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Chatbot;

import React, { useState, useRef, useEffect } from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";
import "../Chatbot.css";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);

  const messagesEndRef = useRef(null);

  const apiUrl = fullscreen
    ? `${process.env.REACT_APP_BASE_API_URL}/api/v1/gems/chat-full-page`
    : `${process.env.REACT_APP_BASE_API_URL}/api/v1/gems/chat`;

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

    const uniqueId = Date.now();
    const thinkingMsg = { text: "Bovi-Bot is thinking...", sender: "typing", id: uniqueId };
    setMessages((prev) => [...prev, thinkingMsg]);

    // After 10s, if still thinking, update message
    const engineMsgTimeout = setTimeout(() => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === uniqueId ? { ...msg, text: "Please wait while I'm starting my engine..." } : msg
        )
      );
    }, 10000);

    try {
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      const data = await res.json();
      const reply = data.response || "No response from the model.";

      clearTimeout(engineMsgTimeout);

      setMessages((prev) =>
        [...prev.filter((msg) => msg.sender !== "typing"), { text: reply, sender: "bot" }]
      );
    } catch (error) {
      clearTimeout(engineMsgTimeout);

      setMessages((prev) =>
        [...prev.filter((msg) => msg.sender !== "typing"), { text: "Oops! Something went wrong.", sender: "bot" }]
      );
    }

    setThinking(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  const renderMessage = (msg) => {
    if (msg.sender === "bot") {
      const isSimpleText = !msg.text.includes("**") && !msg.text.includes("```") && !msg.text.includes("- ");
      const sanitizedHtml = DOMPurify.sanitize(marked.parse(msg.text));
      return isSimpleText
        ? msg.text.replace(/\n/g, "<br>")
        : sanitizedHtml;
    }

    return msg.text.replace(/\n/g, "<br>");
  };

  return (
    <>
      <button className="chat-toggle" onClick={() => setIsOpen(!isOpen)}>💬</button>

      {isOpen && (
        <div className={`chat-container ${fullscreen ? "fullscreen" : ""}`}>
          <div className={`chat-header ${fullscreen ? "fullscreen-header" : ""}`}>
            Ask Bovi-Bot
            <button onClick={() => setFullscreen(!fullscreen)}>⤢</button>
          </div>

          <div className={`chat-messages ${fullscreen ? "fullscreen-messages" : ""}`}>
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`message ${msg.sender}`}
                dangerouslySetInnerHTML={{ __html: renderMessage(msg) }}
              />
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


