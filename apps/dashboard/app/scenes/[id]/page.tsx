import { getScene } from "@/app/server/";
import { Event } from "@/app/server/";
import { Badge } from "@novecirculos/design";

const TitleSection = ({ title }: { title: string }) => {
  return (
    <>
      <h1 className="my-4 text-2xl font-bold dark:text-gray-50">{title}</h1>
    </>
  );
};
const LocationSection = ({ location }: { location: string }) => {
  return (
    <span className="dark:text-gray-50">
      Localização: <Badge>{location}</Badge>
    </span>
  );
};

const GenericSection = ({
  list,
  title,
}: {
  list: string[];
  title: "Personagens" | "Objetos" | "Categorias";
}) => {
  "use client";

  return (
    <section className="flex flex-wrap items-center space-x-2">
      <span className="dark:text-gray-50">{title}: </span>
      {list.map((item) => (
        <Badge className="mt-1" key={item}>
          {item}
        </Badge>
      ))}
    </section>
  );
};

const EventsSection = ({ events }: { events: Event[] }) => {
  return (
    <>
      <h2 className="text-xl font-bold dark:text-gray-50">Eventos da cena</h2>
      <ul className="prose dark:prose-invert">
        {events.map((event) => {
          return (
            <li key={event.name || event.title}>
              <strong>{event.name || event.title}</strong> <br />
              <span>{event.description}</span>
            </li>
          );
        })}
      </ul>
    </>
  );
};

const ContentSection = ({ content }: { content: string }) => {
  return (
    <>
      <h2 className="text-xl font-bold dark:text-gray-50">Conteúdo</h2>
      <div className="prose dark:prose-invert">{content}</div>
    </>
  );
};

export default async function Scene({ params }: { params: { id: number } }) {
  const { id } = params;

  const scene = await getScene(id);

  return (
    <div className="flex flex-col justify-center">
      <section className="mx-auto space-y-4">
        <TitleSection title={scene?.title || ""} />
        <LocationSection location={scene?.location || ""} />
        <GenericSection list={scene?.characters || []} title="Personagens" />
        <GenericSection list={scene?.objects || []} title="Objetos" />
        <GenericSection list={scene?.categories || []} title="Categorias" />
        <EventsSection events={scene?.events || []} />
        <ContentSection content={scene?.content || ""} />
      </section>
    </div>
  );
}
