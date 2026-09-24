const palettes = {
  linen: ["#cfc3b0", "#8d7358", "#2e2924"],
  clay: ["#c9a48a", "#7c5846", "#2a211c"],
  ink: ["#7d8682", "#31403c", "#141918"],
  mauve: ["#c9adad", "#7d5c61", "#2b2224"],
  taupe: ["#c4b5a6", "#75685d", "#2a2622"],
  brown: ["#8d6b50", "#4e382c", "#1b1410"],
  charcoal: ["#6a6d70", "#2c2e31", "#121314"],
  porcelain: ["#f4efe6", "#d9cebe", "#8f867a"],
  offwhite: ["#f7f3eb", "#e7dccb", "#b7aa96"],
  sand: ["#e6d3b4", "#a68455", "#3d3428"],
};

export default function Placeholder({
  tone = "linen",
  label = "Editorial placeholder",
  className = "",
  framed = true,
}) {
  const [a, b, c] = palettes[tone] || palettes.linen;
  return (
    <div
      role="img"
      aria-label={label}
      className={`relative overflow-hidden ${className}`}
      style={{
        background: `linear-gradient(160deg, ${a} 0%, ${b} 52%, ${c} 100%)`,
      }}
    >
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, transparent 0 18px, rgba(255,255,255,.18) 18px 19px)",
        }}
      />
      <div className="absolute left-[12%] top-[18%] h-[46%] w-px bg-white/50" />
      <div className="absolute bottom-[16%] left-[12%] right-[18%] h-px bg-secondary-1/80" />
      {framed && (
        <span className="absolute bottom-3 right-3 font-unbounded text-[9px] uppercase tracking-[0.22em] text-white/80">
          Placeholder
        </span>
      )}
    </div>
  );
}
