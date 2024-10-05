"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { api } from "~/trpc/react";

interface Note {
  id: string;
  title: string | null;
  folder: string | null;
  contentUrl: string | null;
  createdAt: Date;
  userId: string;
  updatedAt: Date | null;
}

interface FolderNode {
  name: string;
  children: { [key: string]: FolderNode };
  notes: Note[];
}

interface FolderProps {
  node: FolderNode;
  level: number;
}

const Folder: React.FC<FolderProps> = ({ node, level }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(node.name === "Root");

  const hasChildren = Object.keys(node.children).length > 0;
  const hasNotes = node.notes.length > 0;

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      {node.name !== "Root" && (
        <div
          className={`flex cursor-pointer items-center justify-between px-2 py-1 hover:bg-gray-700`}
          style={{ paddingLeft: `${level * 16}px` }}
          onClick={toggleExpand}
        >
          <span>{node.name}</span>
          {(hasChildren || hasNotes) && <span>{isExpanded ? "▲" : "▼"}</span>}
        </div>
      )}

      {isExpanded && hasNotes && (
        <ul>
          {node.notes.map((note) => (
            <li
              key={note.id}
              className="px-4 py-1 hover:bg-gray-600"
              style={{ paddingLeft: `${(level + 1) * 16}px` }}
            >
              <Link href={`/notes/${note.id}`}>{note.title}</Link>
            </li>
          ))}
        </ul>
      )}

      {isExpanded && hasChildren && (
        <div>
          {Object.values(node.children).map((child) => (
            <Folder key={child.name} node={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

const buildFolderTree = (notes: Note[]) => {
  const root: FolderNode = { name: "Root", children: {}, notes: [] };

  notes.forEach((note) => {
    if (note.folder) {
      const path = note.folder.split("/").map((part) => part.trim());
      let currentNode = root;

      path.forEach((part) => {
        if (!currentNode.children[part]) {
          currentNode.children[part] = { name: part, children: {}, notes: [] };
        }
        currentNode = currentNode.children[part];
      });

      currentNode.notes.push(note);
    } else {
      root.notes.push(note);
    }
  });

  return root;
};

export const Sidebar: React.FC = () => {
  const { data: notes, isLoading, error } = api.notes.getUserNotes.useQuery();

  const folderTree = useMemo<FolderNode>(() => {
    if (!notes) return { name: "Root", children: {}, notes: [] };
    return buildFolderTree(notes);
  }, [notes]);

  return (
    <aside className="fixed h-screen w-64 overflow-y-auto bg-gray-800 text-white">
      <h2 className="mb-4 p-4 text-xl font-bold">Your Notes</h2>

      {isLoading && (
        <div className="px-4 py-2 text-gray-300">Loading notes...</div>
      )}

      {error && (
        <div className="px-4 py-2 text-red-500">
          Error loading notes. Please try again later.
        </div>
      )}

      {!isLoading && !error && (
        <div>
          {folderTree.notes.length === 0 &&
          Object.keys(folderTree.children).length === 0 ? (
            <div className="px-4 py-2 text-gray-300">No notes available.</div>
          ) : (
            <Folder node={folderTree} level={0} />
          )}
        </div>
      )}

      {!isLoading && !error && notes && notes.length === 0 && (
        <div className="px-4 py-2 text-gray-300">No notes available.</div>
      )}
    </aside>
  );
};
