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
    title: "Secure Transactions",
    body: "Order through Shopee or message us directly from Instagram/Pinterest.",
  },
  {
    title: "Sustainable Packaging",
    body: "Receive your order in a fully recycled and compostable bag. Learn how to reuse and recycle your packaging",
    href: "/sav-to-wear-01#recycle-packaging",
    link: "here",
  },
  {
    title: "Co-create is in Our DNA",
    body: "Got any ideas for collaboration or inventions? Email at",
    href: "mailto:fairy@saviera.co",
    link: "fairy@saviera.co",
    after: " with the subject “Hot Stuff”",
  },
];

const posts = [1, 2, 3, 4, 5, 6, 7, 8];

export default function Home() {
  const { content } = useContent();
  const home = content.homepage;

  useEffect(() => {
    document.title = "Slow Fashion & Eco-Conscious Modern Staple | Saviera";
  }, []);

  return (
    <>
      <HeroSlider />
      <section className="mx-auto flex max-w-[800px] flex-col items-center px-6 py-16 text-center md:py-20">
        <h2 className="font-aboreto text-3xl text-secondary-2 md:text-4xl">{home.headline}</h2>
        <p className="mb-8 mt-5 text-justify font-trap">{home.story}</p>
        <Link to="/about-us" className="inline-flex items-center font-montserrat font-medium text-accent-1">
          {home.cta} <IconArrow />
        </Link>
      </section>

      <section className="relative">
        <Placeholder tone="ink" label="Care instruction campaign placeholder" className="min-h-[420px] w-full md:min-h-[520px]" />
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 px-6 text-center text-primary-2">
          <Reveal>
            <h2 className="font-aboreto text-3xl md:text-5xl">{home.promoTitle}</h2>
            <p className="mx-auto mt-5 max-w-xl font-trap">{home.promoBody}</p>
          </Reveal>
        </div>
      </section>

      <section id="savieraProduct" className="mx-auto grid max-w-site grid-cols-1 gap-8 px-6 py-16 md:grid-cols-3 md:gap-6">
        {products.map((product, index) => (
          <Reveal key={product.slug} delay={index * 120} className="flex flex-col">
            <Placeholder tone={product.tone} label={`${product.name} preview placeholder`} className="aspect-[384/413] w-full" />
            <Link
              to={product.path}
              className="mt-0 flex items-center justify-center border border-accent-2 py-4 font-montserrat text-accent-2"
            >
              MORE <IconArrow />
            </Link>
          </Reveal>
        ))}
      </section>

      <section className="bg-primary-1 px-6 py-8">
        <div className="mx-auto hidden max-w-site gap-10 md:grid md:grid-cols-3">
          {trust.map((item) => (
            <TrustCard key={item.title} item={item} />
          ))}
        </div>
        <div className="flex snap-x gap-6 overflow-x-auto md:hidden">
          {trust.map((item) => (
            <div key={item.title} className="min-w-[80%] snap-center">
              <TrustCard item={item} />
            </div>
          ))}
        </div>
      </section>

      <section className="bg-primary-2 px-6 pb-40 pt-20">
        <div className="mx-auto max-w-site">
          <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="font-unbounded text-xs tracking-[0.22em]">
            @saviera.co
          </a>
          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
            {posts.map((post, index) => (
              <a key={post} href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="block">
                <Placeholder
                  tone={["linen", "clay", "sand", "taupe", "mauve", "ink", "brown", "porcelain"][index]}
                  label={`Instagram placeholder ${post}`}
                  className="aspect-square w-full"
                />
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function TrustCard({ item }) {
  return (
    <article className="text-center">
      <div className="mx-auto h-20 w-20 rounded-full border border-secondary-1" aria-hidden="true" />
      <h2 className="mb-3 mt-6 font-montserrat text-2xl">{item.title}</h2>
      <p className="font-trap">
        {item.body}{" "}
        {item.href && (
          <a href={item.href} className="underline">
            {item.link}
          </a>
        )}
        {item.after}
      </p>
    </article>
  );
}
