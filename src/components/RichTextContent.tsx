'use client';

import { useEffect, useRef } from 'react';

interface RichTextContentProps {
  html: string;
  className?: string;
}

export function RichTextContent({ html, className = '' }: RichTextContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      // Remove &nbsp; e outros espaçamentos excessivos
      const cleanHtml = html
        .replace(/&nbsp;/g, ' ') // Substitui &nbsp; por espaço normal
        .replace(/\s+/g, ' ') // Remove múltiplos espaços
        .replace(/>\s+</g, '><') // Remove espaços entre tags
        .trim();
      
      contentRef.current.innerHTML = cleanHtml;
    }
  }, [html]);

  return (
    <div 
      ref={contentRef} 
      className={`prose prose-lg dark:prose-invert max-w-none ${className}`}
    />
  );
}
