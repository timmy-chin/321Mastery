
// front end page.js
"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '../../../../styles/Message.module.css';

export default function Messages() {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [recipientId, setRecipientId] = useState('');

  useEffect(() => {
    setLoading(true);
    fetch('/api/messages')
      .then(res => res.json())
      .then(data => {
        setConversations(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Failed to load conversations:", error);
        setError(error);
        setLoading(false);
      });
  }, []);

  const sendMessage = async () => {
    if (!newMessage.trim() || !recipientId.trim()) return;
    try {
      const response = await fetch('/api/messages/new', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: newMessage, recipientId }),
      });
      if (response.ok) {
        setNewMessage('');
        // Optionally, refresh conversations or handle UI update
      } else {
        console.error("Failed to send message.");
      }
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className={styles.messagingCenter}>
      <h1 className={styles.header}>Messaging Center</h1>
      <div className={styles.newMessageForm}>
        <input 
          type="text" 
          placeholder="Recipient ID" 
          value={recipientId} 
          onChange={(e) => setRecipientId(e.target.value)} 
        />
        <textarea 
          placeholder="New message..." 
          value={newMessage} 
          onChange={(e) => setNewMessage(e.target.value)}
        ></textarea>
        <button onClick={sendMessage}>Send New Message</button>
      </div>
      <div className={styles.messageList}>
        {conversations.map((conversation) => (
          <Link key={conversation.id} href={`/app/${conversation.id}`} passHref>
            <div className={styles.messagePreview}>
              <img src="/profile-pic-placeholder.png" alt="Profile" className={styles.profilePic} />
              {conversation.messages.map((message) => (
                <div key={message.id}>
                  <div className={styles.messageInfo}>
                    {/* Adjusted to display recipient information */}
                    <strong>{message.sender.firstName} {message.sender.lastName}</strong>
                    <p>{message.content.substring(0, 50)}{message.content.length > 50 ? '...' : ''}</p>
                  </div>
                  <span className={styles.sentDate}>{new Date(message.time).toLocaleString()}</span>
                </div>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

