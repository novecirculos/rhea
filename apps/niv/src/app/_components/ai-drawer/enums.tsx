import { createEnum } from "~/enums/createEnum";
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
    },
    CHAT: {
      title: "Chat",
      description: "Start a conversation with the assistant.",
      content: Chat,
    },
    SCENARIO: {
      title: "Scenario",
      description: "Create a new scenario.",
      content: Scenario,
    },
  });
