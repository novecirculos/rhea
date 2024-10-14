"use client";
import * as React from "react";

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
} from "@novecirculos/design";
import { X } from "lucide-react";

const AiDrawerTitle = () => (
  <DrawerHeader className="flex justify-between">
    <div>
      <DrawerTitle>Drawer Title</DrawerTitle>
      <DrawerDescription>This is a generic drawer component.</DrawerDescription>
    </div>
    <DrawerClose asChild>
      <Button variant="link">
        <X />
      </Button>
    </DrawerClose>
  </DrawerHeader>
);

export default function AiDrawer() {
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    setIsOpen(true);
  }, []);

  return (
    <Drawer direction="right" alwaysOpen open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button className="absolute right-2 top-8" variant="outline">
          Open chat
        </Button>
      </DrawerTrigger>
      <DrawerContent noOverlay className="left-auto h-full w-max min-w-[50%]">
        <div className="mx-auto flex h-full w-full flex-col">
          <AiDrawerTitle />
          <div className="flex-grow overflow-y-auto p-4">
            <p>Add your custom content here.</p>
            {/* You can add more content here, and it will be scrollable if it exceeds the height */}
          </div>
          <DrawerFooter>
            <Button variant="secondary">Submit</Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
