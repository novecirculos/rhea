// apps/niv/src/app/_components/post.tsx

"use client";

import { useState } from "react";
import { api } from "~/trpc/react";

export function LatestPost() {
  // Fetch the latest post if needed
  const [latestPost] = api.notes.getLatest.useSuspenseQuery();

  const utils = api.useContext();
  const [title, setTitle] = useState("");
  const [fileContent, setFileContent] = useState<string | null>(null);
  const createNote = api.notes.create.useMutation({
    onSuccess: async () => {
      await utils.notes.invalidate();
      setTitle("");
      setFileContent(null);
    },
  });

  // Handle file selection and read content
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== "text/markdown" && !file.name.endsWith(".md")) {
        alert("Please select a markdown (.md) file");
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        setFileContent(content);
      };
      reader.readAsText(file);
    } else {
      setFileContent(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fileContent) {
      alert("Please select a markdown file");
      return;
    }
    createNote.mutate({ title, content: fileContent });
  };

  return (
    <div className="w-full max-w-xs">
      {latestPost ? (
        <p className="truncate">Your most recent post: {latestPost.title}</p>
      ) : (
        <p>You have no posts yet.</p>
      )}
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-full px-4 py-2 text-black"
          required
        />
        <input
          type="file"
          accept=".md,text/markdown"
          onChange={handleFileChange}
          className="w-full"
          required
        />
        <button
          type="submit"
          className="rounded-full bg-blue-500 px-4 py-2 font-semibold text-white transition hover:bg-blue-600"
          disabled={createNote.isPending}
        >
          {createNote.isPending ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
