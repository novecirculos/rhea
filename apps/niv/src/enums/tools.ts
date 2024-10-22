import { z } from "zod";
import { roll_dice } from "@novecirculos/dice";

type ToolDefinition<T extends z.ZodType> = {
  description: string;
  parameters: T;
  execute: (params: z.infer<T>) => Promise<any>;
};

export const tools: Record<string, ToolDefinition<any>> = {
  rollDice: {
    description: "Roll a dice",
    parameters: z.object({
      sides: z.number(),
      times: z.number().optional(),
    }),
    execute: async ({ sides, times }: { sides: number; times?: number }) => {
      try {
        const roll = roll_dice({ sides, times: times || 1 });
        return roll;
      } catch (error) {
        console.error("Error executing rollDice:", error);
        throw new Error("Failed to roll dice.");
      }
    },
  },
  getWeather: {
    description: "Get the current weather at a location",
    parameters: z.object({
      latitude: z.number(),
      longitude: z.number(),
    }),
    execute: async ({
      latitude,
      longitude,
    }: {
      latitude: number;
      longitude: number;
    }) => {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m&hourly=temperature_2m&daily=sunrise,sunset&timezone=auto`,
      );

      const weatherData = await response.json();
      return weatherData;
    },
  },
};

export const toolsNames = Object.keys(tools) as Array<keyof typeof tools>;
