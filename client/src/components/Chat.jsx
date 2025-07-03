import React, { useState, useEffect, useRef } from 'react';

const Chat = ({ currentUser, currentRoom }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message = {
      id: Date.now(),
      text: newMessage,
      sender: currentUser,
      timestamp: new Date().toISOString(),
      roomId: currentRoom
    };

    // Here you'll integrate with your backend
    // socket.emit('send_message', message);

    setMessages([...messages, message]);
    setNewMessage('');
  };

  return (
    <div className="chat-container" style={{ height: '600px', display: 'flex', flexDirection: 'column' }}>
      <div className="messages-container" style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message ${message.sender === currentUser ? 'sent' : 'received'}`}
            style={{
              marginBottom: '10px',
              padding: '10px',
              borderRadius: '8px',
              backgroundColor: message.sender === currentUser ? '#007bff' : '#e9ecef',
              color: message.sender === currentUser ? 'white' : 'black',
              alignSelf: message.sender === currentUser ? 'flex-end' : 'flex-start',
              maxWidth: '70%'
            }}
          >
            <div className="message-sender" style={{ fontWeight: 'bold', marginBottom: '5px' }}>
              {message.sender}
            </div>
            <div className="message-text">{message.text}</div>
            <div className="message-timestamp" style={{ fontSize: '0.8em', opacity: 0.7 }}>
              {new Date(message.timestamp).toLocaleTimeString()}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSendMessage} style={{ padding: '20px', borderTop: '1px solid #dee2e6' }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            style={{
              flex: 1,
              padding: '10px',
              borderRadius: '4px',
              border: '1px solid #dee2e6'
            }}
          />
          <button
            type="submit"
            style={{
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chat; 