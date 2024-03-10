import { getContext } from "@/app/server/actions/context-actions";
import { fetcher } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Button,
  Card,
  CardTitle,
  CardContent,
} from "@novecirculos/design";
import { useQuery } from "@tanstack/react-query";

import { Book } from "lucide-react";

export function ContextDialog({
  chatId,
  open,
  onOpenChange,
}: {
  chatId: string | undefined;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { data, isLoading } = useQuery({
    queryKey: ["context", chatId],
    enabled: !!chatId,
    queryFn: async () => {
      const data = await fetcher(`api/context?chatId=${chatId}`, {
        method: "GET",
      });

      return data;
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="hover:border-primary dark:hover:border-primary dark:border-foreground mb-2 bg-white hover:bg-white/50 hover:backdrop-blur-lg dark:bg-gray-800 dark:text-gray-50 dark:hover:bg-gray-800/50 dark:hover:text-gray-200"
        >
          <Book size={13} />
          Fontes da resposta
        </Button>
      </DialogTrigger>
      <DialogContent className="md:max-w-[800px] sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar system prompt</DialogTitle>
          <DialogDescription>
            O modelo de linguagem utilizou as seguintes fontes para gerar a
            resposta:
          </DialogDescription>
        </DialogHeader>
        <ul className="grid grid-cols-1 overflow-x-auto w-full px-4">
          {data?.context.map((doc: any) => (
            <Card className="max-h-32 flex-1" key={doc.id}>
              <CardTitle>{doc.id}</CardTitle>

              <CardContent>
                {doc.content.length > 100
                  ? `${doc.content.substring(0, 100)}...`
                  : doc.content}
              </CardContent>
            </Card>
          ))}
        </ul>
        <DialogFooter>
          <Button>OK</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
