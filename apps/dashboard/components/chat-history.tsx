import * as React from "react";

import Link from "next/link";

import { cn } from "@/lib/utils";
import { SidebarList } from "@/components/sidebar-list";
import { buttonVariants } from "@novecirculos/design";
import { IconPlus } from "@/components/ui/icons";

interface ChatHistoryProps {
  userId?: string;
}

export async function ChatHistory({ userId }: ChatHistoryProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4">
        <h4 className="text-sm font-medium dark:text-white">Histórico</h4>
      </div>
      <div className="mb-2 px-2">
        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "h-10 w-full justify-start bg-gray-50 px-4 shadow-none border-gray-800 transition-colors hover:bg-gray-200/40 dark:bg-gray-900 dark:hover:text-white dark:hover:bg-gray-300/10",
          )}
        >
          <IconPlus className="-translate-x-2 stroke-2" />
          Novo chat
        </Link>
      </div>
      <React.Suspense
        fallback={
          <div className="flex flex-col flex-1 px-4 space-y-4 overflow-auto">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="w-full h-6 rounded-md shrink-0 animate-pulse bg-gray-200 dark:bg-gray-800"
              />
            ))}
          </div>
        }
      >
        {/* @ts-ignore */}
        <SidebarList userId={userId} />
      </React.Suspense>
    </div>
  );
}
