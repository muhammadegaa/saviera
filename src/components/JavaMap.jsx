import { useEffect, useRef, useState } from "react";

// Java coastline from Natural Earth (public domain), projected and simplified to 375 points.
const JAVA =
  "M498.2 216.7L495.6 217.4L472.0 210.9L454.5 208.8L448.1 210.0L445.1 207.4L445.9 205.1L442.2 203.7L414.2 201.0L408.9 202.4L405.6 205.8L401.5 202.6L395.5 201.9L392.5 200.1L391.0 192.9L386.1 195.0L379.4 201.5L374.2 198.7L372.0 199.4L370.1 201.4L370.1 204.5L367.8 204.0L366.7 201.0L356.3 201.5L352.9 204.4L351.8 212.0L347.3 214.8L334.2 214.6L314.8 211.4L295.4 206.5L286.4 207.0L282.7 205.4L282.3 202.4L280.5 200.8L267.8 198.4L265.2 193.4L258.1 188.8L246.5 185.5L245.4 183.2L239.4 180.9L234.2 181.8L218.5 179.8L207.7 176.8L147.2 172.1L142.7 168.3L137.8 166.9L134.1 168.7L134.1 164.1L131.9 161.6L132.2 154.9L136.0 148.7L141.2 147.5L141.9 146.4L140.1 144.3L149.0 134.8L148.7 127.4L146.1 125.3L142.7 125.6L139.7 124.4L136.7 125.3L134.5 128.4L125.9 128.8L119.2 125.4L113.9 120.1L110.2 120.3L105.7 118.2L98.3 112.0L90.8 110.1L82.6 111.3L81.1 113.3L80.0 111.8L69.5 113.4L62.0 112.0L46.7 114.0L44.9 115.7L40.8 114.5L39.6 115.2L37.0 112.9L32.9 114.1L31.0 111.5L26.2 109.5L21.3 109.4L17.6 113.4L15.7 112.5L13.5 106.9L11.6 105.3L12.8 104.2L17.6 104.2L22.5 99.8L25.1 94.7L26.9 94.0L31.4 98.4L31.8 101.8L34.8 107.6L38.1 109.9L40.0 109.2L44.1 100.2L53.8 90.7L53.5 80.2L56.1 74.9L59.4 74.2L59.8 78.1L62.8 80.4L70.3 78.1L74.7 70.0L75.5 48.5L79.2 36.1L81.5 31.9L90.4 22.8L92.7 16.0L94.9 13.3L98.3 12.1L101.6 12.6L103.9 15.3L105.0 23.0L109.5 25.5L111.3 26.0L114.7 24.4L119.5 18.4L124.0 18.8L130.4 23.9L141.6 28.1L144.2 28.1L149.8 25.1L164.0 25.9L167.7 27.8L169.6 33.3L175.2 35.4L197.2 32.0L198.3 27.6L196.5 25.0L199.4 20.2L198.7 16.7L201.3 15.6L208.4 18.1L214.4 22.5L225.6 19.8L233.4 22.0L245.4 39.8L255.1 43.9L261.1 44.2L267.0 49.5L269.3 48.3L272.6 48.8L277.9 46.0L280.8 46.7L280.8 44.4L282.3 43.9L286.1 46.2L288.3 44.0L289.4 48.6L310.0 58.7L315.2 58.3L320.4 54.6L321.9 52.0L319.7 48.8L320.8 48.5L326.0 50.4L332.8 50.6L334.6 52.0L337.6 50.4L339.1 60.1L347.7 70.7L356.3 75.5L363.0 104.2L369.0 104.8L377.9 109.5L382.4 109.4L386.9 106.9L398.5 113.4L402.2 112.5L404.1 107.1L406.3 107.1L419.0 114.1L440.7 116.1L449.6 114.5L455.2 108.3L459.3 111.8L479.5 114.8L501.5 121.0L522.1 118.4L526.2 114.1L529.9 118.7L538.1 121.9L544.8 126.3L547.5 126.5L558.3 122.6L567.2 112.0L574.7 96.5L576.6 83.6L578.4 79.2L577.3 76.9L580.7 75.6L583.7 72.3L595.2 68.2L603.8 66.8L608.7 69.6L612.8 68.6L617.7 73.7L624.0 92.4L627.0 97.0L647.1 99.1L656.1 97.7L662.8 89.8L674.8 94.0L681.1 101.2L688.2 106.4L703.2 109.2L708.8 106.5L712.9 106.5L722.2 118.0L726.3 119.8L752.8 115.5L758.4 116.8L760.3 115.5L767.0 119.8L771.5 120.5L773.0 119.4L773.7 115.2L775.6 115.5L777.8 119.1L776.0 129.1L779.3 133.4L783.4 133.0L784.2 134.8L779.3 136.6L779.0 138.7L786.1 147.3L785.7 149.3L784.2 150.0L777.8 149.3L779.7 151.6L787.9 155.8L792.4 150.5L795.0 150.0L798.0 151.9L800.6 156.5L799.9 169.6L799.1 171.7L795.0 174.3L794.3 176.1L794.3 184.6L802.9 191.1L815.9 196.8L824.9 198.4L832.7 205.2L839.8 207.4L843.9 206.5L849.9 211.6L861.8 206.1L873.8 202.4L887.2 204.4L894.0 203.1L900.3 205.1L907.8 199.9L915.6 200.7L924.2 193.8L927.6 193.1L937.3 202.4L942.9 203.8L949.6 202.4L956.3 207.5L962.3 207.9L969.0 212.1L971.3 216.0L970.5 222.7L968.3 226.6L969.0 235.1L964.5 250.3L959.7 277.5L961.2 281.0L961.5 288.1L963.0 288.9L964.2 287.7L964.9 280.5L966.4 282.2L966.8 292.5L969.0 296.7L970.5 298.3L983.6 303.1L987.7 308.5L987.3 311.2L984.7 314.7L980.2 315.1L971.3 311.9L960.8 311.2L963.4 307.0L962.7 303.2L954.1 297.6L950.0 297.6L943.2 301.1L940.6 298.5L932.4 300.4L928.7 299.7L926.1 296.9L920.5 298.5L919.4 296.9L920.1 293.0L919.0 292.5L914.5 294.1L905.9 290.4L904.4 291.9L902.5 286.1L899.2 286.8L896.9 288.9L894.0 288.9L892.5 285.2L888.7 285.4L885.4 281.7L880.9 280.5L878.3 278.2L873.8 278.5L869.7 276.4L867.5 273.2L865.2 272.9L861.8 274.5L852.5 266.0L843.9 263.0L839.4 262.6L821.5 265.3L808.8 275.9L804.0 274.8L801.7 273.0L799.9 275.2L796.5 274.1L792.8 276.9L787.9 277.8L784.9 280.5L769.2 274.6L761.0 274.6L754.3 272.5L755.1 271.1L750.6 268.5L745.7 268.1L740.5 269.5L736.8 267.6L717.7 265.6L712.1 262.8L706.9 265.3L704.7 264.8L702.4 262.3L693.8 260.5L691.6 263.2L691.6 266.9L689.3 267.6L687.8 264.4L686.0 264.2L683.7 269.0L685.2 271.5L683.7 272.5L679.3 271.1L677.0 267.6L675.2 269.0L669.9 266.9L665.1 268.1L658.0 266.3L657.2 262.6L655.7 261.7L652.0 262.5L649.0 261.0L642.7 261.2L640.1 259.6L628.5 263.2L627.0 260.2L623.3 258.9L622.1 255.4L618.4 260.2L613.2 260.3L595.6 254.7L581.1 253.6L579.6 252.0L547.1 241.3L541.9 236.0L537.7 235.3L511.2 221.7Z";

