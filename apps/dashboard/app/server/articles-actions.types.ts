export interface Article {
  id: number;
  metadata: {
    title: string;
    slug: string;
    links: { id: string | null; name: string }[];
    aliases: string[];
    category: string;
  };
}
