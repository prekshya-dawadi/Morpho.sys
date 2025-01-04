import React, { useState, useCallback, useEffect } from 'react';
import { GripVertical, MessageCircle } from 'lucide-react';
import dynamic from 'next/dynamic';
import { debounce } from 'lodash';
import proposalTemplate from '../json/dummy_proposal_response.json';
import responses from '../json/responses.json';
import KnowledgeBaseUpload from '../components/knowledgebaseupload';

// Custom hook for message management
const useMessageHistory = () => {
  const [messages, setMessages] = useState([]); // Initialize with empty array

  useEffect(() => {
    const loadInitialMessages = async () => {
      try {
        const response = await fetch('/api/messages');
        const data = await response.json();
        // Ensure we always set an array
        setMessages(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error loading messages:', error);
        setMessages([]); // Reset to empty array on error
      }
    };
    loadInitialMessages();
  }, []);

  useEffect(() => {
    const saveMessages = async () => {
      try {
        // Ensure we're only saving arrays
        const messageArray = Array.isArray(messages) ? messages : [];
        await fetch('/api/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(messageArray),
        });
      } catch (error) {
        console.error('Error saving messages:', error);
      }
    };
    
    // Only save if we have messages to save
    if (messages.length > 0) {
      saveMessages();
    }
  }, [messages]);

  const addMessage = useCallback(async (newMessage) => {
    setMessages(prevMessages => {
      // Ensure we're working with an array
      const currentMessages = Array.isArray(prevMessages) ? prevMessages : [];
      return [...currentMessages, newMessage];
    });
  }, []);

  const clearAllMessages = useCallback(async () => {
    try {
      await fetch('/api/messages', { method: 'DELETE' });
      setMessages([]); // Reset to empty array
    } catch (error) {
      console.error('Error clearing messages:', error);
    }
  }, []);

  return {
    // Ensure we never return undefined or null
    messages: Array.isArray(messages) ? messages : [],
    addMessage,
    clearAllMessages
  };
};

const PDFContent = dynamic(
  () => import('../components/PDFContent'),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center">
        Loading PDF viewer...
      </div>
    )
  }
);

const Message = ({ content, isUser }) => (
  <div className={`mb-4 ${isUser ? 'bg-gray-100' : 'bg-white'} rounded-2xl p-4 shadow-sm max-w-[85%] ${isUser ? 'ml-auto' : ''}`}>
    <p className="text-gray-800">{content}</p>
  </div>
);

const ProposalGeneration = () => {
  const { messages, addMessage, clearAllMessages } = useMessageHistory();
  const [message, setMessage] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [splitPosition, setSplitPosition] = useState(50);
  const [pdfKey, setPdfKey] = useState(0);
  const [proposalData, setProposalData] = useState(null);

  const debouncedPDFUpdate = useCallback(
    debounce(() => {
      setPdfKey(prev => prev + 1);
    }, 100),
    []
  );

  useEffect(() => {
    setProposalData(proposalTemplate);
  }, []);

  useEffect(() => {
    if (!isDragging) {
      debouncedPDFUpdate();
    }
  }, [isDragging, debouncedPDFUpdate]);

  const handleMouseDown = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;
    
    const container = e.currentTarget;
    const containerRect = container.getBoundingClientRect();
    const newPosition = ((e.clientX - containerRect.left) / containerRect.width) * 100;
    const limitedPosition = Math.min(Math.max(newPosition, 20), 80);
    
    requestAnimationFrame(() => {
      setSplitPosition(limitedPosition);
    });
  }, [isDragging]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Add user message
    const userMessage = { content: message, isUser: true };
    await addMessage(userMessage);
    
    const lowerCaseMessage = message.toLowerCase();
    const response = responses[lowerCaseMessage] || responses["default"];
    
    // Add bot response
    const botMessage = {
      content: response.question,
      isUser: false
    };
    await addMessage(botMessage);

    if (response.action.type) {
      setProposalData(prev => ({
        ...prev,
        ...response.action
      }));
    }

    setMessage('');
  };

  if (!proposalData) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        Loading proposal data...
      </div>
    );
  }

  return (
    <div 
      className="flex h-screen relative select-none"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div 
        className="flex flex-col overflow-hidden transition-[width] duration-75 ease-linear bg-gray-50"
        style={{ width: `${splitPosition}%` }}
      >
        <div className="border-b bg-white p-6">
  <div className="flex items-center justify-between">
    <img src="/morphosys.png" alt="Morpho.sys logo" className="w-auto h-12" />
    <div className="flex items-center gap-4">
      <button
        onClick={clearAllMessages}
        className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
      >
        Clear History
      </button>
      <div className="flex items-center gap-3">
        <MessageCircle className="h-5 w-5 text-gray-600" />
        <span className="text-gray-600">Asia Foundation Proposal</span>
      </div>
    </div>
  </div>
</div>

        <div className="flex-1 flex flex-col p-6 overflow-hidden">
          <div className="flex-1 overflow-y-auto mb-6 space-y-4">
            {Array.isArray(messages) && messages.map((msg, index) => (
              <Message key={index} {...msg} />
            ))}
          </div>

          <div className="mt-auto">
            <form onSubmit={handleMessageSubmit} className="relative flex items-center gap-3">
              <KnowledgeBaseUpload />
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="I want to write a grant proposal..."
                  className="w-full p-4 pr-12 rounded-2xl border border-gray-200 focus:outline-none focus:border-gray-300 bg-white shadow-sm"
                />
                <button 
                  type="submit" 
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <span className="text-gray-600">↑</span>
                </button>
              </div>
            </form>    
            
            {/* <button
              onClick={clearAllMessages}
              className="mt-4 px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
            >
              Clear History
            </button> */}
          </div>
        </div>
      </div>

      <div
        className={`absolute top-0 cursor-col-resize select-none h-full w-6 transform -translate-x-1/2 group 
          ${isDragging ? 'z-50' : 'z-40'}`}
        style={{ 
          left: `${splitPosition}%`,
          transition: isDragging ? 'none' : 'left 75ms linear'
        }}
        onMouseDown={handleMouseDown}
      >
        <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 p-2 rounded-full 
          bg-white shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
          <GripVertical className="w-4 h-4 text-gray-500" />
        </div>
        <div className="absolute left-1/2 w-px h-full bg-gray-200 transform -translate-x-1/2" />
      </div>

      <div 
        className="bg-white overflow-hidden transition-[width] duration-75 ease-linear"
        style={{ width: `${100 - splitPosition}%` }}
      >
        {!isDragging && <PDFContent key={pdfKey} proposal={proposalData} />}
        {isDragging && (
          <div className="w-full h-full flex items-center justify-center bg-gray-50">
            <span className="text-gray-500">Release to update PDF view</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProposalGeneration;