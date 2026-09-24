import { useEffect } from "react";
import Photo from "../components/Photo";
import Reveal from "../components/Reveal";
import { HEALR_INSTAGRAM_URL } from "../data/products";

const beliefs = [
  "Mimpi kami, semua orang Indonesia bisa punya akses ke kesehatan mental kapanpun dan dimanapun tanpa stigma.",
  "Saat ini kami dalam upaya berkelanjutan untuk mengembangkan infrastruktur teknologi dan sistem informasi yang paling tepat dalam membantu praktisi, platform, dan profesional di bidang kesehatan mental.",
  "Etika dan keamanan data selalu jadi prioritas kami dalam proses ini.",
];

const link = "underline decoration-secondary-1 underline-offset-4 transition-colors hover:text-secondary-1";

export default function Healr() {
  useEffect(() => {
    document.title = "Healr - Saviera";
  }, []);

  return (
    <article className="bg-primary-2">
      <section className="mx-auto max-w-site px-6 pb-16 pt-10 md:px-12 md:pb-24 md:pt-16">
        <Photo src="healr/logo" alt="Healr" eager className="h-16 w-16" />
        <p className="fade-in mt-10 max-w-4xl font-forum text-3xl leading-snug md:text-6xl">
          A mission-driven advisory think tank for mental health and wellbeing practitioners, startups, and private practice owners.
        </p>
      </section>

      <section className="border-t border-secondary-1/60">
        <div className="mx-auto grid max-w-site gap-10 px-6 py-16 md:grid-cols-[1fr_1.4fr] md:gap-20 md:px-12 md:py-24">
          <Photo src="healr/myra" alt="Myra Saviera" className="aspect-[3/4] w-full max-w-md object-cover" />
          <Reveal className="max-w-xl font-trap leading-relaxed">
            <p className="font-unbounded text-[10px] tracking-[0.32em]">A NOTE FROM THE FOUNDER</p>
            <h1 className="mt-4 font-aboreto text-3xl tracking-[0.08em] md:text-4xl">I’M MYRA SAVIERA</h1>
            <p className="mt-6">
              I love building and am passionate about the mental health industry. Working in technology-based organisations lets me use my business
              acumen, managerial skills, and leadership.
            </p>
            <p className="mt-4">
              During Covid, I was fortunate to be empowered by one of Indonesia&apos;s leading pioneers of mental health startups. I grew their overall
              revenue to ~105% YoY and led 20+ initiatives and product developments.
            </p>
            <p className="mt-4">
              My expertise in mental health and well-being lets me support your business as it expands and sustains itself. Business and mental health
              together is a rare combination, and it widens the room you can work in.
            </p>
            <p className="mt-8 font-forum text-2xl leading-snug">We believe that by partnering up, we may advance and be better together.</p>
          </Reveal>
        </div>
      </section>

      <section className="bg-primary-1 px-6 py-20 md:px-12 md:py-28">
        <ol className="mx-auto max-w-site">
          {beliefs.map((belief, index) => (
            <Reveal key={belief}>
              <li className="grid gap-3 border-t border-secondary-1 py-8 md:grid-cols-[6rem_1fr]">
                <span className="font-unbounded text-[10px] tracking-[0.24em]">0{index + 1}</span>
                <p className="max-w-3xl font-forum text-2xl leading-snug md:text-3xl">{belief}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="bg-secondary-2 px-6 py-20 text-primary-2 md:px-12 md:py-28">
        <div className="mx-auto max-w-3xl font-trap leading-relaxed">
          <h2 className="font-forum text-4xl md:text-5xl">Tap into the better side of things.</h2>
          <p className="mt-6">
            If you want a better work-life balance through a well-managed, sustainable business, start with a free 15-minute call. Pick a time on{" "}
            <a className={link} href="https://calendly.com/hi-healr" target="_blank" rel="noreferrer">
              Calendly
            </a>{" "}
            or write to{" "}
            <a className={link} href="mailto:hi.healr@gmail.com">
              hi.healr@gmail.com
            </a>
            .
          </p>
          <p className="mt-4">
            Collaborations and consultations start from US$20 an hour (IDR 320,000). A limited pro-bono programme is available; ask by email.
          </p>
          <p className="mt-10 flex gap-8 font-montserrat text-xs tracking-[0.22em]">
            <a href={HEALR_INSTAGRAM_URL} target="_blank" rel="noreferrer" className="hover:text-secondary-1">
              @HEALR.CARE
            </a>
            <a href="https://medium.com/@msaviera" target="_blank" rel="noreferrer" className="hover:text-secondary-1">
              MEDIUM
            </a>
          </p>
        </div>
      </section>
    </article>
  );
}
