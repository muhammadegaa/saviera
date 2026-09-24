import { useEffect, useState } from "react";
import Placeholder from "./Placeholder";

const slides = [
  { tone: "sand", mobile: "sand", label: "Hero slide 1 placeholder", index: "01" },
  { tone: "ink", mobile: "brown", label: "Hero slide 2 placeholder", index: "02" },
  { tone: "clay", mobile: "clay", label: "Hero slide 3 placeholder", index: "03" },
];

export default function HeroSlider({ children }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const timer = setInterval(() => setIndex((current) => (current + 1) % slides.length), 7000);
    return () => clearInterval(timer);
  }, []);

  const go = (direction) => setIndex((current) => (current + direction + slides.length) % slides.length);

  return (
    <section className="relative -mt-20 min-h-[100svh] md:-mt-[100px]" aria-roledescription="carousel" aria-label="Homepage hero">
      {slides.map((slide, slideIndex) => (
        <div
          key={slide.label}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            slideIndex === index ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          <Placeholder
            tone={slide.tone}
            label={`${slide.label}, desktop`}
            framed={false}
            className={`hidden h-full w-full md:block ${slideIndex === index ? "kenburns" : ""}`}
          />
          <Placeholder
            tone={slide.mobile}
            label={`${slide.label}, mobile`}
            framed={false}
            className={`h-full w-full md:hidden ${slideIndex === index ? "kenburns" : ""}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-black/25" />
        </div>
      ))}

      <div className="relative z-10 flex min-h-[100svh] flex-col justify-end px-6 pb-10 text-primary-2 md:px-12 md:pb-14">
        {children}
        <div className="mt-8 flex items-end justify-between font-montserrat text-[11px] tracking-[0.28em]">
          <div className="flex gap-4">
            {slides.map((slide, slideIndex) => (
              <button
                key={slide.index}
                type="button"
                aria-label={`Slide ${slideIndex + 1}`}
                aria-current={slideIndex === index ? "true" : undefined}
                onClick={() => setIndex(slideIndex)}
                className={slideIndex === index ? "text-primary-2" : "text-primary-2/45"}
              >
                {slide.index}
              </button>
            ))}
          </div>
          <div className="flex gap-6">
            <button type="button" aria-label="Previous" onClick={() => go(-1)}>
              PREV
            </button>
            <button type="button" aria-label="Next" onClick={() => go(1)}>
              NEXT
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
