import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Photo from "../components/Photo";
import Reveal, { Letters } from "../components/Reveal";
import { IconArrow } from "../components/Icons";
import { INSTAGRAM_URL, SHOPEE_URL, orderLink, products } from "../data/products";

const worn = [
  "DO-aPzSCJb3", "Curc5vcvyeC", "CtAqPB_vRZq", "Ct1I7OePdYM", "C59_ErIvJhJ", "C6nJXI6PZ3S",
  "DOXHT1REuG8", "C3Ux-IEPKes", "C3On39HPdvC", "DAgNhqozyj8", "CrsTwL7vG1T", "Cu6SCsABDjv",
];
const wornOrder = [5, 10, 6, 9, 8, 12, 7, 1, 11, 2, 3, 4];
import { useContent } from "../lib/useContent";

export default function Home() {
  const { content } = useContent();
  const home = content.homepage;
  const [selected, setSelected] = useState(products[0].slug);
  const piece = products.find((product) => product.slug === selected);
  const [main, ...others] = piece.colors;
  const side = [
    ...others.map((color) => [color, color.photos[0]]),
    ...main.photos.slice(1).map((photo) => [main, photo]),
  ].slice(0, 2);

  useEffect(() => {
    document.title = "Slow Fashion & Eco-Conscious Modern Staple | Saviera";
  }, []);

  function choose(slug) {
    setSelected(slug);
    document.getElementById("savieraProduct")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      <section className="flex min-h-[calc(100svh-5rem)] flex-col px-6 pb-8 pt-4 md:min-h-[calc(100svh-100px)] md:px-12 md:pb-12">
        <p className="flex justify-between font-unbounded text-[10px] tracking-[0.32em]">
          <span>VOL 01 · ARCHETYPES</span>
          <span className="hidden md:inline">THREE PIECES · ONE SIZE · MADE IN INDONESIA</span>
        </p>
        <h1 className="mt-6 whitespace-nowrap font-aboreto text-[18vw] leading-[0.9] tracking-[0.08em] md:mt-4 md:text-[17.4vw]">
          <Letters text="SAVIERA" />
        </h1>

        <div className="mt-auto grid items-end gap-10 pt-8 md:grid-cols-[1fr_1.25fr] md:gap-16">
          <div className="fade-in" style={{ animationDelay: "700ms" }}>
            <h2 className="max-w-xl font-forum text-[2.4rem] leading-[1] md:text-7xl">{home.headline}</h2>
            <p className="mt-5 max-w-sm font-trap text-sm leading-relaxed md:text-base">
              Free size. Linen and cotton. Sewn in small batches in Jakarta, for the meeting and the weekend.
            </p>
            <a
              href="#savieraProduct"
              className="mt-6 hidden items-center font-montserrat text-xs font-medium tracking-[0.22em] text-accent-2 md:inline-flex"
            >
              FIND YOURS <IconArrow />
            </a>
          </div>

          <div aria-label="The three pieces of Vol 01" className="grid grid-cols-3 gap-2 md:gap-4">
            {products.map((product, index) => (
              <button
                key={product.slug}
                type="button"
                onClick={() => choose(product.slug)}
                className="fade-in group text-left"
                style={{ animationDelay: `${900 + index * 200}ms` }}
              >
                <span className="block overflow-hidden bg-[#dcdcdc]">
                  <Photo
                    src={product.colors[0].photos[0]}
                    alt={`${product.name} in ${product.colors[0].name}`}
                    sizes="(min-width: 768px) 18vw, 32vw"
                    eager
                    className="kenburns aspect-[9/16] h-auto w-full object-cover object-top md:aspect-[3/4] transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </span>
                <span className="mt-2 block font-unbounded text-[9px] tracking-[0.24em] transition-colors group-hover:text-accent-1">
                  0{index + 1} {product.title}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-site px-6 py-24 md:px-12 md:py-44">
        <Reveal>
          <p className="max-w-5xl font-forum text-[2.6rem] leading-[1.05] md:text-8xl">
            One piece for the meeting and the weekend.
          </p>
        </Reveal>
        <Reveal delay={150} className="mt-10 md:ml-[50%] md:mt-16">
          <p className="max-w-md font-trap leading-relaxed">{home.story}</p>
          <Link to="/about-us" className="mt-6 inline-flex items-center font-montserrat text-xs font-medium tracking-[0.22em] text-accent-2">
            {home.cta} <IconArrow />
          </Link>
        </Reveal>
      </section>

      <section id="savieraProduct" className="scroll-mt-20 border-t border-secondary-1/60 md:scroll-mt-[100px]">
        <div className="mx-auto grid max-w-site md:grid-cols-[5fr_7fr]">
          <div className="px-6 pb-8 pt-16 md:sticky md:top-[100px] md:self-start md:px-12 md:py-20">
            <p className="font-unbounded text-[10px] tracking-[0.32em]">SHOP · VOL 01</p>
            <h2 className="mt-4 font-forum text-4xl leading-tight md:text-6xl">Three pieces. Which one is yours?</h2>
            <ul className="mt-10 md:mt-16">
              {products.map((product, index) => {
                const active = product.slug === selected;
                return (
                  <li key={product.slug} className="border-t border-secondary-1/60 last:border-b">
                    <button
                      type="button"
                      aria-pressed={active}
                      onClick={() => setSelected(product.slug)}
                      className="grid w-full grid-cols-[2.2rem_1fr] items-baseline py-5 text-left md:py-7"
                    >
                      <span className="font-unbounded text-[10px] tracking-[0.2em]">0{index + 1}</span>
                      <span>
                        <span
                          className={`block font-aboreto text-3xl tracking-[0.1em] transition-colors duration-500 md:text-5xl ${
                            active ? "text-accent-1" : "text-secondary-2/45"
                          }`}
                        >
                          {product.title}
                        </span>
                        <span className={`mt-1 block font-forum text-lg transition-opacity duration-500 md:text-xl ${active ? "" : "opacity-50"}`}>
                          {product.archetype}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div key={piece.slug} className="enter md:border-l md:border-secondary-1/60">
            <div className="grid aspect-[5/4] grid-cols-[3fr_2fr] gap-1 md:aspect-[4/3]">
              <div className="min-h-0 overflow-hidden">
                <Photo
                  src={piece.colors[0].photos[0]}
                  alt={`${piece.name} in ${piece.colors[0].name}, front`}
                  sizes="(min-width: 768px) 36vw, 60vw"
                  className="kenburns h-full w-full object-cover object-top"
                />
              </div>
              <div className="grid min-h-0 grid-rows-2 gap-1">
                {side.map(([color, photo]) => (
                  <Photo
                    key={typeof photo === "string" ? photo : photo.path}
                    src={photo}
                    alt={`${piece.name} in ${color.name}`}
                    sizes="(min-width: 768px) 24vw, 40vw"
                    className="h-full min-h-0 w-full object-cover object-top"
                  />
                ))}
              </div>
            </div>
            <p className="px-6 pt-4 font-unbounded text-[9px] tracking-[0.22em] md:px-12">
              {piece.colors.map((color) => color.name.toUpperCase()).join(" · ")}
            </p>
            <div className="grid gap-8 px-6 pb-10 pt-6 md:grid-cols-2 md:px-12 md:pb-12">
              <div>
                <p className="font-unbounded text-[10px] tracking-[0.24em] text-secondary-1">{piece.fabric.toUpperCase()}</p>
                <dl className="mt-4 font-trap text-sm">
                  {piece.fit.map(([label, value]) => (
                    <div key={label} className="flex justify-between gap-4 border-b border-secondary-1/40 py-2">
                      <dt>{label}</dt>
                      <dd className="text-right">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div className="font-trap text-sm leading-relaxed">
                <p>
                  <span className="font-unbounded text-[9px] tracking-[0.24em]">WEEKDAY</span>
                  <br />
                  {piece.weekday}
                </p>
                <p className="mt-4">
                  <span className="font-unbounded text-[9px] tracking-[0.24em]">WEEKEND</span>
                  <br />
                  {piece.weekend}
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row md:col-span-2">
                <Link
                  to={piece.path}
                  className="flex flex-1 items-center justify-center bg-accent-2 py-4 font-montserrat text-xs font-medium tracking-[0.22em] text-primary-2"
                >
                  SEE {piece.title} <IconArrow />
                </Link>
                <a
                  href={orderLink(piece.name)}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-1 items-center justify-center border border-accent-2 py-4 font-montserrat text-xs font-medium tracking-[0.22em] text-accent-2"
                >
                  OWN THIS ITEM
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-secondary-2 px-6 py-24 text-primary-2 md:px-12 md:py-36">
        <div className="mx-auto max-w-site">
          <p className="font-unbounded text-[10px] tracking-[0.32em] text-secondary-1">WHO MADE MY CLOTHES?</p>
          <ul className="mt-12">
            {products.map((product) => (
              <Reveal key={product.slug}>
                <li className="grid items-center gap-5 border-t border-primary-2/20 py-8 md:grid-cols-[1fr_1.2fr] md:gap-12 md:py-10">
                  <div className="flex items-center gap-5 md:gap-8">
                    <Photo
                      src={product.makerPhoto.src}
                      alt={product.makerPhoto.alt}
                      className="aspect-[4/5] w-24 shrink-0 object-cover grayscale md:w-32"
                    />
                    <div>
                    <p className="font-forum text-4xl md:text-6xl">{product.makerName}</p>
                    <p className="mt-2 font-unbounded text-[9px] tracking-[0.26em] text-secondary-1">MADE {product.title}</p>
                    </div>
                  </div>
                  <p className="max-w-xl font-trap leading-relaxed text-primary-2/80">
                    {product.maker.replace(/^Meet [^.]+\.\s*/, "")}
                  </p>
                </li>
              </Reveal>
            ))}
          </ul>
          <p className="mt-6 max-w-xl font-trap text-sm text-primary-2/70">
            All three work with Arunika, our cut, make and trim partner in Jakarta, in low-minimum runs.
          </p>
        </div>
      </section>

      <section className="py-24 md:py-36">
        <div className="mx-auto flex max-w-site items-end justify-between px-6 md:px-12">
          <div>
            <p className="font-unbounded text-[10px] tracking-[0.32em]">#SAVTOWEAR</p>
            <h2 className="mt-3 font-forum text-4xl md:text-6xl">Worn, then told.</h2>
          </div>
          <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="font-montserrat text-xs tracking-[0.2em] text-accent-2">
            @saviera.co
          </a>
        </div>
        <div className="mt-10 flex snap-x snap-mandatory gap-2 overflow-x-auto px-6 pb-4 md:px-12">
          {wornOrder.map((number) => (
            <a
              key={number}
              href={`https://www.instagram.com/p/${worn[number - 1]}`}
              target="_blank"
              rel="noreferrer"
              className="w-[62vw] shrink-0 snap-start md:w-[22vw]"
            >
              <Photo src={`worn/${number}`} alt="A #SAVTOWEAR post on Instagram" className="aspect-square w-full object-cover" />
            </a>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-site gap-14 border-t border-secondary-1/60 px-6 py-24 md:grid-cols-2 md:px-12 md:py-36">
        <div>
          <h2 className="font-forum text-5xl md:text-7xl">How to order</h2>
          <p className="mt-6 max-w-md font-trap leading-relaxed">
            There is no cart. Message us with the piece and the colour you want.
          </p>
          <p className="mt-4 max-w-md font-trap leading-relaxed">
            We don’t run sales and we don’t accept returns, so read the measurements and choose once.
          </p>
        </div>
        <div>
          <ol className="font-montserrat">
            {[
              ["WhatsApp", "+62 817 5199 968", orderLink("a piece from Vol 01. Archetypes")],
              ["Instagram", "Message @saviera.co", INSTAGRAM_URL],
              ["Shopee", "shopee.co.id/thesaviera", SHOPEE_URL],
            ].map(([channel, detail, href]) => (
              <li key={channel} className="border-t border-secondary-1 last:border-b">
                <a href={href} target="_blank" rel="noreferrer" className="group flex items-center justify-between py-6 text-accent-2">
                  <span className="font-aboreto text-2xl text-secondary-2 md:text-3xl">{channel}</span>
                  <span className="flex items-center text-sm">
                    {detail}
                    <span className="transition-transform group-hover:translate-x-1">
                      <IconArrow />
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ol>
          <div className="mt-12 grid grid-cols-[7rem_1fr] items-start gap-5 md:grid-cols-[9rem_1fr]">
            <Photo src="packaging/thank-you" alt="Hand-painted thank-you cards that come with each order" className="aspect-square w-full object-cover" />
            <div>
            <p className="font-unbounded text-[10px] tracking-[0.28em] text-secondary-1">AFTER IT ARRIVES</p>
            <p className="mt-3 font-forum text-2xl">{home.promoTitle}</p>
            <p className="mt-2 max-w-md font-trap text-sm leading-relaxed">{home.promoBody}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
