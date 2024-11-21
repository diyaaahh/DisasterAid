import React, { useState } from 'react';
import axios from 'axios';
import './chats.css'; // Add a CSS file for styling
import { IoChatbubblesOutline } from "react-icons/io5";

function ChatInterface() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false); // State to toggle chat popup

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!inputMessage.trim()) return;

    // Add user's message to chat
    const newMessages = [...messages, { text: inputMessage, sender: 'user' }];
    setMessages(newMessages);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Send message to backend
      const response = await axios.post('http://localhost:3000/chat', {
        message: inputMessage,
      });

      // Add AI's response to chat
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: response.data.message, sender: 'ai' },
      ]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: 'Sorry, there was an error processing your message.', sender: 'ai' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {/* Chathead */}
      <div className="chathead" onClick={() => setIsChatOpen(!isChatOpen)}>
      <IoChatbubblesOutline style={{ fontSize: '2.75rem' }}/>
      </div>

      {/* Chat Popup */}
      {isChatOpen && (
        <div className="chat-popup">
          <div className="chat-messages">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message ${message.sender}`}
              >
                {message.text}
              </div>
            ))}
            {isLoading && <div className="message ai">Thinking...</div>}
          </div>
          <form onSubmit={handleSendMessage} className="chat-input">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your first aid query..."
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !inputMessage.trim()}
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default ChatInterface;
