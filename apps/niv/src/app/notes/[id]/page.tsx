"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { api } from "~/trpc/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";

const NotePage: React.FC = () => {
  const { id } = useParams();

  const {
    data: note,
    isLoading,
    error,
  } = api.notes.getNote.useQuery(
    { id: id as string },
    {
      enabled: !!id, // Only run the query if id is available
    },
  );

  const [markdownContent, setMarkdownContent] = useState<string | null>(null);
  const [contentLoading, setContentLoading] = useState<boolean>(false);
  const [contentError, setContentError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMarkdown = async () => {
      if (note?.contentUrl) {
        setContentLoading(true);
        try {
          const response = await fetch(note.contentUrl);
          if (!response.ok) {
            throw new Error("Failed to fetch markdown content.");
          }
          const text = await response.text();
          setMarkdownContent(text);
        } catch (err: any) {
          setContentError(err.message || "An error occurred.");
        } finally {
          setContentLoading(false);
        }
      }
    };

    fetchMarkdown();
  }, [note?.contentUrl]);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <p className="text-gray-500">Loading note...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-red-500">Error loading note: {error.message}</p>
      </div>
    );
  }

  if (!note) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-gray-500">Note not found.</p>
      </div>
    );
  }

  return (
    <div className="h-screen w-full overflow-y-auto bg-background p-8">
      <h1 className="mb-4 text-3xl font-bold">{note.title}</h1>

      {contentLoading && <p className="text-gray-500">Loading content...</p>}

      {contentError && (
        <p className="text-red-500">Error loading content: {contentError}</p>
      )}

      {markdownContent && (
        <ReactMarkdown
          className="prose dark:prose-invert"
          remarkPlugins={[remarkGfm]}
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              return !inline && match ? (
                <SyntaxHighlighter
                  style={vscDarkPlus as any}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
        >
          {markdownContent}
        </ReactMarkdown>
      )}
    </div>
  );
};

export default NotePage;
