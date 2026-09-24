import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import {
  FACEBOOK_URL,
  INSTAGRAM_URL,
  PINTEREST_URL,
  SHOPEE_URL,
  products,
} from "../data/products";
import {
  IconArrow,
  IconFacebook,
  IconInstagram,
  IconMail,
  IconMenu,
  IconSearch,
  IconShopee,
} from "./Icons";

const links = [
  { to: "/01-archetypes", label: "VOL 01. ARCHETYPES" },
  { to: "/#savieraProduct", label: "SHOP" },
  { to: "/about-us", label: "ABOUT US" },
];

function lightAtTop(pathname) {
  return pathname === "/" || pathname === "/about-us";
}

export default function Layout({ children }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [atTop, setAtTop] = useState(true);
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const [query, setQuery] = useState("");
  const healr = pathname === "/healr";
  const light = atTop && lightAtTop(pathname);

  useEffect(() => {
    const onScroll = () => setAtTop(window.scrollY < 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    setMenu(false);
    setSearch(false);
  }, [pathname]);

  const matches = products.filter((product) =>
    product.name.toLowerCase().includes(query.trim().toLowerCase()),
  );

  const tone = light ? "text-primary-2" : "text-secondary-2";
  const bar = light
    ? "bg-transparent"
    : "bg-[#c8c8c8] md:bg-primary-1";

  return (
    <div className="min-h-screen bg-primary-1 text-secondary-2">
      <header className={`sticky top-0 z-[60] transition-colors duration-500 ${bar}`}>
        <nav className="mx-auto grid h-20 max-w-site grid-cols-[auto_1fr_auto] items-center gap-4 px-6 md:h-[100px] md:grid-cols-[1fr_auto_1fr]">
          <div className={`hidden items-center justify-between gap-8 font-montserrat text-sm tracking-wide md:flex ${tone}`}>
            {links.map((link) =>
              link.to.startsWith("/#") ? (
                <a key={link.label} href={link.to}>
                  {link.label}
                </a>
              ) : (
                <NavLink key={link.label} to={link.to}>
                  {link.label}
                </NavLink>
              ),
            )}
          </div>
          <Link
            to="/"
            className={`col-start-2 justify-self-center px-6 font-aboreto text-2xl tracking-[0.42em] md:px-10 md:text-3xl ${tone}`}
            aria-label="Saviera home"
          >
            SAVIERA
          </Link>
          <div className={`col-start-3 flex items-center justify-end ${tone}`}>
            <a href={SHOPEE_URL} target="_blank" rel="noreferrer" aria-label="Shopee" className="mr-4">
              <IconShopee />
            </a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" aria-label="Instagram" className="mr-4">
              <IconInstagram />
            </a>
            <a href={FACEBOOK_URL} target="_blank" rel="noreferrer" aria-label="Facebook" className="mr-2 hidden md:inline-flex">
              <IconFacebook />
            </a>
            <button type="button" aria-label="Search" onClick={() => setSearch(true)} className="ml-2">
              <IconSearch />
            </button>
            <button
              type="button"
              className="ml-3 md:hidden"
              aria-label={menu ? "Close menu" : "Open menu"}
              onClick={() => setMenu((open) => !open)}
            >
              <IconMenu open={menu} />
            </button>
          </div>
        </nav>
        {menu && (
          <div className="flex flex-col gap-6 bg-primary-1 px-6 py-8 font-montserrat text-secondary-2 md:hidden">
            {links.map((link) =>
              link.to.startsWith("/#") ? (
                <a key={link.label} href={link.to} onClick={() => setMenu(false)}>
                  {link.label}
                </a>
              ) : (
                <NavLink key={link.label} to={link.to} onClick={() => setMenu(false)}>
                  {link.label}
                </NavLink>
              ),
            )}
          </div>
        )}
      </header>

      {search && (
        <div className="fixed inset-0 z-[70] bg-secondary-2/40" onClick={() => setSearch(false)}>
          <form
            className="mx-auto mt-28 max-w-xl bg-primary-1 p-6"
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

      <main>{children}</main>

      {!healr && (
        <footer className="bg-primary-1 px-6 pb-10 pt-16 text-secondary-2">
          <div className="mx-auto flex max-w-site flex-col items-center gap-10 md:flex-row md:items-stretch md:justify-between">
            <div className="max-w-sm text-center md:text-left">
              <p className="font-aboreto text-4xl tracking-[0.28em]">SAVIERA</p>
              <p className="mt-4 font-trap">
                is an eco-conscious fashion brand that intentionally aims for a timeless, versatile, and original fashion staple.
              </p>
              <p className="mt-3 text-center font-trap md:text-left">
                Small batches.
                <br />
                Limited Drops.
                <br />
                Sourced and made locally
              </p>
              <div className="mt-5 flex flex-col items-center gap-2 md:items-start">
                <FooterLink to="/01-archetypes">Vol 01. Archetypes</FooterLink>
                <FooterLink to="/sav-to-wear-01">Feedback & Reviews</FooterLink>
                <FooterLink to="/about-us">FAQ</FooterLink>
              </div>
            </div>
            <span className="h-px w-2/5 bg-secondary-1 md:h-auto md:w-px" />
            <div className="w-full max-w-sm text-center">
              <p className="font-aboreto text-3xl">HERE FOR YOU</p>
              <p className="mb-3 mt-3 font-trap">
                Order,
                <br />
                Complaints,
                <br />
                Inquiries, and
                <br />
                Feedback:
              </p>
              <a className="mt-2 hidden items-center justify-center gap-2 rounded border border-accent-2 py-3 text-accent-2 md:flex" href="mailto:fairy@saviera.co">
                <IconMail /> Email us: fairy@saviera.co
              </a>
              <p className="py-2 text-center opacity-50">or</p>
              <a className="hidden items-center justify-center gap-2 rounded border border-accent-2 py-3 text-accent-2 md:flex" href="mailto:saviera.starlist@gmail.com">
                <IconMail /> saviera.starlist@gmail.com
              </a>
              <div className="mt-4 bg-cream-1 p-3 font-trap">
                <strong>Shop anytime, from anywhere</strong>
              </div>
            </div>
            <span className="h-px w-2/5 bg-secondary-1 md:h-auto md:w-px" />
            <div className="text-center md:text-left">
              <p className="font-unbounded text-xs tracking-[0.2em]">KEEP IN TOUCH</p>
              <div className="mt-4 flex flex-col gap-2 font-montserrat">
                <a href={FACEBOOK_URL} target="_blank" rel="noreferrer">Facebook</a>
                <a href={PINTEREST_URL} target="_blank" rel="noreferrer">Pinterest</a>
                <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">Instagram</a>
                <a href={SHOPEE_URL} target="_blank" rel="noreferrer">Shop 24/7</a>
              </div>
              <form
                className="relative mt-6"
                onSubmit={(event) => {
                  event.preventDefault();
                  setSearch(true);
                }}
              >
                <input
                  aria-label="Search the item here"
                  placeholder="Search the item here"
                  className="w-full border border-secondary-2 bg-transparent px-3 py-2 font-poppins text-sm"
                  onFocus={() => setSearch(true)}
                  readOnly
                />
              </form>
            </div>
          </div>
          <p className="mt-12 text-center font-montserrat text-sm">Saviera © {dayjs().year()}</p>
        </footer>
      )}
    </div>
  );
}

function FooterLink({ to, children }) {
  return (
    <Link to={to} className="inline-flex items-center font-montserrat text-accent-2">
      {children}
      <IconArrow />
    </Link>
  );
}
