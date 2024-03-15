"use client";
import React, { useState, useEffect } from 'react';
import { ChatEngine } from 'react-chat-engine';

const ChatPage = () => {
  const [chatCredentials, setChatCredentials] = useState({ userName: '', userSecret: '' });

  useEffect(() => {
    const fetchCredentials = async () => {
      const response = await fetch('/api/getChatCredentials');
      if (!response.ok) {
        console.error('Failed to fetch chat credentials');
        return;
      }
      const credentials = await response.json();
      setChatCredentials({ userName: credentials.email, userSecret: credentials.secret });
    };

    fetchCredentials();
  }, []);

  return (
    <ChatEngine
      height="100vh"
      projectID="150eeeeb-3ade-4261-9489-11f62be94afd"// Replace with your actual project ID
      userName="user"
      userSecret="user"
    />
  );
};

export default ChatPage;