// Positions in the 1000 × 327 viewBox; distances are straight lines to Jakarta. bend > 0 bows the route north.
export const towns = {
  Jakarta: { x: 181, y: 46, km: 0 },
  Bandung: { x: 261, y: 120, km: 116, bend: 0.12 },
  Sukoharjo: { x: 596, y: 197, km: 471, bend: -0.1 },
  Bojonegoro: { x: 703, y: 145, km: 566, bend: 0.07 },
};

function route({ x, y, bend }) {
  const { x: jx, y: jy } = towns.Jakarta;
  // (y - jy, jx - x) is perpendicular to the route and points north for these west-bound routes.
  const cx = (x + jx) / 2 + (y - jy) * bend;
  const cy = (y + jy) / 2 + (jx - x) * bend;
  return `M${x} ${y} Q${cx.toFixed(1)} ${cy.toFixed(1)} ${jx} ${jy}`;
}

export default function JavaMap({ active }) {
  const ref = useRef(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDrawn(true);
      return undefined;
    }
    const observer = new IntersectionObserver(([entry]) => entry.isIntersecting && setDrawn(true), { threshold: 0.3 });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const dim = (town) => active && active !== town;

  return (
    <div ref={ref} className="relative">
      <svg viewBox="0 0 1000 327" role="img" aria-label="Map of Java with Jakarta, Bandung, Sukoharjo and Bojonegoro" className="w-full overflow-visible">
        <path d={JAVA} fill="rgba(246,243,236,0.04)" stroke="#BF9553" strokeWidth="1.2" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
        {Object.entries(towns)
          .filter(([name]) => name !== "Jakarta")
          .map(([name, town], index) => (
            <path
              key={name}
              d={route(town)}
              pathLength="1"
              fill="none"
              stroke="#F6F3EC"
              strokeWidth={active === name ? 2 : 1.2}
              strokeDasharray="1"
              strokeDashoffset={drawn ? 0 : 1}
              vectorEffect="non-scaling-stroke"
              style={{
                transition: `stroke-dashoffset 2.4s cubic-bezier(0.2,0.7,0.1,1) ${index * 350}ms, opacity 0.5s, stroke-width 0.3s`,
                opacity: dim(name) ? 0.15 : 0.85,
              }}
            />
          ))}
        <circle cx={towns.Jakarta.x} cy={towns.Jakarta.y} r="16" fill="none" stroke="#BF9553" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        {Object.entries(towns).map(([name, town]) => (
          <circle
            key={name}
            cx={town.x}
            cy={town.y}
            r={active === name ? 8 : 5}
            fill="#F6F3EC"
            style={{ transition: "r 0.3s, opacity 0.5s", opacity: dim(name) ? 0.3 : 1 }}
          />
        ))}
      </svg>
      {Object.entries(towns).map(([name, town]) => (
        <p
          key={name}
          className="pointer-events-none absolute whitespace-nowrap font-unbounded text-[8px] tracking-[0.22em] transition-opacity duration-500 md:text-[10px]"
          style={{
            left: `${(town.x / 1000) * 100}%`,
            top: `${(town.y / 327) * 100}%`,
            transform: name === "Jakarta" ? "translate(-50%, -260%)" : "translate(-50%, 90%)",
            opacity: dim(name) ? 0.3 : 1,
          }}
        >
          {name.toUpperCase()}
          <span className="text-secondary-1"> · {town.km ? `${town.km} KM` : "WORKROOM"}</span>
        </p>
      ))}
    </div>
  );
}
