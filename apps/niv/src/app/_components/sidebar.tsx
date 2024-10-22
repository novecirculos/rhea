"use client";

import React, { ReactNode, useMemo } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import { File, Folder, Tree } from "./file-tree";

import {
  Skeleton,
  ScrollArea,
  Sidebar as BaseSidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarInset,
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
  Separator,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  DropdownMenu,
  DropdownMenuTrigger,
  SidebarMenuButton,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuSeparator,
  Avatar,
  AvatarImage,
  AvatarFallback,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@novecirculos/design";

import {
  AudioWaveform,
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  Cog,
  Command,
  CreditCard,
  GalleryVerticalEnd,
  LogOut,
  Plus,
  Sparkles,
} from "lucide-react";

interface Note {
  id: string;
  title: string | null;
  folder: string | null;
  contentUrl: string | null;
  createdAt: Date;
  userId: string;
  updatedAt: Date | null;
}

type TreeViewElement = {
  id: string;
  name: string;
  isSelectable?: boolean;
  children?: TreeViewElement[];
};

const renderTreeNodes = (elements: TreeViewElement[]) => {
  return elements.map((element) => {
    if (element.children && element.children.length > 0) {
      return (
        <Folder key={element.id} element={element.name} value={element.id}>
          {renderTreeNodes(element.children)}
        </Folder>
      );
    } else {
      return (
        <File key={element.id} value={element.id}>
          <Link className="truncate text-left" href={`/notes/${element.id}`}>
            {element.name}
          </Link>
        </File>
      );
    }
  });
};

const data = {
  spaces: [
    {
      name: "Personal space",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Nove círculos",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Acme Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  user: {
    name: "araujooj",
    email: "gabriel@novecirculos.com.br",
    avatar: "https://avatars.githubusercontent.com/araujooj",
  },
};

export const Sidebar = ({ children }: { children: ReactNode }) => {
  const { data: notes, isLoading, error } = api.notes.getUserNotes.useQuery();
  const [activeSpace, setActiveSpace] = React.useState(data.spaces[0]);

  const buildElements = (notes: Note[]): TreeViewElement[] => {
    const root: { [key: string]: TreeViewElement } = {};

    notes.forEach((note) => {
      const path = note.folder
        ? note.folder.split("/").map((part) => part.trim())
        : ["Root"];
      let currentLevel = root;

      path.forEach((part, index) => {
        if (!currentLevel[part]) {
          const id = `folder-${part}-${index}-${Math.random()
            .toString(36)
            .substr(2, 9)}`;
          currentLevel[part] = {
            id,
            name: part,
            isSelectable: false,
            children: [],
          };
        }

        if (index === path.length - 1) {
          currentLevel[part].children!.push({
            id: note.id,
            name: note.title || "Untitled",
            isSelectable: true,
          });
        } else {
          const nextPart = path[index + 1];
          let nextLevel = currentLevel[part].children!.find(
            (child) => child.name === nextPart,
          );

          if (!nextLevel) {
            const id = `folder-${nextPart}-${index + 1}-${Math.random()
              .toString(36)
              .substr(2, 9)}`;
            nextLevel = {
              id,
              name: nextPart as string,
              isSelectable: false,
              children: [],
            };
            currentLevel[part].children!.push(nextLevel);
          }

          currentLevel = { [nextPart as string]: nextLevel };
        }
      });
    });

    return Object.values(root);
  };

  const ELEMENTS = useMemo(() => {
    if (!notes) return [];
    return buildElements(notes);
  }, [notes]);

  const { id } = useParams();

  const router = useRouter();

  const deleteNotes = api.notes.deleteAllNotes.useMutation({
    onSuccess: () => {
      router.push("/");
    },
  });

  return (
    <>
      <BaseSidebar>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  >
                    {activeSpace && (
                      <>
                        <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                          <activeSpace.logo className="size-4" />
                        </div>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                          <span className="truncate font-semibold">
                            {activeSpace.name}
                          </span>
                          <span className="truncate text-xs">
                            {activeSpace.plan}
                          </span>
                        </div>
                      </>
                    )}
                    <ChevronsUpDown className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                  align="start"
                  side="bottom"
                  sideOffset={4}
                >
                  <DropdownMenuLabel className="text-xs text-muted-foreground">
                    Spaces
                  </DropdownMenuLabel>
                  {data.spaces.map((space, index) => (
                    <DropdownMenuItem
                      key={space.name}
                      onClick={() => setActiveSpace(space)}
                      className="gap-2 p-2"
                    >
                      <div className="flex size-6 items-center justify-center rounded-sm border">
                        <space.logo className="size-4 shrink-0" />
                      </div>
                      {space.name}
                      <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="gap-2 p-2">
                    <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                      <Plus className="size-4" />
                    </div>
                    <div className="font-medium text-muted-foreground">
                      Add space
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent>
          <ScrollArea className="relative h-full p-4">
            {isLoading && (
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            )}

            {error && (
              <div className="px-4 py-2 text-destructive">
                Error loading notes. Please try again later.
              </div>
            )}

            {!isLoading && !error && ELEMENTS.length === 0 && (
              <div className="px-4 py-2 text-muted-foreground">
                No notes available.
              </div>
            )}

            {!isLoading && !error && ELEMENTS.length > 0 && (
              <Tree initialSelectedId={id as string} elements={ELEMENTS}>
                {renderTreeNodes(ELEMENTS)}
              </Tree>
            )}
          </ScrollArea>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  >
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage
                        src={data.user.avatar}
                        alt={data.user.name}
                      />
                      <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">
                        {data.user.name}
                      </span>
                      <span className="truncate text-xs">
                        {data.user.email}
                      </span>
                    </div>
                    <ChevronsUpDown className="ml-auto size-4" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                  side="bottom"
                  align="end"
                  sideOffset={4}
                >
                  <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                      <Avatar className="h-8 w-8 rounded-lg">
                        <AvatarImage
                          src={data.user.avatar}
                          alt={data.user.name}
                        />
                        <AvatarFallback className="rounded-lg">
                          CN
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">
                          {data.user.name}
                        </span>
                        <span className="truncate text-xs">
                          {data.user.email}
                        </span>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <Sparkles />
                      Upgrade to Pro
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <BadgeCheck />
                      Account
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <CreditCard />
                      Billing
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Bell />
                      Notifications
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </BaseSidebar>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">
                  Building Your Application
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Title</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        {children}
      </SidebarInset>
    </>
  );
};
