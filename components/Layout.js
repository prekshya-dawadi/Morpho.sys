import React, { useState } from 'react';
import Link from 'next/link';
import { Settings, ChevronLeft, ChevronRight, Home, FileText } from 'lucide-react';

export default function Layout({ children }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="min-h-screen flex">
      {/* Auto-hiding Sidebar */}
      <div 
        className={`fixed left-0 top-0 h-full bg-white shadow-lg transition-all duration-300 ease-in-out flex flex-col z-50
          ${isExpanded ? 'w-64' : 'w-16'}`}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        <div className="p-4 flex items-center justify-between border-b">
          {isExpanded ? (
            <>
              <span className="text-lg font-semibold">Menu</span>
              <ChevronLeft className="w-5 h-5 text-gray-500" />
            </>
          ) : (
            <ChevronRight className="w-5 h-5 text-gray-500" />
          )}
        </div>

        <nav className="flex-1 py-4">
          <ul className="space-y-2">
            <li>
              <Link href="/" className={`flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100
                ${isExpanded ? 'space-x-3' : 'justify-center'}`}>
                <Home className="w-5 h-5" />
                {isExpanded && <span>Home</span>}
              </Link>
            </li>
            <li>
              <Link href="/generation" className={`flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100
                ${isExpanded ? 'space-x-3' : 'justify-center'}`}>
                <FileText className="w-5 h-5" />
                {isExpanded && <span>Generation</span>}
              </Link>
            </li>
            <li>
              <Link href="/settings" className={`flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100
                ${isExpanded ? 'space-x-3' : 'justify-center'}`}>
                <Settings className="w-5 h-5"  />
                {isExpanded && <span>Settings</span>}
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content Wrapper */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isExpanded ? 'ml-64' : 'ml-16'}`}>
        {/* Main content area that takes up remaining vertical space */}
        <main className="flex-grow bg-gray-50">
          {children}
        </main>

        {/* Minimal footer */}
        <footer className="w-full bg-white border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <p className="text-sm text-gray-500">© 2025 morpho.sys. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}