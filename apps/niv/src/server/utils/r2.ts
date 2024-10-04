import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

export const R2_BASE_URL = "https://assets.novecirculos.com.br";

const {
  R2_ACCOUNT_ID: accountId,
  R2_ACCESS_KEY: accessKey,
  R2_SECRET_KEY: secretKey,
  R2_REGION: region,
  R2_BUCKET: bucket,
} = process.env;

if (!accountId || !accessKey || !secretKey || !region || !bucket) {
  throw new Error("Missing R2 env vars");
}

export const getR2Client = () => {
  return new S3Client({
    region: region,
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: accessKey,
      secretAccessKey: secretKey,
    },
  });
};

export const uploadFileToR2 = async ({
  key,
  content,
  contentType,
}: {
  key: string;
  content: string | Uint8Array | Buffer;
  contentType: string;
}) => {
  const client = getR2Client();
  const command = new PutObjectCommand({
    Bucket: bucket,
    ACL: "public-read",
    Key: key,
    Body: content,
    ContentType: contentType,
  });
  return client.send(command);
};

export const getR2FileUrl = (key: string) => `${R2_BASE_URL}/${key}`;
