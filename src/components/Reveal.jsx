import { useEffect, useRef, useState } from "react";

export default function Reveal({
  children,
  className = "",
  from = "translate-y-8",
  delay = 0,
}) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        shown ? "translate-x-0 translate-y-0 opacity-100" : `${from} opacity-0`
      } ${className}`}
    >
      {children}
    </div>
  );
}

export function Letters({ text, delay = 0, step = 70 }) {
  return (
    <span aria-label={text} className="inline-block">
      {[...text].map((char, index) => (
        <span key={`${char}-${index}`} aria-hidden="true" className="inline-block overflow-hidden align-bottom">
          <span className="rise" style={{ animationDelay: `${delay + index * step}ms` }}>
            {char === " " ? "\u00a0" : char}
          </span>
        </span>
      ))}
    </span>
  );
}
