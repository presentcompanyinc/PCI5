'use client';

/**
 * CodeBlock - Display code snippets with copy functionality
 */

import { useState } from 'react';

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
}

export function CodeBlock({ code, language = 'tsx', title }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-black border-2 border-black mt-4">
      {/* Header */}
      <div className="bg-[#f2efea] border-b-2 border-black p-2 flex justify-between items-center">
        <span className="font-pci-sans-bold text-xs">
          {title || `${language.toUpperCase()} Code`}
        </span>
        <button
          onClick={handleCopy}
          className="px-2 py-1 bg-white border-2 border-black font-pci-sans-bold text-xs hover:bg-[#03bed8] transition-colors"
        >
          {copied ? '✓ Copied!' : 'Copy'}
        </button>
      </div>

      {/* Code Content */}
      <pre className="p-4 overflow-x-auto">
        <code className="text-white text-sm font-mono">
          {code}
        </code>
      </pre>
    </div>
  );
}

