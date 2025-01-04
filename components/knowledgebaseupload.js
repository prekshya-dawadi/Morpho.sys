import React, { useState, useRef } from 'react';
import { Upload, Plus, Link, X } from 'lucide-react';

const KnowledgeBaseUpload = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [url, setUrl] = useState('');
  const fileInputRef = useRef(null);
  
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log('File selected:', file.name);
    }
  };

  const handleUrlSubmit = (e) => {
    e.preventDefault();
    if (url) {
      console.log('URL submitted:', url);
      setUrl('');
    }
  };

  return (
    <div className="relative">
      {/* Main circular button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center
                   hover:shadow-md transition-all duration-300 border border-gray-200"
      >
        <Upload className="w-4 h-4 text-gray-600" />
      </button>

      {/* Expanded panel */}
      {isExpanded && (
        <div className="absolute bottom-14 left-0 bg-white rounded-lg shadow-xl p-4 w-72
                        border border-gray-200 transform transition-all duration-300">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-medium text-gray-700">Update Knowledge Base</h3>
            <button 
              onClick={() => setIsExpanded(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="mb-4">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full p-3 border-2 border-dashed border-gray-200 rounded-lg
                        hover:border-gray-300 transition-colors duration-200
                        flex items-center justify-center gap-2 group"
            >
              <Plus className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
              <span className="text-sm text-gray-500 group-hover:text-gray-700">Upload PDF</span>
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".pdf"
              className="hidden"
            />
          </div>

          <form onSubmit={handleUrlSubmit} className="relative">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter URL"
              className="w-full p-2 pr-10 border border-gray-200 rounded-lg text-sm
                        focus:outline-none focus:border-gray-300"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2
                        text-gray-400 hover:text-gray-600"
            >
              <Link className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default KnowledgeBaseUpload;