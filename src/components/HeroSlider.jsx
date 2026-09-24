import { useEffect, useState } from "react";
import Placeholder from "./Placeholder";

const slides = [
  { tone: "sand", label: "Hero slide 1 placeholder" },
  { tone: "ink", label: "Hero slide 2 placeholder" },
  { tone: "clay", label: "Hero slide 3 placeholder" },
];

export default function HeroSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const timer = setInterval(() => setIndex((current) => (current + 1) % slides.length), 6000);
    return () => clearInterval(timer);
  }, []);

  const go = (direction) => setIndex((current) => (current + direction + slides.length) % slides.length);

  return (
    <section className="relative -mt-20 md:-mt-[100px]" aria-roledescription="carousel" aria-label="Homepage hero">
      <div className="relative">
        {slides.map((slide, slideIndex) => (
          <div
            key={slide.label}
            className={`transition-opacity duration-1000 ease-in-out ${
              slideIndex === index ? "relative opacity-100" : "absolute inset-0 opacity-0"
            }`}
          >
            <Placeholder tone={slide.tone} label={`${slide.label}, desktop`} className="hidden aspect-[16/7] w-full md:block" />
            <Placeholder tone={slideIndex === 1 ? "brown" : slide.tone} label={`${slide.label}, mobile`} className="aspect-[360/420] w-full md:hidden" />
          </div>
        ))}
        <div className="pointer-events-none absolute inset-0 flex items-end justify-center pb-10 md:pb-16">
          <p className="font-aboreto text-4xl tracking-[0.45em] text-primary-2 md:text-7xl">SAVIERA</p>
        </div>
      </div>
      <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-3">
        {slides.map((slide, slideIndex) => (
          <button
            key={slide.label}
            type="button"
            aria-label={`Slide ${slideIndex + 1}`}
            aria-current={slideIndex === index ? "true" : undefined}
            onClick={() => setIndex(slideIndex)}
            className={`h-2.5 w-2.5 rounded-full border border-primary-2 ${slideIndex === index ? "bg-primary-2" : "bg-transparent"}`}
          />
        ))}
      </div>
      <button type="button" aria-label="Previous" onClick={() => go(-1)} className="absolute left-3 top-1/2 z-20 -translate-y-1/2 font-montserrat text-xs tracking-widest text-primary-2">
        Previous
      </button>
      <button type="button" aria-label="Next" onClick={() => go(1)} className="absolute right-3 top-1/2 z-20 -translate-y-1/2 font-montserrat text-xs tracking-widest text-primary-2">
        Next
      </button>
    </section>
  );
}
