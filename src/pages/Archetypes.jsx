import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import JavaMap, { towns } from "../components/JavaMap";
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

const journey = Object.keys(towns)
  .sort((a, b) => towns[b].km - towns[a].km)
  .map((town) => [town, materials.filter(([, place]) => place === town).map(([item]) => item)]);

export default function Archetypes() {
  const [active, setActive] = useState(null);
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
          className="kenburns warm aspect-[4/3] w-full object-cover md:aspect-[16/7]"
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
              <Link to={product.path} className="btn-secondary mt-8 inline-flex px-8 py-4">
                SEE {product.title} <IconArrow />
              </Link>
            </Reveal>
          </section>
        );
      })}

      <section className="bg-secondary-2 px-6 py-20 text-primary-2 md:px-12 md:py-32">
        <div className="mx-auto max-w-site">
          <p className="font-unbounded text-[10px] tracking-[0.32em] text-secondary-1">WHERE IT COMES FROM</p>
          <h2 className="mt-4 max-w-3xl font-forum text-4xl leading-tight md:text-7xl">Eight materials. Four towns. One island.</h2>
          <p className="mt-6 max-w-lg font-trap leading-relaxed text-primary-2/75">
            Everything in Vol 01 is sourced or made on Java, then cut, made and trimmed at Arunika in Jakarta. Choose a material to see where it
            starts.
          </p>

          <div className="mt-16 md:mt-20">
            <JavaMap active={active} />
          </div>

          <ol className="mt-14 md:mt-20" onMouseLeave={() => setActive(null)}>
            {journey.map(([place, items]) => (
              <li key={place}>
                <button
                  type="button"
                  onMouseEnter={() => setActive(place)}
                  onFocus={() => setActive(place)}
                  onClick={() => setActive(place)}
                  aria-pressed={active === place}
                  className={`grid w-full grid-cols-[4.5rem_1fr] gap-x-4 gap-y-2 border-t border-primary-2/20 py-6 text-left transition-opacity duration-500 md:grid-cols-[7rem_16rem_1fr] md:items-baseline md:gap-x-10 ${
                    active && active !== place ? "opacity-35" : ""
                  }`}
                >
                  <span className="font-unbounded text-[10px] tracking-[0.2em] text-secondary-1">{towns[place].km} KM</span>
                  <span className="font-aboreto text-xl tracking-[0.12em] md:text-2xl">
                    {place.toUpperCase()}
                    {place === "Jakarta" && <span className="block font-unbounded text-[9px] tracking-[0.24em] text-secondary-1">THE WORKROOM</span>}
                  </span>
                  <span className="col-start-2 font-trap leading-relaxed text-primary-2/85 md:col-start-3">{items.join(" · ")}</span>
                </button>
              </li>
            ))}
          </ol>
          <p className="mt-8 font-trap text-xs text-primary-2/50">Distances are straight lines to Jakarta. Map: Natural Earth.</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-site items-center gap-10 px-6 py-20 md:grid-cols-[1.3fr_1fr] md:px-12 md:py-32">
        <Photo src={{ path: "collection/linen", hd: true }} alt="Linen close to the body" className="warm aspect-[16/10] w-full object-cover" />
        <div>
          <h2 className="font-forum text-3xl md:text-4xl">A playlist to accompany your day</h2>
          <a
            href="https://open.spotify.com/playlist/0q4jLDoBlFmj9ry2gyRFMo"
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center border-b border-secondary-1 pb-1 font-montserrat text-xs tracking-[0.22em] transition-colors hover:text-accent-1"
          >
            LISTEN ON SPOTIFY <IconArrow />
          </a>
        </div>
      </section>
    </article>
  );
}
