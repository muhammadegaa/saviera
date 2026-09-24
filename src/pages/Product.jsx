import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Photo from "../components/Photo";
import { Letters } from "../components/Reveal";
import { IconArrow } from "../components/Icons";
import { INSTAGRAM_URL, SHOPEE_URL, findProduct, fitFor, orderLink, products } from "../data/products";
import { readBust } from "../lib/bust";

const sections = [
  ["size", "Size & fit"],
  ["details", "Details"],
  ["care", "Care instruction"],
];

export default function Product({ slug }) {
  const product = findProduct(slug);
  const index = products.indexOf(product);
  const next = products[(index + 1) % products.length];
  const [color, setColor] = useState(product.colors[0]);
  const [open, setOpen] = useState("size");
  const [ctaVisible, setCtaVisible] = useState(true);
  const [bust] = useState(readBust);
  const order = orderLink(product.name, { colour: color.name, bust });
  const cta = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setCtaVisible(entry.isIntersecting || entry.boundingClientRect.top > 0));
    observer.observe(cta.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.title = `${product.name} | Vol 1. Archetypes - Saviera`;
    setColor(product.colors[0]);
    setOpen("size");
  }, [product]);

  const lists = { size: product.size, details: product.details, care: product.care };

  return (
    <article>
      <div className="mx-auto grid max-w-site md:grid-cols-[1.15fr_1fr]">
        <div className="relative min-w-0">
          <span className="pointer-events-none absolute bottom-3 right-3 z-10 bg-primary-1/90 px-2 py-1 font-unbounded text-[9px] tracking-[0.2em] md:hidden">
            {color.photos.length} PHOTOS · SWIPE
          </span>
          <div key={color.name} className="fade-in flex snap-x snap-mandatory gap-1 overflow-x-auto md:flex-col md:overflow-visible">
            {color.photos.map((photo, photoIndex) => (
              <Photo
                key={typeof photo === "string" ? photo : photo.path}
                src={photo}
                alt={`${product.name} in ${color.name}, view ${photoIndex + 1}`}
                sizes="(min-width: 768px) 52vw, 86vw"
                eager={photoIndex === 0}
                className="aspect-[3/4] w-[86vw] shrink-0 snap-start bg-cream-1 object-cover object-[50%_20%] md:w-full"
              />
            ))}
          </div>
        </div>

        <div className="px-6 pb-16 pt-8 md:sticky md:top-[100px] md:self-start md:px-12 md:pt-12">
          <p className="font-unbounded text-[10px] tracking-[0.28em]">
            <Link to="/01-archetypes" className="hover:text-accent-1">
              VOL 01. ARCHETYPES
            </Link>{" "}
            · 0{index + 1}
          </p>
          <h1 className="mt-4 font-aboreto text-6xl tracking-[0.08em] md:text-7xl">
            <Letters text={product.title} step={60} />
          </h1>
          <p className="mt-4 font-forum text-2xl leading-snug md:text-3xl">{product.archetype}</p>
          <p className="mt-4 max-w-md font-trap text-sm leading-relaxed">{product.summary}</p>

          <div className="mt-8">
            <p className="font-montserrat text-xs tracking-[0.16em]">
              COLOUR — <span className="text-accent-1">{color.name.toUpperCase()}</span>
            </p>
            <div className="mt-3 flex gap-3">
              {product.colors.map((swatch) => (
                <button
                  key={swatch.name}
                  type="button"
                  onClick={() => setColor(swatch)}
                  aria-label={swatch.name}
                  aria-pressed={color.name === swatch.name}
                  className={`h-11 w-11 rounded-full border p-1 transition-colors ${
                    color.name === swatch.name ? "border-secondary-2" : "border-transparent"
                  }`}
                >
                  <span className="block h-full w-full rounded-full border border-secondary-2/20" style={{ background: swatch.hex }} />
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <p className="font-unbounded text-[10px] tracking-[0.24em]">
              FREE SIZE · {product.fabric.toUpperCase()}
            </p>
            <dl className="mt-3 font-trap text-sm">
              {product.fit.map(([label, value]) => (
                <div key={label} className="flex justify-between gap-4 border-b border-secondary-1/40 py-2">
                  <dt>{label}</dt>
                  <dd className="text-right">{value}</dd>
                </div>
              ))}
            </dl>
            {bust && (
              <p className="mt-3 font-forum text-lg">
                At your {bust} cm bust: <span className="text-accent-1">{fitFor(product, bust)}</span>
              </p>
            )}
          </div>

          <a
            ref={cta}
            href={order}
            target="_blank"
            rel="noreferrer"
            className="mt-8 flex w-full items-center justify-center bg-accent-2 py-4 font-montserrat text-sm font-medium tracking-[0.2em] text-primary-2 transition-opacity hover:opacity-90"
          >
            OWN THIS ITEM
          </a>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <a href={SHOPEE_URL} target="_blank" rel="noreferrer" className="flex items-center justify-center border border-accent-2 py-3 font-montserrat text-xs tracking-[0.2em] text-accent-2">
              SHOPEE
            </a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="flex items-center justify-center border border-accent-2 py-3 font-montserrat text-xs tracking-[0.2em] text-accent-2">
              INSTAGRAM DM
            </a>
          </div>
          <p className="mt-3 font-trap text-xs text-secondary-2/70">Small batch. No returns, so check the measurements first.</p>

          <div className="mt-8 grid grid-cols-2 gap-6 font-trap text-sm leading-relaxed">
            <p>
              <span className="font-unbounded text-[9px] tracking-[0.24em]">WEEKDAY</span>
              <br />
              {product.weekday}
            </p>
            <p>
              <span className="font-unbounded text-[9px] tracking-[0.24em]">WEEKEND</span>
              <br />
              {product.weekend}
            </p>
          </div>

          <div className="mt-10">
            {sections.map(([key, label]) => (
              <section key={key} className="border-t border-secondary-1/60 last:border-b">
                <button
                  type="button"
                  className="flex w-full items-center justify-between py-4 text-left font-montserrat text-sm font-medium tracking-[0.12em]"
                  aria-expanded={open === key}
                  onClick={() => setOpen(open === key ? "" : key)}
                >
                  {label.toUpperCase()}
                  <span aria-hidden="true" className="text-lg font-light">
                    {open === key ? "–" : "+"}
                  </span>
                </button>
                {open === key && (
                  <ul className="fade-in mb-5 list-disc space-y-2 pl-5 font-trap text-sm leading-relaxed">
                    {lists[key].map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
        </div>
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

      <div
        className={`fixed inset-x-0 bottom-0 z-50 flex items-center gap-4 border-t border-secondary-1/60 bg-primary-1/95 px-4 py-3 backdrop-blur transition-transform duration-500 md:hidden ${
          ctaVisible ? "translate-y-full" : "translate-y-0"
        }`}
        aria-hidden={ctaVisible}
      >
        <div className="min-w-0 flex-1">
          <p className="font-aboreto text-lg leading-none tracking-[0.08em]">{product.title}</p>
          <p className="mt-1 truncate font-trap text-xs">
            {color.name} · free size · {product.fabric.toLowerCase()}
          </p>
        </div>
        <a
          href={order}
          target="_blank"
          rel="noreferrer"
          tabIndex={ctaVisible ? -1 : 0}
          className="shrink-0 bg-accent-2 px-5 py-3 font-montserrat text-xs font-medium tracking-[0.18em] text-primary-2"
        >
          OWN THIS ITEM
        </a>
      </div>
    </article>
  );
}
