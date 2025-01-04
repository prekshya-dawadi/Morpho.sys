import React, { useState, useCallback, useEffect } from 'react';
import fs from 'fs/promises';
import path from 'path';

// Utility function to handle message storage
const MessageHistoryManager = {
  async saveMessages(messages) {
    try {
      const filePath = path.join(process.cwd(), 'json', 'prompts.json');
      await fs.writeFile(filePath, JSON.stringify(messages, null, 2));
    } catch (error) {
      console.error('Error saving messages:', error);
    }
  },

  async loadMessages() {
    try {
      const filePath = path.join(process.cwd(), 'json', 'prompts.json');
      const data = await fs.readFile(filePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error loading messages:', error);
      return [];
    }
  },

  async clearMessages() {
    try {
      const filePath = path.join(process.cwd(), 'json', 'prompts.json');
      await fs.writeFile(filePath, JSON.stringify([], null, 2));
    } catch (error) {
      console.error('Error clearing messages:', error);
    }
  }
};

// Custom hook for message management
const useMessageHistory = () => {
  const [messages, setMessages] = useState([]);

  // Load messages on component mount
  useEffect(() => {
    const loadInitialMessages = async () => {
      const savedMessages = await MessageHistoryManager.loadMessages();
      setMessages(savedMessages);
    };
    loadInitialMessages();
  }, []);

  // Save messages whenever they change
  useEffect(() => {
    MessageHistoryManager.saveMessages(messages);
  }, [messages]);

  const addMessage = useCallback(async (newMessage) => {
    setMessages(prevMessages => [...prevMessages, newMessage]);
  }, []);

  const clearAllMessages = useCallback(async () => {
    await MessageHistoryManager.clearMessages();
    setMessages([]);
  }, []);

  return {
    messages,
    addMessage,
    clearAllMessages
  };
};

export { MessageHistoryManager, useMessageHistory };