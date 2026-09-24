import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Photo from "../components/Photo";
import { IconArrow } from "../components/Icons";
import { INSTAGRAM_URL, SHOPEE_URL, findProduct, fitFor, orderLink, products } from "../data/products";
import { readBust } from "../lib/bust";

const sections = [
  ["size", "Size & fit"],
  ["details", "Details"],
  ["care", "Care instruction"],
];

const textLink = "underline decoration-secondary-2/40 underline-offset-4 transition-colors hover:text-accent-1 hover:decoration-accent-1";

export default function Product({ slug }) {
  const product = findProduct(slug);
  const index = products.indexOf(product);
  const next = products[(index + 1) % products.length];
  const [color, setColor] = useState(product.colors[0]);
  const [open, setOpen] = useState("");
  const [bust] = useState(readBust);
  const order = orderLink(product.name, { colour: color.name, bust });

  useEffect(() => {
    document.title = `${product.name} | Vol 1. Archetypes - Saviera`;
    setColor(product.colors[0]);
    setOpen("");
  }, [product]);

  const lists = { size: product.size, details: product.details, care: product.care };
  const info = (
    <div className="px-6 py-12 md:sticky md:top-[100px] md:flex md:min-h-[calc(100svh-100px)] md:items-center md:px-16 md:py-16 lg:px-24">
      <div className="w-full max-w-md font-trap text-sm leading-relaxed">
        <p className="font-unbounded text-[9px] tracking-[0.28em]">
          <Link to="/01-archetypes" className="hover:text-accent-1">
            VOL 01. ARCHETYPES
          </Link>{" "}
          · 0{index + 1}
        </p>
        <h1 className="mt-4 font-aboreto text-3xl tracking-[0.12em]">{product.title}</h1>
        <p className="mt-1 font-forum text-xl">{product.archetype}</p>
        <p className="mt-5">{product.summary}</p>

        <dl className="mt-6">
          <div className="flex justify-between gap-4 border-b border-secondary-1/60 py-2">
            <dt>Size</dt>
            <dd>Free size · {product.fabric.toLowerCase()}</dd>
          </div>
          {product.fit.map(([label, value]) => (
            <div key={label} className="flex justify-between gap-4 border-b border-secondary-1/60 py-2">
              <dt>{label}</dt>
              <dd className="text-right">{value}</dd>
            </div>
          ))}
        </dl>
        {bust ? (
          <p className="mt-3">
            At your {bust} cm bust: <span className="text-accent-1">{fitFor(product, bust)}</span>
          </p>
        ) : (
          <p className="mt-3">
            <Link to="/#savieraProduct" className={textLink}>
              Check how it fits your bust
            </Link>
          </p>
        )}

        <p className="mt-6">
          <span className="font-unbounded text-[9px] tracking-[0.24em]">WEEKDAY · </span>
          {product.weekday}
          <br />
          <span className="font-unbounded text-[9px] tracking-[0.24em]">WEEKEND · </span>
          {product.weekend}
        </p>

        <div className="mt-6">
          {sections.map(([key, label]) => (
            <section key={key} className="border-t border-secondary-1/60 last:border-b">
              <button
                type="button"
                className="flex w-full items-center justify-between py-3 text-left"
                aria-expanded={open === key}
                onClick={() => setOpen(open === key ? "" : key)}
              >
                {label}
                <span aria-hidden="true">{open === key ? "–" : "+"}</span>
              </button>
              {open === key && (
                <ul className="fade-in mb-4 list-disc space-y-1.5 pl-5">
                  {lists[key].map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        <p className="mt-6 flex flex-col items-start gap-2">
          <a href={SHOPEE_URL} target="_blank" rel="noreferrer" className={textLink}>
            Buy on Shopee
          </a>
          <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className={textLink}>
            Ask us on Instagram
          </a>
          <Link to="/sav-to-wear-01" className={textLink}>
            Packaging & care
          </Link>
        </p>
        <p className="mt-4 text-xs text-secondary-2/70">Small batch. No returns, so check the measurements first.</p>
      </div>
    </div>
  );

  return (
    <article className="pb-28">
      <div key={color.name} className="fade-in md:grid md:grid-cols-2">
        <div className="relative md:contents">
          <div className="flex snap-x snap-mandatory overflow-x-auto md:contents">
            {color.photos.map((photo, photoIndex) => (
              <Photo
                key={typeof photo === "string" ? photo : photo.path}
                src={photo}
                alt={`${product.name} in ${color.name}, view ${photoIndex + 1}`}
                sizes="(min-width: 768px) 50vw, 88vw"
                eager={photoIndex === 0}
                className="aspect-[3/4] w-[88vw] shrink-0 snap-start bg-cream-1 object-cover object-[50%_20%] md:w-full"
              />
            ))}
          </div>
          {color.photos.length > 1 && (
            <span className="pointer-events-none absolute bottom-3 right-3 bg-primary-1/90 px-2 py-1 font-unbounded text-[9px] tracking-[0.2em] md:hidden">
              {color.photos.length} PHOTOS · SWIPE
            </span>
          )}
        </div>
        <div className={`md:col-start-2 md:row-start-1 ${color.photos.length > 1 ? "md:row-span-2" : ""}`}>{info}</div>
      </div>

      <section className="mx-auto max-w-site px-6 py-20 md:px-12 md:py-28">
        <div className="flex items-end justify-between">
          <h2 className="font-forum text-4xl md:text-6xl">Worn by you</h2>
          <p className="font-unbounded text-[10px] tracking-[0.28em]">#SAVTOWEAR</p>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-2 md:grid-cols-4">
          {product.worn.map(([src, post]) => (
            <a key={post} href={`https://www.instagram.com/p/${post}`} target="_blank" rel="noreferrer" className="group overflow-hidden">
              <Photo src={src} alt={`A customer wearing ${product.name}, from Instagram`} className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </a>
          ))}
        </div>
        <p className="mt-4 font-trap text-sm">Post yours with #SAVTOWEAR and tag @saviera.co. We will contact you about a 20k IDR cashback.</p>
      </section>

      <section className="bg-secondary-2 px-6 py-20 text-primary-2 md:px-12 md:py-32">
        <div className="mx-auto grid max-w-site items-center gap-10 md:grid-cols-[1fr_1.3fr] md:gap-20">
          <Photo src={product.makerPhoto.src} alt={product.makerPhoto.alt} className="aspect-[4/3] w-full object-cover grayscale" />
          <div>
            <p className="font-unbounded text-[10px] tracking-[0.32em] text-secondary-1">WHO MADE MY CLOTHES?</p>
            <h2 className="mt-4 font-forum text-5xl md:text-7xl">{product.makerName}</h2>
            <p className="mt-6 max-w-lg font-trap leading-relaxed text-primary-2/80">{product.maker.replace(/^Meet [^.]+\.\s*/, "")}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-site px-6 py-24 md:px-12 md:py-36">
        <p className="font-unbounded text-[10px] tracking-[0.32em]">BEHIND THIS PIECE</p>
        <p className="mt-6 max-w-4xl font-forum text-3xl leading-snug md:text-5xl">{product.story}</p>
      </section>

      <Link to={next.path} className="group block border-t border-secondary-1/60">
        <div className="mx-auto flex max-w-site items-center justify-between gap-6 px-6 py-10 md:px-12 md:py-14">
          <div>
            <p className="font-unbounded text-[10px] tracking-[0.28em]">NEXT PIECE</p>
            <p className="mt-3 flex items-center font-aboreto text-4xl tracking-[0.08em] transition-colors group-hover:text-accent-1 md:text-6xl">
              {next.title}
              <span className="ml-3 transition-transform group-hover:translate-x-2">
                <IconArrow />
              </span>
            </p>
            <p className="mt-2 font-forum text-lg">{next.archetype}</p>
          </div>
          <Photo src={next.colors[0].photos[0]} alt="" sizes="160px" className="aspect-[3/4] w-24 object-cover md:w-40" />
        </div>
      </Link>

      <div className="fixed inset-x-3 bottom-3 z-50 flex items-center gap-3 border border-secondary-2/15 bg-primary-1/95 p-2 pl-4 shadow-[0_8px_30px_rgba(58,58,58,0.12)] backdrop-blur md:inset-x-auto md:left-1/2 md:-translate-x-1/2">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <div className="hidden min-w-0 md:block">
            <p className="font-aboreto text-sm leading-none tracking-[0.12em]">{product.title}</p>
            <p className="mt-1 whitespace-nowrap font-trap text-xs">{color.name}</p>
          </div>
          <div className="flex items-center gap-1" role="group" aria-label="Colour">
            {product.colors.map((swatch) => (
              <button
                key={swatch.name}
                type="button"
                onClick={() => setColor(swatch)}
                aria-label={swatch.name}
                aria-pressed={color.name === swatch.name}
                className={`h-11 w-11 rounded-full border p-1.5 transition-colors ${
                  color.name === swatch.name ? "border-secondary-2" : "border-transparent"
                }`}
              >
                <span className="block h-full w-full rounded-full border border-secondary-2/20" style={{ background: swatch.hex }} />
              </button>
            ))}
          </div>
        </div>
        <a href={order} target="_blank" rel="noreferrer" className="btn-primary shrink-0 px-6 py-4 md:px-10">
          OWN THIS ITEM
        </a>
      </div>
    </article>
  );
}
