import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Placeholder from "../components/Placeholder";
import { INSTAGRAM_URL, SHOPEE_URL, findProduct, orderLink } from "../data/products";

const sections = [
  ["size", "Size & fit"],
  ["details", "Details"],
  ["care", "Care Instruction"],
];

export default function Product({ slug }) {
  const product = findProduct(slug);
  const [color, setColor] = useState(product.colors[0]);
  const [open, setOpen] = useState("size");

  useEffect(() => {
    document.title = `${product.name} | Vol 1. Archetypes - Saviera`;
    setColor(product.colors[0]);
    setOpen("size");
  }, [product]);

  const lists = { size: product.size, details: product.details, care: product.care };

  return (
    <article className="mx-auto grid max-w-site gap-10 px-6 py-8 md:grid-cols-2 md:py-14">
      <div>
        <Placeholder tone={color.tone} label={`${product.name} ${color.name} placeholder`} className="aspect-[4/5] w-full" />
        <div className="mt-3 grid grid-cols-4 gap-2">
          {product.colors.map((swatch) => (
            <button key={swatch.name} type="button" onClick={() => setColor(swatch)} aria-label={swatch.name}>
              <Placeholder tone={swatch.tone} label="" framed={false} className="aspect-square w-full" />
            </button>
          ))}
        </div>
      </div>
      <div>
        <p className="font-unbounded text-[11px] tracking-[0.22em]">
          <Link to="/01-archetypes">VOL 01. ARCHETYPES</Link>
        </p>
        <h1 className="mt-3 font-aboreto text-5xl md:text-6xl">{product.title}</h1>
        <p className="mt-5 font-trap leading-relaxed">{product.summary}</p>
        <p className="mt-6 font-montserrat text-sm">Available colors:</p>
        <div className="mt-3 flex flex-wrap gap-3">
          {product.colors.map((swatch) => (
            <button
              key={swatch.name}
              type="button"
              onClick={() => setColor(swatch)}
              className={`border px-4 py-2 font-montserrat text-sm ${color.name === swatch.name ? "border-accent-2 text-accent-2" : "border-secondary-2/30"}`}
            >
              {swatch.name}
            </button>
          ))}
        </div>
        <a
          href={orderLink(product.name)}
          target="_blank"
          rel="noreferrer"
          className="mt-8 flex w-full items-center justify-center border border-accent-2 py-4 font-montserrat font-medium text-accent-2"
        >
          OWN THIS ITEM
        </a>
        <a href={SHOPEE_URL} target="_blank" rel="noreferrer" className="mt-3 flex w-full items-center justify-center border border-secondary-2 py-4 font-montserrat">
          SHOPEE
        </a>
        <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="mt-4 inline-block font-montserrat text-sm underline">
          Instagram
        </a>

        <div className="mt-12">
          {sections.map(([key, label]) => (
            <section key={key} className="border-t border-secondary-1/40">
              <button
                type="button"
                className="flex w-full items-center justify-between py-4 text-left font-montserrat text-xl font-bold md:text-2xl"
                aria-expanded={open === key}
                onClick={() => setOpen(open === key ? "" : key)}
              >
                {label}
                <span aria-hidden="true">{open === key ? "–" : "+"}</span>
              </button>
              {open === key && (
                <ul className="mb-4 list-disc space-y-2 pl-5 font-trap">
                  {lists[key].map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        <section className="mt-8">
          <h2 className="font-montserrat text-xl font-bold md:text-3xl">Who made my clothes?</h2>
          <p className="mt-3 font-trap leading-relaxed">{product.maker}</p>
        </section>
        <section className="mt-8">
          <h2 className="font-montserrat text-xl font-bold md:text-3xl">Behind this piece</h2>
          <p className="mt-3 font-trap leading-relaxed">{product.story}</p>
        </section>
      </div>
    </article>
  );
}
