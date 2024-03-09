import { getTranscription } from "@/app/server";
import { ContentSection } from "./ContentSection";

const TitleSection = ({ title }: { title: string }) => {
  return (
    <>
      <h1 className="my-4 text-2xl font-bold dark:text-gray-50">{title}</h1>
    </>
  );
};

export default async function Scene({ params }: { params: { id: number } }) {
  const { id } = params;

  const transcriptions = await getTranscription(id);

  return (
    <div className="flex flex-col justify-center">
      <section className="mx-auto space-y-4">
        <TitleSection title={transcriptions?.filename || ""} />
        <ContentSection text={transcriptions?.text || ""} />
      </section>
    </div>
  );
}
