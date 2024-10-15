import Typesense from "typesense";

if (
  !process.env.TYPESENSE_HOST ||
  !process.env.TYPESENSE_PORT ||
  !process.env.TYPESENSE_API_KEY
) {
  throw new Error("Missing Typesense environment variables");
}

export const typeSenseClient = new Typesense.Client({
  nodes: [
    {
      host: process.env.TYPESENSE_HOST, // For Typesense Cloud use xxx.a1.typesense.net
      port: process.env.TYPESENSE_PORT as unknown as number, // For Typesense Cloud use 443
      protocol: "https", // For Typesense Cloud use https
    },
  ],
  apiKey: process.env.TYPESENSE_API_KEY,
  connectionTimeoutSeconds: 10,
});
