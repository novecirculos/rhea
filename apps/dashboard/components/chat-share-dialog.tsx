"use client";

import * as React from "react";
import { type DialogProps } from "@radix-ui/react-dialog";
import { toast } from "sonner";

import { ServerActionResult, type Chat } from "@/lib/types";
import { Button } from "@novecirculos/design";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@novecirculos/design";
import { IconSpinner } from "@/components/ui/icons";
import { useCopyToClipboard } from "@/lib/hooks/use-copy-to-clipboard";

interface ChatShareDialogProps extends DialogProps {
  chat: Pick<Chat, "id" | "title" | "messages">;
  shareChat: (chat: Chat) => ServerActionResult<Chat>;
  onCopy: () => void;
}

export function ChatShareDialog({
  chat,
  shareChat,
  onCopy,
  ...props
}: ChatShareDialogProps) {
  const { copyToClipboard } = useCopyToClipboard({ timeout: 1000 });
  const [isSharePending, startShareTransition] = React.useTransition();

  const copyShareLink = React.useCallback(
    async (chat: Chat) => {
      if (!chat.sharePath) {
        return toast.error("Could not copy share link to clipboard");
      }

      const url = new URL(window.location.href);
      url.pathname = chat.sharePath;
      copyToClipboard(url.toString());
      onCopy();
      toast.success("Link copiado para área de transferência");
    },
    [copyToClipboard, onCopy],
  );

  return (
    <Dialog {...props}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Compartilhar conversa</DialogTitle>
          <DialogDescription>
            Qualquer pessoa com o link poderá acessar essa conversa
          </DialogDescription>
        </DialogHeader>
        <div className="p-4 space-y-1 text-sm border dark:border-gray-800 rounded-md">
          <div className="font-medium dark:text-gray-50">{chat.title}</div>
          <div className="text-gray-500 dark:text-gray-400">
            {JSON.parse(chat.messages as unknown as string).length} mensagens
          </div>
        </div>
        <DialogFooter className="items-center">
          <Button
            disabled={isSharePending}
            onClick={() => {
              // @ts-ignore
              startShareTransition(async () => {
                const result = await shareChat(chat as Chat);

                if (result && "error" in result) {
                  toast.error(result.error);
                  return;
                }

                copyShareLink(result);
              });
            }}
          >
            {isSharePending ? (
              <>
                <IconSpinner className="mr-2 animate-spin" />
                Copiando...
              </>
            ) : (
              <>Copiar link</>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
