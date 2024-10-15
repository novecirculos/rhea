import { getServerAuthSession } from "~/server/auth";
import { AiDrawerContent } from "./client";

export async function AiDrawer() {
  const session = await getServerAuthSession();

  return <AiDrawerContent />;
}
