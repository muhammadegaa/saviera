import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import {
  FACEBOOK_URL,
  INSTAGRAM_URL,
  PINTEREST_URL,
  SHOPEE_URL,
  orderLink,
  products,
} from "../data/products";
import { IconArrow, IconInstagram, IconMenu, IconSearch, IconShopee } from "./Icons";

const links = [
  { to: "/01-archetypes", label: "VOL 01. ARCHETYPES" },
  { to: "/#savieraProduct", label: "SHOP" },
  { to: "/about-us", label: "ABOUT US" },
];

export default function Layout({ children }) {
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();
  const [atTop, setAtTop] = useState(true);
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const [query, setQuery] = useState("");
  const home = pathname === "/";
  const healr = pathname === "/healr";

  useEffect(() => {
    const onScroll = () => setAtTop(window.scrollY < 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenu(false);
    setSearch(false);
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }
    const timer = setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView(), 50);
    return () => clearTimeout(timer);
  }, [pathname, hash]);

  useEffect(() => {
    document.body.style.overflow = menu || search ? "hidden" : "";
  }, [menu, search]);

  const matches = products.filter((product) => product.name.toLowerCase().includes(query.trim().toLowerCase()));

  return (
    <div className="min-h-screen bg-primary-1 text-secondary-2">
      <header
        className={`sticky top-0 z-[60] transition-colors duration-500 ${
          atTop ? "bg-primary-1" : "bg-primary-1/90 backdrop-blur-md"
        }`}
      >
        <nav className="mx-auto grid h-20 max-w-site grid-cols-[1fr_auto] items-center px-6 md:h-[100px] md:grid-cols-[1fr_auto_1fr] md:px-12">
          <div className="hidden gap-10 font-montserrat text-[11px] tracking-[0.18em] md:flex">
            {links.map((link) => (
              <NavLink key={link.label} to={link.to} className="transition-colors hover:text-accent-1">
                {link.label}
              </NavLink>
            ))}
          </div>
          <Link
            to="/"
            aria-label="Saviera home"
            className={`font-aboreto text-xl tracking-[0.36em] transition-opacity duration-500 md:text-3xl md:tracking-[0.42em] ${
              home && atTop ? "opacity-0" : "opacity-100"
            }`}
          >
            SAVIERA
          </Link>
          <div className="flex items-center justify-end gap-3 md:gap-4">
            <a href={SHOPEE_URL} target="_blank" rel="noreferrer" aria-label="Shopee" className="hidden md:inline-flex">
              <IconShopee />
            </a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" aria-label="Instagram">
              <IconInstagram />
            </a>
            <button type="button" aria-label="Search" onClick={() => setSearch(true)}>
              <IconSearch />
            </button>
            <button
              type="button"
              className="md:hidden"
              aria-label={menu ? "Close menu" : "Open menu"}
              aria-expanded={menu}
              onClick={() => setMenu((open) => !open)}
            >
              <IconMenu open={menu} />
            </button>
          </div>
        </nav>
        {menu && (
          <div className="fade-in fixed inset-x-0 bottom-0 top-20 flex flex-col justify-between bg-primary-1 px-6 pb-10 pt-6 md:hidden">
            <div className="flex flex-col">
              {links.map((link) => (
                <NavLink
                  key={link.label}
                  to={link.to}
                  onClick={() => setMenu(false)}
                  className="border-b border-secondary-1/60 py-5 font-aboreto text-2xl tracking-[0.14em]"
                >
                  {link.label}
                </NavLink>
              ))}
              <ul className="mt-6 flex flex-col gap-3 font-forum text-xl">
                {products.map((product) => (
                  <li key={product.slug}>
                    <Link to={product.path} onClick={() => setMenu(false)}>
                      {product.name} <span className="text-secondary-2/60">— {product.fabric.toLowerCase()}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-3 font-montserrat text-xs tracking-[0.2em] text-accent-2">
              <a href={orderLink("a piece from Vol 01. Archetypes")} target="_blank" rel="noreferrer">
                ORDER ON WHATSAPP
              </a>
              <a href={SHOPEE_URL} target="_blank" rel="noreferrer">
                SHOPEE
              </a>
              <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
                INSTAGRAM
              </a>
            </div>
          </div>
        )}
      </header>

      {search && (
        <div className="fixed inset-0 z-[70] bg-secondary-2/40" onClick={() => setSearch(false)}>
          <form
            className="mx-4 mt-24 max-w-xl bg-primary-1 p-6 md:mx-auto md:mt-28"
            onClick={(event) => event.stopPropagation()}
            onSubmit={(event) => {
              event.preventDefault();
              if (matches[0]) navigate(matches[0].path);
              setSearch(false);
            }}
          >
            <label className="font-unbounded text-[10px] uppercase tracking-[0.22em]" htmlFor="site-search">
              Search the item here
            </label>
            <input
              id="site-search"
              autoFocus
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={(event) => event.key === "Escape" && setSearch(false)}
              className="mt-3 w-full border border-secondary-2 bg-transparent px-3 py-3 font-trap outline-none"
              placeholder="Omnia, Wei Yi, Cyanne"
            />
            <ul className="mt-4 font-montserrat">
              {(query ? matches : products).map((product) => (
                <li key={product.slug}>
                  <button
                    type="button"
                    className="w-full py-2 text-left hover:text-accent-1"
                    onClick={() => {
                      navigate(product.path);
                      setSearch(false);
                    }}
                  >
                    {product.name}
                  </button>
                </li>
              ))}
            </ul>
          </form>
        </div>
      )}

      <main className="overflow-x-clip">{children}</main>

      {!healr && (
        <footer className="border-t border-secondary-1/60 bg-primary-1 px-6 pb-10 pt-16 md:px-12 md:pt-24">
          <div className="mx-auto grid max-w-site gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
            <div>
              <img src="/favicon.svg" alt="" className="h-12 w-12" />
              <p className="mt-6 max-w-xs font-forum text-2xl leading-snug">
                Timeless, free-size staples. Small batches, sourced and made in Indonesia.
              </p>
            </div>
            <FooterColumn title="SHOP">
              {products.map((product) => (
                <FooterLink key={product.slug} to={product.path}>
                  {product.name}
                </FooterLink>
              ))}
              <FooterLink to="/01-archetypes">Vol 01. Archetypes</FooterLink>
            </FooterColumn>
            <FooterColumn title="ORDER">
              <FooterLink href={orderLink("a piece from Vol 01. Archetypes")}>WhatsApp</FooterLink>
              <FooterLink href={SHOPEE_URL}>Shopee</FooterLink>
              <FooterLink href={INSTAGRAM_URL}>Instagram</FooterLink>
              <FooterLink href="mailto:fairy@saviera.co">fairy@saviera.co</FooterLink>
            </FooterColumn>
            <FooterColumn title="SAVIERA">
              <FooterLink to="/about-us">About us</FooterLink>
              <FooterLink to="/sav-to-wear-01">Care & packaging</FooterLink>
              <FooterLink href={FACEBOOK_URL}>Facebook</FooterLink>
              <FooterLink href={PINTEREST_URL}>Pinterest</FooterLink>
            </FooterColumn>
          </div>
          <div className="mx-auto mt-16 flex max-w-site justify-between border-t border-secondary-1/40 pt-6 font-montserrat text-xs">
            <p>Saviera © {dayjs().year()}</p>
            <p>Jakarta, Indonesia</p>
          </div>
        </footer>
      )}
    </div>
  );
}

function FooterColumn({ title, children }) {
  return (
    <div>
      <p className="font-unbounded text-[10px] tracking-[0.28em] text-secondary-1">{title}</p>
      <div className="mt-5 flex flex-col items-start gap-3">{children}</div>
    </div>
  );
}

function FooterLink({ to, href, children }) {
  const className = "group inline-flex items-center font-montserrat text-sm transition-colors hover:text-accent-2";
  const arrow = (
    <span className="opacity-0 transition-opacity group-hover:opacity-100">
      <IconArrow />
    </span>
  );
  return to ? (
    <Link to={to} className={className}>
      {children}
      {arrow}
    </Link>
  ) : (
    <a href={href} target="_blank" rel="noreferrer" className={className}>
      {children}
      {arrow}
    </a>
  );
}
