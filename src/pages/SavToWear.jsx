import { useEffect, useState } from "react";
import Photo from "../components/Photo";
import { products } from "../data/products";

export default function SavToWear() {
  const [active, setActive] = useState(products[0]);
  const [noted, setNoted] = useState(false);

  useEffect(() => {
    document.title = "Especially For You - Saviera";
  }, []);

  return (
    <article>
      <header className="relative overflow-hidden">
        <Photo
          src={{ path: "collection/linen", hd: true }}
          alt="Linen close to the body"
          eager
          className="kenburns warm aspect-[4/5] w-full object-cover md:aspect-[12/5]"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-secondary-2/55 px-6 text-center text-primary-2">
          <h1 className="font-aboreto text-4xl tracking-[0.14em] md:text-6xl">YAY! YOU HAVE MADE IT!</h1>
          <p className="mt-5 max-w-xl font-trap">
            You have intentionally chosen a small step toward your own conscious fashion staple movement through our very first collection, Archetypes.
          </p>
        </div>
      </header>

      <section className="mx-auto max-w-3xl px-6 py-16 text-center font-trap">
        <p>
          ARCHETYPES collection provides essential staples that are versatile and purposeful. Curated in minimalistic earth tone, all-size, breathable, and effortlessly chic. Please help us to improve by leaving a note on the piece you carry.
        </p>
        <p className="mt-6">
          Use <strong>#SAVTOWEAR #SAVVYSISSY</strong> on social media and <strong>tag us.</strong>
          <br />
          Get a special <strong>20k IDR cashback</strong> (we will contact you!)
        </p>
        <p className="mt-6">Scroll to understand the item(s) you just owned. Tell a story about it, and generate discussions with your community!</p>
        <button
          type="button"
          className="mt-8 border border-accent-1 px-6 py-3 font-montserrat text-accent-1"
          onClick={() => {
            setNoted(true);
            document.getElementById("care")?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          CLICK HERE!
        </button>
        {noted && <p className="mt-4 font-montserrat text-sm">Noted. Care for the piece lives just below.</p>}
      </section>

      <section id="care" className="bg-cream-1 px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-montserrat text-3xl font-bold">Care Instruction</h2>
          <p className="mt-3 font-trap">Find how to take care of your beloved staple so it will be with you for a longer time.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {products.map((product) => (
              <button
                key={product.slug}
                type="button"
                onClick={() => setActive(product)}
                className={`border px-4 py-2 font-montserrat ${active.slug === product.slug ? "border-secondary-2 bg-secondary-2 text-primary-1" : "border-secondary-2/40"}`}
              >
                {product.name}
              </button>
            ))}
          </div>
          <ul className="mt-6 list-disc space-y-2 pl-5 font-trap">
            {active.care.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
      </section>

      <section id="recycle-packaging" className="mx-auto max-w-3xl px-6 py-16 font-trap">
        <div className="mb-10 grid grid-cols-3 gap-2">
          <Photo src="packaging/mailer" alt="The oxo-biodegradable mailer bag" className="aspect-square w-full object-cover" />
          <Photo src="packaging/tissue" alt="Compostable tissue wrap and recycled-paper hang tags" className="aspect-square w-full object-cover" />
          <Photo src="packaging/thank-you" alt="Hand-painted thank-you cards" className="aspect-square w-full object-cover" />
        </div>
        <h2 className="font-montserrat text-3xl font-bold">Eco-Packaging</h2>
        <p className="mt-3">Know how to repurpose, reuse and recycle your order packaging.</p>
        <p className="mt-6">Your poly mailer bag is oxo-biodegradable. Which means, in two years, it will break off. In the meantime, you can reuse it as a desk-trash bin until it reaches its life cycle.</p>
        <p className="mt-4">Tissue paper wrap is compostable. If you don’t compost, bring it to a composting facility, or reuse it as:</p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>Wardrobe freshener (spray with linen sprays, let it dry a bit, and put it on your drawer/in-between clothes);</li>
          <li>Party decorations or;</li>
          <li>Decorative gift wraps.</li>
        </ul>
        <p className="mt-4">Hang Tag made of recycled paper. Repurpose as a bookmark. Reuse the ramie rope and pin attached to the hangtag.</p>
        <p className="mt-4">Thank You Card is a repurposed sketch paper hand-painted by our fairy. Reuse it as a decorative desk or information piece of your clothing item!</p>
      </section>
    </article>
  );
}
