"use client";

import React, { useState, useLayoutEffect } from "react";
import {
  Button,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  Label,
  Textarea,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
  Input,
  ToggleGroup,
  ToggleGroupItem,
} from "@novecirculos/design";
import { Plus, Sparkles, X } from "lucide-react";
import { createAssistantStatesEnum } from "./enums";
import { Chat as AssistantChat } from "../custom/chat";
import { generateUUID } from "~/lib/utils";
import { AVAILABLE_TOOLS } from "~/enums/tools.client";
import { NotesCombobox } from "../notes-combobox";
import { useForm, Controller } from "react-hook-form";

const Configuration = () => (
  <form className="flex flex-col gap-2">
    <div>
      <Label className="text-base">What are you writing about?</Label>
      <Textarea />
    </div>
    <div>
      <Label className="text-base">
        What would you like Niv to know about you to provide better responses?
      </Label>
      <Textarea />
    </div>
  </form>
);

const Chat = () => {
  const id = generateUUID();
  return <AssistantChat id={id} initialMessages={[]} />;
};

const Scenario = () => {
  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      title: "",
      system: "",
      tools: [],
      notes: [] as Array<{ id: string; title: string }>,
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const selectedNotes = watch("notes");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="space-y-2">
        <Label className="text-base">Title of the scenario</Label>
        <Controller
          name="title"
          control={control}
          render={({ field }) => <Input required {...field} />}
        />
      </div>
      <div className="space-y-2">
        <Label className="text-base">
          What is this scenario about? These details will be core instructions
          for the assistant (system prompt).
        </Label>
        <Controller
          name="system"
          control={control}
          render={({ field }) => <Textarea required {...field} />}
        />
      </div>
      <div className="space-y-2">
        <Label className="text-base">
          What tools should be available for the assistant to use in this
          scenario?
        </Label>
        <Controller
          name="tools"
          control={control}
          render={({ field }) => (
            <ToggleGroup
              type="multiple"
              className="justify-start"
              value={field.value}
              onValueChange={field.onChange}
            >
              {Object.values(AVAILABLE_TOOLS).map(({ label, value }) => (
                <ToggleGroupItem key={value} value={value}>
                  {label}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          )}
        />
      </div>
      <div className="flex flex-col space-y-2">
        <Label className="text-base">
          What notes you want to embed for the assistant to use in this
          scenario?
        </Label>
        <Controller
          name="notes"
          control={control}
          render={({ field }) => (
            <NotesCombobox
              onSelect={(value) => {
                const updatedNotes = field.value.some(
                  (note) => note.id === value.id,
                )
                  ? field.value.filter((note) => note.id !== value.id)
                  : [...field.value, value];
                field.onChange(updatedNotes);
              }}
            />
          )}
        />
        {!!selectedNotes.length && (
          <div className="mt-2">
            <Label className="text-sm">Selected Notes:</Label>
            <ul className="list-inside list-disc">
              {selectedNotes.map((note) => (
                <li key={note.id}>{note.title}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <Button type="submit">Create Scenario</Button>
    </form>
  );
};

const AssistantStates = createAssistantStatesEnum({
  Configuration,
  Chat,
  Scenario,
});

const AiDrawerTitle = ({
  title,
  description,
  setCurrentAssistantState,
}: {
  title: string;
  description: string;
  setCurrentAssistantState: (state: any) => void;
}) => (
  <DrawerHeader className="flex justify-between">
    <div className="text-left">
      <DrawerTitle>{title}</DrawerTitle>
      <DrawerDescription>{description}</DrawerDescription>
    </div>
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="sm" variant="outline">
            <Plus />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={() => setCurrentAssistantState(AssistantStates.CHAT)}
            className="hover:cursor-pointer"
          >
            New Chat
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setCurrentAssistantState(AssistantStates.SCENARIO)}
            className="hover:cursor-pointer"
          >
            New Scenario
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DrawerClose asChild>
        <Button variant="link">
          <X />
        </Button>
      </DrawerClose>
    </div>
  </DrawerHeader>
);

export function AiDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentAssistantState, setCurrentAssistantState] = useState(
    AssistantStates.CHAT,
  );

  useLayoutEffect(() => {
    setIsOpen(true);
  }, []);

  const { content: Content } = currentAssistantState;

  return (
    <Drawer direction="right" alwaysOpen open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button className="absolute right-2 top-3" variant="outline">
          <Sparkles size={20} />
        </Button>
      </DrawerTrigger>
      <DrawerContent
        noOverlay
        className="left-auto h-full w-screen min-w-[50%] !select-auto sm:w-max"
      >
        <div className="mx-auto flex h-full w-full flex-col">
          <AiDrawerTitle
            setCurrentAssistantState={setCurrentAssistantState}
            title={currentAssistantState.title}
            description={currentAssistantState.description}
          />
          <div className="flex-grow overflow-y-auto p-4">
            <Content />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
