// front end page.js
"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '../../../../styles/Message.module.css';

export default function Messages() {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Failed to load</div>;

  return (
    <div className={styles.messagingCenter}>
      <h1 className={styles.header}>Messaging Center</h1>
      <div className={styles.messageList}>
        {conversations.map((conversation) => (
          <Link key={conversation.id} href={`/app/${conversation.id}`} passHref>
            <div className={styles.messagePreview}>
              <img src="/profile-pic-placeholder.png" alt="Profile" className={styles.profilePic} />
              {conversation.messages.map((message) => (
                <div key={message.id}>
                  <div className={styles.messageInfo}>
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
