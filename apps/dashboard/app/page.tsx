"use client";

import init, { roll_multiple_dices } from "@novecirculos/dice_roller";
import Chat from "./chat/page";

import { useQuery } from "@tanstack/react-query";
import { replacer } from "@/lib/utils";

export default function IndexPage() {
  const { data: rolls } = useQuery({
    queryKey: ["rolls"],
    queryFn: async () => {
      await init();

      const result = await roll_multiple_dices([
        { sides: 20, times: 4, identifier: "trait_rolls", uniqueness: true },
        { sides: 20, times: 4, identifier: "physical_rolls", uniqueness: true },
        {
          sides: 4,
          times: 4,
          identifier: "personality_column_rolls",
          uniqueness: true,
        },
        {
          sides: 4,
          times: 4,
          identifier: "physical_column_rolls",
          uniqueness: true,
        },
      ]);

      return JSON.stringify(result, replacer);
    },
  });

  return rolls ? <Chat rolls={rolls} /> : null;
}
