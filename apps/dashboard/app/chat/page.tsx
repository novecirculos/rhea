import { nanoid } from "@/lib/utils";
import { Chat } from "@/components/chat";

export const runtime = "nodejs";

export default function ChatIndex({ rolls }: { rolls: string }) {
  const id = nanoid();

  return <Chat id={id} rolls={rolls} />;
}
