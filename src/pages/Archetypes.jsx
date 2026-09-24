import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Placeholder from "../components/Placeholder";
import Reveal from "../components/Reveal";
import { products } from "../data/products";

const materials = [
  ["100% organic cotton", "Bandung"],
  ["Pure linen", "Jakarta"],
  ["Pure cotton deadstock", "Jakarta"],
  ["Clothing label made from cotton", "Bojenegoro"],
  ["Hang tag made from recycled paper", "Jakarta"],
  ["Poly mailer bag is oxo-biodegradable", "Sukoharjo"],
  ["Thank you card made from repurposed sketching paper and hand-painted by MS", "Jakarta"],
  ["Cut, trimmed and manufactured by Arunika", "Jakarta"],
];

const moods = ["Slow linen", "Late office light", "Weekend market", "Quiet overture"];

export default function Archetypes() {
  const [index, setIndex] = useState(0);
  const product = products[index];

  useEffect(() => {
    document.title = "Vol 1. Archetypes Initial Collection - Saviera";
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const timer = setInterval(() => setIndex((current) => (current + 1) % products.length), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <article className="bg-primary-1">
      <header className="mx-auto max-w-3xl px-6 pb-10 pt-8 text-center">
        <p className="font-unbounded text-[11px] tracking-[0.28em]">VOL 01</p>
        <h1 className="mt-3 font-aboreto text-5xl tracking-[0.14em] md:text-8xl">ARCHETYPES</h1>
        <p className="mt-7 font-trap text-secondary-2">
          Like an Opera with an Overture, Archetypes mark the commencement of our{" "}
          <strong>limited initial collection.</strong>
        </p>
        <p className="mt-4 font-trap">
          ARCHETYPES inspired by and represent collective individuals that are:
          <br />
          unique, original, confident, and self-compassionate.
        </p>
      </header>

      <section className="relative mx-auto max-w-site px-6" aria-roledescription="carousel" aria-label="Archetypes">
        <Reveal>
          <div className="grid items-center gap-8 md:grid-cols-2">
            <Placeholder tone={product.tone} label={`${product.name} collection placeholder`} className="aspect-[4/5] w-full" />
            <div>
              <p className="font-unbounded text-[11px] tracking-[0.22em] text-accent-2">
                Minimalistic · Earth tone colors · Free sizes · Breathable and effortlessly chic
              </p>
              <h2 className="mt-4 font-aboreto text-5xl">{product.title}</h2>
              <p className="mt-4 font-trap">{product.summary}</p>
              <Link to={product.path} className="mt-6 inline-flex border border-accent-2 px-8 py-3 font-montserrat text-accent-2">
                MORE
              </Link>
            </div>
          </div>
        </Reveal>
        <div className="mt-6 flex justify-center gap-6 font-montserrat text-sm">
          <button type="button" aria-label="Previous" onClick={() => setIndex((current) => (current + products.length - 1) % products.length)}>
            Previous
          </button>
          <button type="button" aria-label="Next" onClick={() => setIndex((current) => (current + 1) % products.length)}>
            Next
          </button>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-16 text-center font-trap">
        <p>The collection provides essential staples that are versatile and purposeful.</p>
        <p className="mt-3">Wear it for business meetings, for a casual office look, or on the weekends.</p>
        <p className="mt-6">Below is information of materials, trims, and packaging used in our collection:</p>
      </section>

      <div className="mx-auto max-w-site overflow-x-auto px-6 pb-16">
        <table className="w-full min-w-[640px] border-collapse text-left font-trap">
          <thead>
            <tr className="border-b border-secondary-1 font-montserrat text-sm">
              <th className="py-3 pr-6">Materials, Trims and Packaging</th>
              <th className="py-3">Manufactured in / Made in / Sourced from</th>
            </tr>
          </thead>
          <tbody>
            {materials.map(([item, place]) => (
              <tr key={item} className="border-b border-secondary-1/30">
                <td className="py-3 pr-6">{item}</td>
                <td className="py-3">{place}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <section className="bg-cream-1 px-6 py-16">
        <h2 className="text-center font-forum text-3xl">Playlist to accompany your day</h2>
        <ul className="mx-auto mt-8 flex max-w-site flex-wrap justify-center gap-4">
          {moods.map((mood) => (
            <li key={mood} className="border border-secondary-2 px-5 py-3 font-montserrat text-sm">
              {mood}
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
