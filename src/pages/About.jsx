import { useEffect } from "react";
import Photo from "../components/Photo";
import Reveal, { Letters } from "../components/Reveal";
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

const pillars = [
  ["people", "The People", "about/people", "Two of the team holding Saviera mailer bags"],
  ["planet", "The Planet", "about/planet", "A seedling held up to the light"],
  ["profit", "The Profit", "about/profit", "A laptop and a phone on a work desk"],
];

export default function About() {
  const { content } = useContent();
  const about = content.about;

  useEffect(() => {
    document.title = "About Saviera";
  }, []);

  return (
    <>
      <section className="mx-auto max-w-site px-6 pb-16 pt-10 md:px-12 md:pb-24 md:pt-14">
        <p className="font-unbounded text-[10px] tracking-[0.32em]">
          <Letters text={about.hero} step={25} />
        </p>
        <p className="fade-in mt-8 max-w-5xl font-forum text-[2.2rem] leading-[1.1] md:text-7xl" style={{ animationDelay: "500ms" }}>
          {about.lead}
        </p>
      </section>

      <div className="overflow-hidden">
        <Photo src={{ path: "about/cloth", hd: true }} alt="Dark linen falling from a shoulder" eager className="kenburns aspect-[16/9] w-full object-cover md:aspect-[12/5]" />
      </div>

      <section className="mx-auto max-w-site px-6 py-20 md:px-12 md:py-32">
        <Reveal className="md:ml-[40%]">
          <p className="max-w-2xl font-trap text-lg leading-relaxed md:text-xl">{about.vision}</p>
        </Reveal>
      </section>

      <section className="bg-secondary-2 text-primary-2">
        <div className="mx-auto grid max-w-site md:grid-cols-2">
          <Photo src="about/hanging" alt="Garments drying on a line against a stone wall" className="aspect-square w-full object-cover md:aspect-auto md:h-full" />
          <Reveal from="translate-x-10" className="px-6 py-16 md:px-14 md:py-24">
            <h2 className="font-aboreto text-3xl tracking-[0.08em] md:text-4xl">{about.statusTitle}</h2>
            {about.status.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="mt-6 max-w-lg font-trap leading-relaxed text-primary-2/85">
                {paragraph}
              </p>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-site px-6 py-20 md:px-12 md:py-32">
        <p className="font-unbounded text-[10px] tracking-[0.32em]">OUR SENTIMENT</p>
        <p className="mt-4 max-w-3xl font-forum text-3xl leading-snug md:text-5xl">{about.sentimentIntro}</p>
        <div className="mt-16">
          {pillars.map(([key, title, image, alt], index) => (
            <Reveal key={key}>
              <div className="grid gap-6 border-t border-secondary-1 py-10 md:grid-cols-[1fr_1.1fr_1.6fr] md:gap-12 md:py-14">
                <div>
                  <p className="font-unbounded text-[10px] tracking-[0.24em] text-secondary-1">0{index + 1}</p>
                  <h3 className="mt-2 font-aboreto text-3xl tracking-[0.08em] md:text-4xl">{title}</h3>
                </div>
                <Photo src={image} alt={alt} className="aspect-[3/2] w-full object-cover" />
                <ul className="space-y-4 font-trap leading-relaxed">
                  {about[key].map((item) => (
                    <li key={item.slice(0, 32)} className="border-l border-secondary-1 pl-4">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 max-w-3xl border-t border-secondary-1 pt-10 font-forum text-2xl leading-snug md:text-3xl">{about.closing}</p>
      </section>

      <section className="bg-cream-1 px-6 py-20 md:px-12 md:py-32">
        <div className="mx-auto max-w-site">
          <p className="font-unbounded text-[10px] tracking-[0.32em]">OUR VALUES</p>
          <h2 className="mt-4 max-w-2xl font-forum text-3xl md:text-5xl">Words we hold ourselves to, one for each letter.</h2>
          <ol className="mt-14">
            {values.map((row) => {
              const letter = row.length === 3 ? row[0] : row[1];
              const word = row.length === 3 ? row[0] + row[1] : row[0] + row[1] + row[2];
              return (
                <li key={word} className="grid grid-cols-[3.5rem_1fr] gap-4 border-t border-secondary-1/60 py-6 md:grid-cols-[7rem_16rem_1fr] md:items-baseline md:gap-10">
                  <span className="font-aboreto text-5xl text-accent-1 md:text-7xl">{letter}</span>
                  <div className="md:contents">
                    <h3 className="font-aboreto text-2xl tracking-[0.08em]">{word}</h3>
                    <p className="mt-2 max-w-xl font-trap leading-relaxed md:mt-0">{row[row.length - 1]}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>
    </>
  );
}
