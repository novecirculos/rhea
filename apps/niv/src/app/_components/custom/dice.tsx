import { cn } from "~/lib/utils";
import { NumberTicker } from "./number-ticker";

type RollDiceProps = {
  result?: number[];
  sides?: number;
  times?: number;
};

export const RollDice = ({ result, sides = 6, times = 1 }: RollDiceProps) => {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {result
        ? result.map((value, index) => (
            <div
              key={index}
              className={cn(
                "w-14 rounded-md bg-foreground px-4 py-2 text-center text-xl font-semibold text-background shadow-md",
                {
                  "text-primary": value === sides,
                },
              )}
            >
              <NumberTicker value={value} loop={false} />
            </div>
          ))
        : Array.from({ length: times }).map((_, index) => (
            <div
              key={index}
              className="w-14 rounded-md bg-foreground px-4 py-2 text-center text-xl font-semibold text-background shadow-md"
            >
              <NumberTicker value={sides} loop={true} />
            </div>
          ))}
    </div>
  );
};
