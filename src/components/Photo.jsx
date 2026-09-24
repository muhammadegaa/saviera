export default function Photo({ src, alt, sizes = "100vw", className = "", eager = false }) {
  const { path, hd } = typeof src === "string" ? { path: src } : src;
  const base = `/img/${path}`;
  return (
    <img
      src={`${base}-800.webp`}
      srcSet={hd ? `${base}-800.webp 800w, ${base}-1600.webp 1600w` : undefined}
      sizes={hd ? sizes : undefined}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      className={className}
    />
  );
}
