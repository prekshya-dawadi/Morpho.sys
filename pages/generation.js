import React, { useState, useCallback } from 'react';
import { GripVertical } from 'lucide-react';

const ProposalGeneration = () => {
  const [message, setMessage] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [splitPosition, setSplitPosition] = useState(50); // Default 50%
  
  // Handle mouse down on divider
  const handleMouseDown = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  // Handle mouse move for dragging
  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;
    
    const container = e.currentTarget;
    const containerRect = container.getBoundingClientRect();
    const newPosition = ((e.clientX - containerRect.left) / containerRect.width) * 100;
    
    // Limit the split position between 20% and 80%
    const limitedPosition = Math.min(Math.max(newPosition, 20), 80);
    setSplitPosition(limitedPosition);
  }, [isDragging]);

  // Handle mouse up to stop dragging
  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const demoProposal = {
    title: "Project Proposal: Digital Literacy for Rural Women in Nepal",
    submittedTo: "The Asia Foundation",
    date: "January 2, 2025",
    executive_summary: "This 18-month project aims to empower 5,000 rural women in three districts of Nepal through digital literacy training and economic inclusion. Through established partnerships with local organizations and government bodies, the project will create sustainable digital hubs, provide skills training, and facilitate access to digital financial services. The total budget requested is $275,000."
  };

  return (
    <div 
      className="flex h-screen relative"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Left Panel - Chat Interface */}
      <div 
        className="flex flex-col p-4 overflow-hidden"
        style={{ width: `${splitPosition}%` }}
      >
        <div className="flex items-center mb-6">
          <span className="mr-6 text-2xl font-semibold text-gray-800">Morpho.Sys</span>
          <span className="text-gray-500">Asia Foundation Proposal</span>
        </div>
        
        <div className="flex-1 bg-white rounded-lg shadow-md p-6 mb-4 overflow-y-auto">
          <div className="mb-4 bg-gray-50 rounded-lg p-4">
            <p>Can you help me write a proposal?</p>
          </div>
          
          <div className="mb-4 bg-white rounded-lg p-4">
            <p>I'll help you write a proposal. To get started, I need some key details:</p>
            <ol className="mt-2 ml-6 list-decimal">
              <li>What type of proposal? (grant, project, research, etc.)</li>
              <li>Target organization/donor?</li>
              <li>Project focus area?</li>
              <li>Approximate budget and timeline?</li>
              <li>Your organization's background?</li>
            </ol>
            <p className="mt-2">Once you provide these details, I can help craft a tailored proposal.</p>
          </div>
        </div>
        
        <div className="relative">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="I want to write a grant proposal..."
            className="w-full p-4 pr-12 rounded-lg border border-gray-300 focus:outline-none focus:border-gray-400"
          />
          <button className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
            ↑
          </button>
        </div>
      </div>

      {/* Draggable Divider */}
      <div
        className={`absolute top-0 cursor-col-resize select-none h-full w-6 transform -translate-x-1/2 group
          ${isDragging ? 'z-50' : 'z-40'}`}
        style={{ left: `${splitPosition}%` }}
        onMouseDown={handleMouseDown}
      >
        <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 p-2 rounded-full 
          bg-white shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
          <GripVertical className="w-4 h-4 text-gray-500" />
        </div>
        <div className="absolute left-1/2 w-px h-full bg-gray-200 transform -translate-x-1/2" />
      </div>

      {/* Right Panel - Proposal Preview */}
      <div 
        className="p-4 bg-white overflow-y-auto"
        style={{ width: `${100 - splitPosition}%` }}
      >
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">{demoProposal.title}</h2>
          <p className="mb-2">Submitted to: {demoProposal.submittedTo}</p>
          <p className="mb-4">Date: {demoProposal.date}</p>
          
          <h3 className="text-xl font-bold mb-2">Executive Summary</h3>
          <p className="mb-6">{demoProposal.executive_summary}</p>
        </div>
      </div>
    </div>
  );
};

export default ProposalGeneration;  