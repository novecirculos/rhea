import {
  CachedArticle,
  CachedContext,
  getContext,
} from "@/app/server/actions/context-actions";
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

import { Book } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

export function ContextDialog({
  chatId,
  open,
  onOpenChange,
}: {
  chatId: string | undefined;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [data, setData] = useState<CachedContext>({} as CachedContext);

  const getData = async () => {
    const ctx = await getContext(chatId as string);

    setData(ctx);
  };

  useEffect(() => {
    getData();
  }, []);

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
      <DialogContent className="md:max-w-[800px] max-h-[650px] no-scrollbar overflow-y-scroll sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Informações usadas na geração</DialogTitle>
          <DialogDescription>
            O modelo de linguagem utilizou as seguintes fontes para gerar a
            resposta:
          </DialogDescription>
        </DialogHeader>
        <ul className="grid grid-cols-1 overflow-x-auto w-full px-4">
          {data &&
            data?.context?.map((doc) => (
              <Card className="max-h-32 flex-1 p-2" key={doc.id}>
                <CardTitle className="px-4 py-2">{doc.id}</CardTitle>

                <CardContent>
                  {doc.content.length > 100
                    ? `${doc.content.substring(0, 100)}...`
                    : doc.content}
                </CardContent>
              </Card>
            ))}
        </ul>
        <div className="grid grid-cols-1 w-full px-4">
          <Card className="p-2 flex-1 max-h-32 rounded-lg mb-2 shadow-md">
            <CardTitle className="font-semibold px-4 py-2">
              Rolagem do nome
            </CardTitle>{" "}
            <CardContent>
              <div className="text-gray-200 mb-1 flex flex-row">
                {data?.name_rolls?.map((roll, index) => (
                  <span key={roll} className="font-semibold">
                    Rolagem: {roll}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        <span className="block mt-4 text-gray-300">
          <div className="grid grid-cols-1 w-full px-4">
            {data?.personality_and_physical_properties?.map((roll, index) => (
              <Card
                key={index}
                className="p-2 flex-1 max-h-32 rounded-lg mb-2 shadow-md"
              >
                <CardTitle className="font-semibold px-4 py-2">
                  Personalidade e características físicas:
                </CardTitle>{" "}
                <CardContent>
                  <div className="text-gray-200 mb-1">
                    <span className="font-semibold">Personalidade:</span>{" "}
                    {roll.personalityTrait} (Coluna:{" "}
                    {roll.personalityColumnRoll} Rolagem: {roll.traitRoll})
                  </div>
                  <div className="text-gray-200 mb-1">
                    <span className="font-semibold">Físico:</span>{" "}
                    {roll.physicalTrait} (Coluna: {roll.physicalColumnRoll}{" "}
                    Rolagem: {roll.physicalRoll})
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </span>

        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>OK</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
