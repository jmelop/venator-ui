'use client';

import { useState } from 'react';

export interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  className?: string;
}

export function CodeBlock({ code, language = 'tsx', filename, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className={`relative ${className ?? ''}`.trim()}>
      {filename && (
        <div className="bg-neutral-800 px-4 py-2 text-xs text-neutral-400 rounded-t-lg border-b border-neutral-700">
          {filename}
        </div>
      )}
      <pre
        className={[
          'bg-neutral-900 text-neutral-100 overflow-x-auto text-sm font-mono p-4',
          filename ? 'rounded-b-lg' : 'rounded-lg',
        ].join(' ')}
      >
        <code className={`language-${language}`}>{code}</code>
      </pre>
      <button
        onClick={handleCopy}
        aria-label={copied ? 'Copied' : 'Copy to clipboard'}
        className="absolute top-2 right-2 p-1.5 rounded text-neutral-400 hover:text-neutral-100 hover:bg-neutral-700 transition-colors"
      >
        {copied ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
        )}
      </button>
    </div>
  );
}
