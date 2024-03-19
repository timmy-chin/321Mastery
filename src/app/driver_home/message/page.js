"use client";
import React, { useState, useEffect } from 'react';
import { ChatEngine } from 'react-chat-engine';
import axios from 'axios';

const ChatPage = () => {
  const [email, setEmail] = useState('');
  const [secret] = useState('your_predefined_hardcoded_secret');
  const [loaded, setLoaded] = useState(false); // New state to track if the credentials are loaded

  useEffect(() => {
    const fetchCredentials = async () => {
      try {
        const response = await axios.get('/api/getChatCredentials');
        const data = response.data;
        setEmail(data.email);
        setLoaded(true); // Set loaded to true once the email is fetched
      } catch (error) {
        console.error('Failed to fetch chat credentials', error);
      }
    };

    fetchCredentials();
  }, []);

  // Conditional rendering based on whether the credentials are loaded
  return loaded ? ( // Only render ChatEngine if credentials are loaded
    <ChatEngine
      height="100vh"
      projectID="c5709cf0-c535-4496-b825-aa06c9c8aa53"
      userName={email}
      userSecret={secret}
      ChatEngine offset={-7}
    />
  ) : (
    <div>Loading Chat...</div> // Display a loading message or spinner while waiting for credentials
  );
};

export default ChatPage;
