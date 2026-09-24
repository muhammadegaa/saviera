import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Photo from "./Photo";
import { Letters } from "./Reveal";
import { IconArrow } from "./Icons";
import { products } from "../data/products";

const DURATION = 6000;

export default function StoryHero({ headline }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const piece = products[active];

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const timer = setTimeout(() => setActive((current) => (current + 1) % products.length), DURATION);
    return () => clearTimeout(timer);
  }, [active, paused]);

  const step = (direction) => setActive((current) => (current + direction + products.length) % products.length);

  return (
    <section
      className="relative h-[calc(100svh-5rem)] min-h-[560px] overflow-hidden bg-secondary-2 text-primary-1 md:h-[calc(100svh-100px)]"
      aria-roledescription="carousel"
      aria-label="The three pieces of Vol 01"
      onMouseLeave={() => setPaused(false)}
    >
      <div className="absolute inset-0 flex gap-1">
        {products.map((product, index) => (
          <div
            key={product.slug}
            onMouseEnter={() => {
              setActive(index);
              setPaused(true);
            }}
            className={`overflow-hidden transition-all duration-1000 ease-[cubic-bezier(0.2,0.7,0.1,1)] max-md:absolute max-md:inset-0 md:relative md:basis-0 ${
              index === active ? "opacity-100 md:grow-[2.6]" : "opacity-0 md:grow md:opacity-100"
            }`}
            aria-hidden={index !== active}
          >
            <Photo
              src={product.colors[0].photos[0]}
              alt={`${product.name} in ${product.colors[0].name}`}
              sizes="(min-width: 768px) 50vw, 100vw"
              priority={index === 0}
              className="kenburns warm h-full w-full object-cover object-[50%_18%]"
            />
            <span
              className={`absolute left-4 top-8 hidden font-unbounded text-[9px] tracking-[0.26em] transition-opacity duration-700 md:block ${
                index === active ? "opacity-0" : "opacity-100"
              }`}
            >
              0{index + 1} {product.title}
            </span>
          </div>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-secondary-2/90 via-secondary-2/35 to-transparent" />

      <div className="absolute inset-x-0 top-0 flex gap-1 px-6 pt-3 md:px-12">
        {products.map((product, index) => (
          <button
            key={product.slug}
            type="button"
            aria-label={`Show ${product.name}`}
            onClick={() => setActive(index)}
            className="relative h-6 flex-1"
          >
            <span className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 bg-primary-1/35" />
            {index < active && <span className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 bg-primary-1" />}
            {index === active && (
              <span
                key={`${active}-${paused}`}
                className={`absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 bg-primary-1 ${paused ? "" : "story-progress"}`}
              />
            )}
          </button>
        ))}
      </div>

      <button type="button" aria-label="Previous piece" className="absolute bottom-1/3 left-0 top-10 w-1/3 md:hidden" onClick={() => step(-1)} />
      <button type="button" aria-label="Next piece" className="absolute bottom-1/3 right-0 top-10 w-2/3 md:hidden" onClick={() => step(1)} />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 px-6 pb-6 md:px-12 md:pb-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <h2 className="fade-in max-w-xl font-forum text-[2rem] leading-[1] md:text-6xl" style={{ animationDelay: "600ms" }}>
            {headline}
          </h2>
          <div key={piece.slug} className="enter pointer-events-auto flex flex-col items-start gap-3 md:items-end">
            <p className="font-forum text-lg text-primary-2/90 md:text-right">
              <span className="font-unbounded text-[9px] tracking-[0.26em] text-secondary-1">0{active + 1} / 0{products.length} </span>
              {piece.archetype}
            </p>
            <Link
              to={piece.path}
              className="group inline-flex items-center gap-3 bg-primary-1/95 px-5 py-3 font-montserrat text-xs tracking-[0.2em] text-secondary-2 shadow-[0_8px_30px_rgba(58,58,58,0.18)] transition-colors hover:bg-primary-1"
            >
              {piece.title}
              <span className="transition-transform group-hover:translate-x-1">
                <IconArrow />
              </span>
            </Link>
          </div>
        </div>
        <h1 className="mt-4 whitespace-nowrap font-aboreto text-[19.5vw] leading-[0.8] tracking-[0.04em] md:mt-6 md:text-[20.6vw]">
          <Letters text="SAVIERA" />
        </h1>
      </div>
    </section>
  );
}
