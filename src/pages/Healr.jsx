import { useEffect, useState } from "react";
import Placeholder from "../components/Placeholder";
import { HEALR_INSTAGRAM_URL } from "../data/products";

const slides = [
  "Mimpi kami, semua orang Indonesia bisa punya akses ke kesehatan mental kapanpun dan dimanapun tanpa stigma.",
  "Saat ini kami dalam upaya berkelanjutan untuk mengembangkan infrastruktur teknologi dan sistem informasi yang paling tepat dalam membantu praktisi, platform, dan profesional di bidang kesehatan mental.",
  "Etika dan keamanan data selalu jadi prioritas kami dalam proses ini.",
];

export default function Healr() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    document.title = "Healr - Saviera";
  }, []);

  return (
    <article className="bg-primary-2">
      <section className="mx-auto max-w-3xl px-6 py-16 text-center">
        <h1 className="font-aboreto text-4xl md:text-5xl">About Healr</h1>
        <p className="mt-10 font-trap text-xl text-secondary-2 md:text-2xl">
          <strong>A mission-driven organization</strong> that provides an <strong>advisory think tank</strong> for mental health and wellbeing practitioners, startups, and private practice owners.
        </p>
      </section>

      <section className="grid items-center bg-primary-1 md:grid-cols-2">
        <Placeholder tone="mauve" label="Healr portrait placeholder" className="min-h-[420px] w-full" />
        <div className="px-6 py-12 md:px-12">
          <h2 className="font-aboreto text-3xl md:text-4xl">I’M MYRA SAVIERA</h2>
          <p className="mt-6 font-trap">I love building and am passionate about the mental health industry. Working in technology-based organisations enables me to harness my business acumen, managerial skills, and leadership.</p>
          <p className="mt-4 font-trap">During Covid, I was fortunate to be empowered by one of Indonesia&apos;s leading pioneers of mental health startups and grew their overall revenue to ~105% YoY, led 20+ initiatives and various product developments.</p>
          <p className="mt-4 font-trap">My expertise in mental health and well-being spaces allows me to support your business in expanding and sustaining. I have the best of both worlds—business and mental health—a rare combination that widens the room you can work in.</p>
          <p className="mt-4 font-forum text-2xl">We believe that by partnering up, we may advance and be better together.</p>
        </div>
      </section>

      <section className="px-6 py-16 text-center" aria-roledescription="carousel" aria-label="My Favorite Images">
        <Placeholder tone={["ink", "clay", "sand"][index]} label="Healr slide placeholder" className="mx-auto aspect-[16/8] w-full max-w-site" />
        <p className="mx-auto mt-8 max-w-2xl font-forum text-2xl">{slides[index]}</p>
        <div className="mt-6 flex justify-center gap-4 font-montserrat text-sm">
          <button type="button" aria-label="Previous slide" disabled={index === 0} onClick={() => setIndex((current) => current - 1)} className="disabled:opacity-30">
            Previous slide
          </button>
          <button type="button" aria-label="Next slide" disabled={index === slides.length - 1} onClick={() => setIndex((current) => current + 1)} className="disabled:opacity-30">
            Next slide
          </button>
        </div>
      </section>

      <section className="bg-secondary-2 px-6 py-20 text-center text-primary-2">
        <h2 className="font-aboreto text-4xl">Tap into the better side of things .</h2>
        <p className="mt-4 font-trap">Ready to achieve a better work-life balance through a well-managed and sustainable business?</p>
        <p className="mt-3 font-trap">Book a quick 15-minute call with us to figure out what you need. Free of charge.</p>
        <a
          href="mailto:hi.healr@gmail.com"
          className="mt-8 inline-block border border-primary-2 px-6 py-4 font-montserrat"
        >
          We are currently open for collaborations and consultations, starting from US$20/hour (IDR 320,000)
        </a>
        <p className="mt-6 font-trap">
          Limited pro-bono program available, send us an email:{" "}
          <a className="underline" href="mailto:hi.healr@gmail.com">hi.healr@gmail.com</a>
        </p>
        <a href={HEALR_INSTAGRAM_URL} target="_blank" rel="noreferrer" className="mt-8 inline-block font-unbounded text-xs tracking-[0.22em]">
          @healr.care
        </a>
      </section>
    </article>
  );
}
