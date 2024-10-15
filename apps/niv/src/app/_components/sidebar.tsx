"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { api } from "~/trpc/react";
import { File, Folder, Tree } from "./file-tree";

import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  ScrollArea,
} from "@novecirculos/design";
import { Skeleton } from "@novecirculos/design";
import { useParams } from "next/navigation";
import { Cog } from "lucide-react";
import { useRouter } from "next/navigation";

interface Note {
  id: string;
  title: string | null;
  folder: string | null;
  contentUrl: string | null;
  createdAt: Date;
  userId: string;
  updatedAt: Date | null;
}

type TreeViewElement = {
  id: string;
  name: string;
  isSelectable?: boolean;
  children?: TreeViewElement[];
};

const renderTreeNodes = (elements: TreeViewElement[]) => {
  return elements.map((element) => {
    if (element.children && element.children.length > 0) {
      return (
        <Folder key={element.id} element={element.name} value={element.id}>
          {renderTreeNodes(element.children)}
        </Folder>
      );
    } else {
      return (
        <File key={element.id} value={element.id}>
          <Link className="truncate text-left" href={`/notes/${element.id}`}>
            {element.name}
          </Link>
        </File>
      );
    }
  });
};

export const Sidebar: React.FC = () => {
  const { data: notes, isLoading, error } = api.notes.getUserNotes.useQuery();

  const buildElements = (notes: Note[]): TreeViewElement[] => {
    const root: { [key: string]: TreeViewElement } = {};

    notes.forEach((note) => {
      const path = note.folder
        ? note.folder.split("/").map((part) => part.trim())
        : ["Root"];
      let currentLevel = root;

      path.forEach((part, index) => {
        if (!currentLevel[part]) {
          const id = `folder-${part}-${index}-${Math.random().toString(36).substr(2, 9)}`;
          currentLevel[part] = {
            id,
            name: part,
            isSelectable: false,
            children: [],
          };
        }

        if (index === path.length - 1) {
          currentLevel[part].children!.push({
            id: note.id,
            name: note.title || "Untitled",
            isSelectable: true,
          });
        } else {
          const nextPart = path[index + 1];
          let nextLevel = currentLevel[part].children!.find(
            (child) => child.name === nextPart,
          );

          if (!nextLevel) {
            const id = `folder-${nextPart}-${index + 1}-${Math.random()
              .toString(36)
              .substr(2, 9)}`;
            nextLevel = {
              id,
              name: nextPart as string,
              isSelectable: false,
              children: [],
            };
            currentLevel[part].children!.push(nextLevel);
          }

          currentLevel = { [nextPart as string]: nextLevel };
        }
      });
    });

    return Object.values(root);
  };

  const ELEMENTS = useMemo(() => {
    if (!notes) return [];
    return buildElements(notes);
  }, [notes]);

  const { id } = useParams();

  const router = useRouter();

  const deleteNotes = api.notes.deleteAllNotes.useMutation({
    onSuccess: () => {
      router.push("/");
    },
  });

  return (
    <aside className="h-screen min-w-[16rem] max-w-[16rem] border-r bg-background">
      <ScrollArea className="relative h-full">
        <div className="p-4">
          <h2 className="mb-4 text-xl font-bold">Your Notes</h2>

          {isLoading && (
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          )}

          {error && (
            <div className="px-4 py-2 text-destructive">
              Error loading notes. Please try again later.
            </div>
          )}

          {!isLoading && !error && ELEMENTS.length === 0 && (
            <div className="px-4 py-2 text-muted-foreground">
              No notes available.
            </div>
          )}

          {!isLoading && !error && ELEMENTS.length > 0 && (
            <Tree initialSelectedId={id as string} elements={ELEMENTS}>
              {renderTreeNodes(ELEMENTS)}
            </Tree>
          )}
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              className="absolute bottom-2 left-2"
              size="icon"
              variant="outline"
            >
              <Cog />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <h2>Settings</h2>
            </DialogHeader>
            <Button onClick={() => deleteNotes.mutate()}>
              Delete all notes
            </Button>
          </DialogContent>
        </Dialog>
      </ScrollArea>
    </aside>
  );
};
