"use client";

import { useState } from "react";
import { api } from "~/trpc/react";

export function LatestPost() {
  const [latestPost] = api.notes.getLatest.useSuspenseQuery();

  const utils = api.useUtils();
  const [zipFile, setZipFile] = useState<File | null>(null);
  const createNotes = api.notes.create.useMutation({
    onSuccess: async () => {
      await utils.notes.invalidate();
      setZipFile(null);
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles) return;

    const file = selectedFiles[0];
    if (file?.type !== "application/zip") {
      alert("Please select a valid ZIP file.");
      return;
    }

    setZipFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!zipFile) {
      alert("Please select a ZIP file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      const binaryStr = reader.result;
      if (binaryStr instanceof ArrayBuffer) {
        // Convert ArrayBuffer to Base64
        const bytes = new Uint8Array(binaryStr);
        let binary = "";
        bytes.forEach((b) => (binary += String.fromCharCode(b)));
        const base64 = btoa(binary);
        createNotes.mutate({ zipFile: base64 });
      } else {
        alert("Failed to read the ZIP file.");
      }
    };
    reader.onerror = () => {
      alert("Error reading the ZIP file.");
    };
    reader.readAsArrayBuffer(zipFile);
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
          type="file"
          accept=".zip"
          onChange={handleFileChange}
          className="w-full"
          required
        />
        <button
          type="submit"
          className="rounded-full bg-blue-500 px-4 py-2 font-semibold text-white transition hover:bg-blue-600"
          disabled={createNotes.isPending}
        >
          {createNotes.isPending ? "Uploading..." : "Upload ZIP"}
        </button>
      </form>
      {zipFile && (
        <div className="mt-4">
          <h3 className="font-semibold">Selected File:</h3>
          <p className="truncate">{zipFile.name}</p>
        </div>
      )}
    </div>
  );
}
