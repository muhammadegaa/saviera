import { useEffect } from "react";
import { Link } from "react-router-dom";
import Photo from "../components/Photo";
import Reveal, { Letters } from "../components/Reveal";
import { IconArrow } from "../components/Icons";
import { products } from "../data/products";

const materials = [
  ["100% organic cotton", "Bandung"],
  ["Pure linen", "Jakarta"],
  ["Pure cotton deadstock", "Jakarta"],
  ["Clothing label made from cotton", "Bojonegoro"],
  ["Hang tag made from recycled paper", "Jakarta"],
  ["Poly mailer bag, oxo-biodegradable", "Sukoharjo"],
  ["Thank-you card, repurposed sketching paper hand-painted by MS", "Jakarta"],
  ["Cut, made and trimmed by Arunika", "Jakarta"],
];

export default function Archetypes() {
  useEffect(() => {
    document.title = "Vol 1. Archetypes Initial Collection - Saviera";
  }, []);

  return (
    <article>
      <header className="mx-auto max-w-site px-6 pb-12 pt-10 md:px-12 md:pb-16 md:pt-14">
        <p className="font-unbounded text-[10px] tracking-[0.32em]">VOL 01 · THE INITIAL COLLECTION</p>
        <h1 className="mt-4 whitespace-nowrap font-aboreto text-[12vw] leading-none tracking-[0.08em] md:text-[10.5vw]">
          <Letters text="ARCHETYPES" step={55} />
        </h1>
        <div className="mt-8 grid gap-6 md:grid-cols-2 md:gap-16">
          <p className="fade-in font-forum text-2xl leading-snug md:text-3xl" style={{ animationDelay: "700ms" }}>
            Like an opera with an overture, Archetypes open our limited initial collection.
          </p>
          <p className="fade-in max-w-md font-trap leading-relaxed" style={{ animationDelay: "900ms" }}>
            Three pieces for people who are unique, original, confident and self-compassionate. Minimal, in earth tones, free size,
            breathable. Wear them to a business meeting, a casual office day, or the weekend.
          </p>
        </div>
      </header>

      <div className="overflow-hidden">
        <Photo
          src={{ path: "collection/three", hd: true }}
          alt="Wei Yi in brown, Wei Yi in taupe and Omnia, worn together"
          eager
          className="kenburns aspect-[4/3] w-full object-cover md:aspect-[16/7]"
        />
      </div>

      {products.map((product, index) => {
        const [first, second] = product.colors[0].photos;
        const flip = index % 2 === 1;
        return (
          <section key={product.slug} className="mx-auto grid max-w-site items-center gap-8 px-6 py-20 md:grid-cols-2 md:gap-16 md:px-12 md:py-32">
            <Reveal from={flip ? "translate-x-10" : "-translate-x-10"} className={`grid grid-cols-[3fr_2fr] items-end gap-2 ${flip ? "md:order-2" : ""}`}>
              <Photo src={first} alt={`${product.name} in ${product.colors[0].name}`} sizes="(min-width: 768px) 30vw, 55vw" className="aspect-[3/4] w-full object-cover" />
              {second && (
                <Photo src={second} alt={`${product.name}, another view`} sizes="(min-width: 768px) 20vw, 38vw" className="aspect-[3/4] w-full object-cover" />
              )}
            </Reveal>
            <Reveal delay={120}>
              <p className="font-unbounded text-[10px] tracking-[0.28em]">
                0{index + 1} · {product.fabric.toUpperCase()}
              </p>
              <h2 className="mt-3 font-aboreto text-5xl tracking-[0.08em] md:text-7xl">{product.title}</h2>
              <p className="mt-3 font-forum text-2xl">{product.archetype}</p>
              <p className="mt-5 max-w-md font-trap leading-relaxed">{product.story}</p>
              <p className="mt-5 font-montserrat text-xs tracking-[0.16em]">
                {product.colors.map((color) => color.name.toUpperCase()).join(" · ")}
              </p>
              <Link to={product.path} className="mt-8 inline-flex items-center bg-accent-2 px-8 py-4 font-montserrat text-xs font-medium tracking-[0.22em] text-primary-2">
                SEE {product.title} <IconArrow />
              </Link>
            </Reveal>
          </section>
        );
      })}

      <section className="bg-secondary-2 px-6 py-20 text-primary-2 md:px-12 md:py-32">
        <div className="mx-auto grid max-w-site gap-12 md:grid-cols-[1fr_1.4fr]">
          <div>
            <p className="font-unbounded text-[10px] tracking-[0.32em] text-secondary-1">WHERE IT COMES FROM</p>
            <h2 className="mt-4 font-forum text-4xl leading-tight md:text-6xl">Every material, and the town it comes from.</h2>
          </div>
          <ul className="font-trap">
            {materials.map(([item, place]) => (
              <li key={item} className="flex items-baseline gap-4 border-t border-primary-2/20 py-4 last:border-b">
                <span>{item}</span>
                <span className="flex-1 border-b border-dotted border-primary-2/30" />
                <span className="font-unbounded text-[10px] tracking-[0.24em] text-secondary-1">{place.toUpperCase()}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto grid max-w-site items-center gap-10 px-6 py-20 md:grid-cols-[1.3fr_1fr] md:px-12 md:py-32">
        <Photo src={{ path: "collection/linen", hd: true }} alt="Linen close to the body" className="aspect-[16/10] w-full object-cover" />
        <div>
          <h2 className="font-forum text-3xl md:text-4xl">A playlist to accompany your day</h2>
          <iframe
            title="Saviera playlist on Spotify"
            src="https://open.spotify.com/embed/playlist/0q4jLDoBlFmj9ry2gyRFMo?utm_source=generator&theme=0"
            loading="lazy"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            className="mt-6 h-[352px] w-full rounded-xl border-0"
          />
        </div>
      </section>
    </article>
  );
}
