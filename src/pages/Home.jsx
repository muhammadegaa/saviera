import { useEffect } from "react";
import { Link } from "react-router-dom";
import HeroSlider from "../components/HeroSlider";
import Placeholder from "../components/Placeholder";
import Reveal from "../components/Reveal";
import { IconArrow } from "../components/Icons";
import { INSTAGRAM_URL, products } from "../data/products";
import { useContent } from "../lib/useContent";

const trust = [
  {
    kicker: "01",
    title: "Secure Transactions",
    body: "Order through Shopee or message us directly from Instagram.",
  },
  {
    kicker: "02",
    title: "Sustainable Packaging",
    body: "Your order arrives in a recycled, compostable bag. Learn how to reuse it",
    href: "/sav-to-wear-01#recycle-packaging",
    link: "here",
  },
  {
    kicker: "03",
    title: "Co-create is in Our DNA",
    body: "A collaboration or an invention? Write",
    href: "mailto:fairy@saviera.co",
    link: "fairy@saviera.co",
    after: " with the subject “Hot Stuff”.",
  },
];

const ticker = ["Small batches", "Limited drops", "Made in Indonesia", "#SAVTOWEAR", "Free size", "Natural cloth"];
const posts = [
  { tone: "linen", span: "md:col-span-2 md:row-span-2" },
  { tone: "clay", span: "" },
  { tone: "sand", span: "" },
  { tone: "taupe", span: "" },
  { tone: "mauve", span: "" },
  { tone: "ink", span: "" },
];

export default function Home() {
  const { content } = useContent();
  const home = content.homepage;

  useEffect(() => {
    document.title = "Slow Fashion & Eco-Conscious Modern Staple | Saviera";
  }, []);

  return (
    <>
      <HeroSlider>
        <p className="font-unbounded text-[10px] tracking-[0.42em]">VOL 01 · ARCHETYPES</p>
        <h1 className="mt-4 font-aboreto text-5xl tracking-[0.28em] md:text-8xl">SAVIERA</h1>
        <h2 className="mt-6 max-w-3xl font-forum text-3xl leading-none md:text-5xl">{home.headline}</h2>
        <p className="mt-5 max-w-xl font-trap text-sm leading-relaxed text-primary-2/90 md:text-base">{home.story}</p>
        <Link to="/about-us" className="mt-6 inline-flex items-center font-montserrat text-sm tracking-[0.18em] text-primary-2">
          {home.cta} <IconArrow />
        </Link>
      </HeroSlider>

      <div className="overflow-hidden border-y border-secondary-1/50 bg-primary-1 py-3">
        <div className="ticker-track flex w-max gap-10 font-unbounded text-[10px] uppercase tracking-[0.32em]">
          {[...ticker, ...ticker].map((item, index) => (
            <span key={`${item}-${index}`} className="px-2">
              {item}
            </span>
          ))}
        </div>
      </div>

      <section id="savieraProduct" className="mx-auto max-w-site px-6 py-20 md:py-28">
        <div className="flex items-end justify-between">
          <p className="font-forum text-4xl md:text-6xl">The first three.</p>
          <Link to="/01-archetypes" className="hidden font-montserrat text-xs tracking-[0.2em] text-accent-2 md:inline">
            THE COLLECTION
          </Link>
        </div>
        <div className="mt-10 flex gap-6 overflow-x-auto pb-4 md:grid md:grid-cols-3 md:overflow-visible">
          {products.map((product, index) => (
            <Reveal key={product.slug} delay={index * 100} className="min-w-[78%] md:min-w-0">
              <Link to={product.path} className="group block">
                <div className="relative">
                  <Placeholder
                    tone={product.tone}
                    label={`${product.name} preview placeholder`}
                    className="aspect-[3/4] w-full"
                  />
                  <span className="absolute left-4 top-4 font-unbounded text-[10px] tracking-[0.28em] text-primary-2">
                    0{index + 1}
                  </span>
                </div>
                <div className="mt-4 flex items-baseline justify-between">
                  <h3 className="font-aboreto text-3xl">{product.title}</h3>
                  <span className="font-montserrat text-xs tracking-[0.18em] text-accent-1">MORE</span>
                </div>
                <p className="mt-2 line-clamp-2 font-trap text-sm">{product.summary}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="grid bg-secondary-2 text-primary-2 md:grid-cols-2">
        <Placeholder tone="ink" label="Care instruction campaign placeholder" className="min-h-[420px] w-full" framed={false} />
        <div className="flex flex-col justify-center px-8 py-16 md:px-16">
          <p className="font-unbounded text-[10px] tracking-[0.32em] text-secondary-1">CARE</p>
          <h2 className="mt-4 font-forum text-4xl leading-tight md:text-6xl">{home.promoTitle}</h2>
          <p className="mt-6 max-w-md font-trap leading-relaxed text-primary-2/85">{home.promoBody}</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-site gap-12 px-6 py-20 md:grid-cols-3">
        {trust.map((item) => (
          <article key={item.title} className="border-t border-secondary-1 pt-6">
            <p className="font-unbounded text-[10px] tracking-[0.28em] text-accent-2">{item.kicker}</p>
            <h2 className="mt-3 font-aboreto text-2xl">{item.title}</h2>
            <p className="mt-3 font-trap text-sm leading-relaxed">
              {item.body}{" "}
              {item.href && (
                <a href={item.href} className="underline decoration-secondary-1 underline-offset-4">
                  {item.link}
                </a>
              )}
              {item.after}
            </p>
          </article>
        ))}
      </section>

      <section className="bg-primary-2 px-6 pb-28 pt-16">
        <div className="mx-auto flex max-w-site items-end justify-between">
          <h2 className="font-forum text-4xl">Worn, then told.</h2>
          <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="font-montserrat text-xs tracking-[0.2em]">
            @saviera.co
          </a>
        </div>
        <div className="mx-auto mt-8 grid max-w-site grid-cols-2 gap-3 md:grid-cols-4">
          {posts.map((post, index) => (
            <a key={post.tone} href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className={post.span}>
              <Placeholder tone={post.tone} label={`Instagram placeholder ${index + 1}`} className="aspect-square h-full w-full" />
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
