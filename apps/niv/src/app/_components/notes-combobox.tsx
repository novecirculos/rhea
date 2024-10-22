"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@novecirculos/design";
import { Button } from "@novecirculos/design";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@novecirculos/design";
import { Popover, PopoverContent, PopoverTrigger } from "@novecirculos/design";
import { api } from "~/trpc/react";

export function NotesCombobox({
  onSelect,
}: {
  onSelect: (value: { id: string; title: string }) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const { data: notes, isLoading, error } = api.notes.getUserNotes.useQuery();

  if (isLoading) return <div>Loading notes...</div>;
  if (error) return <div>Error loading notes: {error.message}</div>;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between"
        >
          {value
            ? notes?.find((note) => note.id === value)?.title
            : "Select note..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput placeholder="Search notes..." />
          <CommandList>
            <CommandEmpty>No notes found.</CommandEmpty>
            <CommandGroup>
              {notes?.map((note) => (
                <CommandItem
                  key={note.id}
                  value={note.id}
                  onSelect={() => {
                    setValue(note.id);
                    onSelect({ id: note.id, title: note.title || "Untitled" });
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === note.id ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {note.title || "Untitled"}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
