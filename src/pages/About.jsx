import { useEffect, useState } from "react";
import Placeholder from "../components/Placeholder";
import Reveal from "../components/Reveal";
import { useContent } from "../lib/useContent";

const values = [
  ["S", "incere", "I believe kindness is always right. I embrace my originality and share gentle warmth with those around me. The world becomes a better place when more people choose kindness."],
  ["imp", "A", "ctful", "I am confident that I could make a change. I am holding myself accountable for the choices I made, notions I wrote, things I said, manifestations I claimed."],
  ["V", "ersatile", "I am resourceful and flexible. Everything I need, I already have. So I can make creative things out of anything!"],
  ["I", "ntentional", "I am purpose-driven. I know my values. I know what I want. I am aware of the responsibilities coming out of it. I respect my agendas and others’."],
  ["E", "mpowering", "Changes require effort. The effort reflects interest. My medium is honest storytelling. I co-create and actively generate productive discussions and innovations."],
  ["Figu", "R", "eoutable", "I challenge myself to be solution-oriented when faced with adversities. I believe there is always a way."],
  ["iter", "A", "te", "I am willing to learn, grow, and explore. I support my growth. I show support to others, and I believe in collaboration for betterment."],
];

export default function About() {
  const { content } = useContent();
  const about = content.about;
  const [pillar, setPillar] = useState("people");

  useEffect(() => {
    document.title = "About Saviera";
  }, []);

  const pillars = {
    people: about.people,
    planet: about.planet,
    profit: about.profit,
  };

  return (
    <>
      <section className="relative -mt-20 aspect-[36/41] md:-mt-[100px] md:aspect-[12/5]">
        <Placeholder tone="ink" label="About hero placeholder" className="absolute inset-0 h-full w-full" framed={false} />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="px-6 text-center font-aboreto text-2xl tracking-[0.2em] text-primary-2 md:text-5xl">{about.hero}</h1>
        </div>
      </section>

      <section className="bg-primary-1 px-6 py-20">
        <Reveal className="mx-auto max-w-3xl text-center font-trap text-2xl">
          <p>{about.lead}</p>
          <p className="mt-8">{about.vision}</p>
        </Reveal>
      </section>

      <section className="relative bg-primary-2">
        <div className="grid md:grid-cols-2">
          <Placeholder tone="clay" label="Status quo placeholder" className="min-h-[420px] w-full" />
          <Reveal from="translate-x-10" className="flex items-center bg-white p-8 md:p-14">
            <div>
              <h2 className="font-aboreto text-3xl">{about.statusTitle}</h2>
              {about.status.map((paragraph) => (
                <p key={paragraph.slice(0, 24)} className="mt-5 font-trap leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-site px-6 py-20">
        <p className="font-forum text-5xl leading-none md:text-7xl">OUR</p>
        <p className="font-aboreto text-4xl tracking-[0.18em] md:text-6xl">SENTIMENT</p>
        <p className="mt-6 max-w-2xl font-trap text-lg">{about.sentimentIntro}</p>
        <div className="mt-10 flex gap-6 font-montserrat text-sm uppercase tracking-[0.18em]">
          {["people", "planet", "profit"].map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setPillar(key)}
              className={pillar === key ? "border-b border-accent-1 text-accent-1" : ""}
            >
              {key}
            </button>
          ))}
        </div>
        <ul className="mt-8 max-w-3xl list-disc space-y-4 pl-5 font-trap">
          {pillars[pillar].map((item) => (
            <li key={item.slice(0, 32)}>{item}</li>
          ))}
        </ul>
        <p className="mt-10 max-w-3xl font-trap">{about.closing}</p>
      </section>

      <section className="bg-cream-1 px-6 py-20">
        <h2 className="mx-auto max-w-3xl text-center font-forum text-3xl md:text-4xl">
          Manifestations Words We Would Like to Share with You through our Values
        </h2>
        <div className="mx-auto mt-12 grid max-w-site gap-10 md:grid-cols-2">
          {values.map((row) => (
            <article key={row[row.length - 1].slice(0, 16)}>
              <h3 className="font-aboreto text-3xl">
                {row.length === 3 ? (
                  <>
                    <span className="text-accent-1">{row[0]}</span> {row[1]}
                  </>
                ) : (
                  <>
                    {row[0]} <span className="text-accent-1">{row[1]}</span>
                    {row[2]}
                  </>
                )}
              </h3>
              <p className="mt-3 font-trap">{row[row.length - 1]}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
