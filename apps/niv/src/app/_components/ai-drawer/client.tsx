"use client";
import React, { useState, useLayoutEffect } from "react";

import {
  Button,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  Label,
  Textarea,
} from "@novecirculos/design";
import { X } from "lucide-react";
import { createAssistantStatesEnum } from "./enums";

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

const Chat = () => <div>Chat content</div>;

const Scenario = () => <div>Scenario content</div>;

const AssistantStates = createAssistantStatesEnum({
  Configuration,
  Chat,
  Scenario,
});

const AiDrawerTitle = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <DrawerHeader className="flex justify-between">
    <div className="text-left">
      <DrawerTitle>{title}</DrawerTitle>
      <DrawerDescription>{description}</DrawerDescription>
    </div>
    <DrawerClose asChild>
      <Button variant="link">
        <X />
      </Button>
    </DrawerClose>
  </DrawerHeader>
);

export function AiDrawerContent() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentAssistantState, setCurrentAssistantState] = useState(
    AssistantStates.CHAT,
  );

  useLayoutEffect(() => {
    setIsOpen(true);
  }, []);

  const { content: Content, footer: Footer } = currentAssistantState;

  return (
    <Drawer direction="right" alwaysOpen open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button className="absolute right-2 top-8" variant="outline">
          Open chat
        </Button>
      </DrawerTrigger>
      <DrawerContent
        noOverlay
        className="left-auto h-full w-screen min-w-[50%] sm:w-max"
      >
        <div className="mx-auto flex h-full w-full flex-col">
          <AiDrawerTitle
            title={currentAssistantState.title}
            description={currentAssistantState.description}
          />
          <div className="flex-grow overflow-y-auto p-4">
            <Content />
          </div>
          <DrawerFooter>
            <Footer />
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
