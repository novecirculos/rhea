import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { auth } from "@/auth";
import { Button, ThemeSwitcher } from "@novecirculos/design";
import { Sidebar } from "@/components/sidebar";
import { SidebarList } from "@/components/sidebar-list";
import { IconBrandRed, IconSeparator } from "@/components/ui/icons";

import { UserMenu } from "@/components/user-menu";

export async function Header() {
  const session = await auth();

  return (
    <header className="from-background/10 via-background/50 dark:from-foreground sticky top-0 z-50 flex h-16 w-full shrink-0 items-center justify-between border-b bg-gradient-to-b to-white/80 px-4 backdrop-blur-xl dark:border-gray-800 dark:to-gray-950">
      <div className="flex items-center">
        {session?.user ? (
          <div className="mt-1 flex items-center gap-4">
            <UserMenu user={session.user} />
            <Link
              href="/dataset"
              className="text-muted-foreground text-xs font-medium hover:underline dark:text-gray-50"
            >
              Dataset
            </Link>
            <Link
              href="/scenes"
              className="text-muted-foreground text-xs font-medium hover:underline dark:text-gray-50"
            >
              Cenas
            </Link>
            <Link
              href="/chat"
              className="text-muted-foreground text-xs font-medium hover:underline dark:text-gray-50"
            >
              Chat
            </Link>
            <Link
              href="/"
              className="text-muted-foreground text-xs font-medium hover:underline dark:text-gray-50"
            >
              Transcrições
            </Link>
          </div>
        ) : (
          <Button
            variant="link-primary"
            asChild
            className="text-primary-foreground -ml-2"
          >
            <Link href="/sign-in?callbackUrl=/">Login</Link>
          </Button>
        )}
      </div>
      <ThemeSwitcher />
    </header>
  );
}
