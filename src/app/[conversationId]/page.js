"use client";
import { useState, useEffect } from 'react';
import styles from '/styles/Conversation.module.css';


function Conversation({ conversationId }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    async function fetchMessages() {
      const response = await fetch(`/api/messages/${conversationId}`);
      if (response.ok) {
        const data = await response.json();
        setMessages(data);
      } else {
        console.error("Failed to fetch messages.");
      }
    }

    fetchMessages();
  }, [conversationId]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      const response = await fetch(`/api/messages/${conversationId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: newMessage }),
      });

      if (response.ok) {
        setNewMessage('');
        await fetchMessages(); // Refresh the message list
      } else {
        console.error("Failed to send message.");
      }
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className={styles.conversation}>
      <div className={styles.messages}>
        {messages.map((message) => (
          <div key={message.id} className={message.senderId === 1 ? styles.myMessage : styles.theirMessage}>
            <span className={styles.messageContent}>{message.content}</span>
            <span className={styles.messageTimestamp}>{new Date(message.time).toLocaleTimeString()}</span>
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} className={styles.inputForm}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className={styles.input}
          placeholder="Type a message..."
        />
        <button type="submit" className={styles.sendButton}>Send</button>
      </form>
    </div>
  );
}

export default Conversation;
