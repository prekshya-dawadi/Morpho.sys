// ProposalGeneration.js
import React, { useState, useCallback, useEffect } from 'react';
import { GripVertical } from 'lucide-react';
import dynamic from 'next/dynamic';
import { debounce } from 'lodash';
import proposalTemplate from '../json/proposal-template.json'; // Adjust path accordingly
import responses from '../json/responses.json'; // Import responses.json

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
  <div className={`mb-4 ${isUser ? 'bg-gray-50' : 'bg-white'} rounded-lg p-4`}>
    <p>{content}</p>
  </div>
);

const ProposalGeneration = () => {
  const [messages, setMessages] = useState([]);
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
    setMessages([
      // { content: "Can you help me write a proposal?", isUser: true },
      // { content: "I'll help you write a proposal. To get started, I need some key details:\n1. What type of proposal?\n2. Target organization/donor?\n3. Project focus area?\n4. Approximate budget and timeline?\n5. Your organization's background?", isUser: false }
    ]);
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

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessages = [...messages, { content: message, isUser: true }];
    
    // Search for a matching response in the responses.json file
    const lowerCaseMessage = message.toLowerCase();
    const response = responses[lowerCaseMessage] || responses["default"];
    
    // Add the response question to the message list
    newMessages.push({
      content: response.question,
      isUser: false
    });

    // If the response has an action, update the proposal data
    if (response.action.type) {
      setProposalData(prev => ({
        ...prev,
        ...response.action
      }));
    }

    setMessages(newMessages);
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
          className="flex flex-col p-4 overflow-hidden transition-[width] duration-75 ease-linear bg-D9DFC6"
          style={{ width: `${splitPosition}%` }}
        >
          <div className="flex items-center mb-6">
            {/* <span className="mr-6 text-2xl font-semibold text-gray-800">Morpho.Sys</span> */}
            <span className="text-gray-500">Asia Foundation Proposal</span>
          </div>
        
        <div className="flex-1 p-6 mb-4 overflow-y-auto">
          {messages.map((msg, index) => (
            <Message key={index} {...msg} />
          ))}        
        
        <form onSubmit={handleMessageSubmit} className="relative">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="I want to write a grant proposal..."
            className="w-full p-4 pr-12 rounded-lg border border-gray-300 focus:outline-none focus:border-gray-400"
          />
          <button type="submit" className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
            ↑
          </button>
        </form>
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
