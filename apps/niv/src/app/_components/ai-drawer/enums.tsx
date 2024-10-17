import { createEnum } from "~/enums/createEnum";
import { Button } from "@novecirculos/design";
import React from "react";

interface AssistantStateComponents {
  Configuration: React.ComponentType;
  Chat: React.ComponentType;
  Scenario: React.ComponentType;
}

export const createAssistantStatesEnum = ({
  Configuration,
  Chat,
  Scenario,
}: AssistantStateComponents) =>
  createEnum({
    CONFIGURATION: {
      title: "Configure the Assistant",
      description: "Change your preferences.",
      content: Configuration,
      footer: <Button variant="secondary">Done</Button>,
    },
    CHAT: {
      title: "Chat",
      description: "Start a conversation with the assistant.",
      content: Chat,
      footer: null,
    },
    SCENARIO: {
      title: "Scenario",
      description: "Select a scenario or create a new one",
      content: Scenario,
      footer: <Button variant="secondary">Select</Button>,
    },
  });
