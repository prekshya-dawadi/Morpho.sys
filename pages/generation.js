import React, { useState } from 'react';

const ProposalGeneration = () => {
  const [message, setMessage] = useState('');
  
  const demoProposal = {
    title: "Project Proposal: Digital Literacy for Rural Women in Nepal",
    submittedTo: "The Asia Foundation",
    date: "January 2, 2025",
    executive_summary: "This 18-month project aims to empower 5,000 rural women in three districts of Nepal through digital literacy training and economic inclusion. Through established partnerships with local organizations and government bodies, the project will create sustainable digital hubs, provide skills training, and facilitate access to digital financial services. The total budget requested is $275,000.",
    sections: [
      {
        title: "1. Organization Background",
        content: "Digital Nepal Network (DNN) is a registered non-profit organization established in 2018, focusing on digital inclusion and technology education. We have successfully implemented similar projects with UNDP and World Bank, reaching 12,000 beneficiaries across Nepal."
      },
      {
        title: "2. Problem Statement",
        content: "In rural Nepal, only 18% of women have access to digital technologies, compared to 45% of men. This digital gender gap significantly impacts women's economic participation and access to essential services. Our baseline survey in target districts shows:\n• 82% of rural women lack basic digital skills\n• 65% have no access to digital financial services\n• 73% are unable to access online government services"
      }
      // Additional sections can be added here
    ]
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Panel - Chat Interface */}
      <div className="w-1/2 flex flex-col p-4">
        <div className="flex items-center mb-6">
          <h1 className="text-xl font-bold">morpho.sys</h1>
          <span className="ml-2 text-gray-500">Asia Foundation Proposal</span>
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

      {/* Right Panel - Proposal Preview */}
      <div className="w-1/2 p-4 bg-white overflow-y-auto">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">{demoProposal.title}</h2>
          <p className="mb-2">Submitted to: {demoProposal.submittedTo}</p>
          <p className="mb-4">Date: {demoProposal.date}</p>
          
          <h3 className="text-xl font-bold mb-2">Executive Summary</h3>
          <p className="mb-6">{demoProposal.executive_summary}</p>
          
          {demoProposal.sections.map((section, index) => (
            <div key={index} className="mb-6">
              <h3 className="text-xl font-bold mb-2">{section.title}</h3>
              <p className="whitespace-pre-line">{section.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProposalGeneration;