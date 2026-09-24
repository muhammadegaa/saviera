import { useEffect, useState } from "react";
import api, { restoreToken, setToken } from "../lib/api";
import fallback from "../../server/content.json";

export default function Dashboard() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [tab, setTab] = useState("homepage");
  const [draft, setDraft] = useState(fallback);

  useEffect(() => {
    document.title = "Saviera Dashboard";
    const token = restoreToken();
    if (!token) return;
    setAuthed(true);
    api.get("/api/content").then((response) => setDraft(response.data)).catch(() => setError("Could not load content"));
  }, []);

  async function login(event) {
    event.preventDefault();
    setError("");
    try {
      const response = await api.post("/api/login", { password });
      setToken(response.data.token);
      const content = await api.get("/api/content");
      setDraft(content.data);
      setAuthed(true);
    } catch {
      setError("That password does not open the studio.");
    }
  }

  function updateHome(key, value) {
    setDraft((current) => ({ ...current, homepage: { ...current.homepage, [key]: value } }));
  }

  function updateAbout(key, value) {
    setDraft((current) => ({ ...current, about: { ...current.about, [key]: value } }));
  }

  async function save(event) {
    event.preventDefault();
    setNotice("");
    setError("");
    try {
      await api.put("/api/content", draft);
      setNotice("Saved to the local content file.");
    } catch {
      setError("Save failed. Log in again if the session dropped.");
    }
  }

  if (!authed) {
    return (
      <section className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-6 py-16">
        <h1 className="font-aboreto text-4xl tracking-[0.14em]">SAVIERA</h1>
        <p className="mt-3 font-montserrat">Dashboard</p>
        <form onSubmit={login} className="mt-8 flex flex-col gap-4">
          <label className="font-unbounded text-[10px] uppercase tracking-[0.2em]" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="border border-secondary-2 bg-transparent px-3 py-3 font-trap outline-none"
          />
          {error && <p className="font-trap text-accent-1">{error}</p>}
          <button type="submit" className="bg-secondary-2 py-3 font-montserrat font-bold text-primary-1">
            Login
          </button>
        </form>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-3xl px-6 py-12">
      <div className="flex items-end justify-between">
        <h1 className="font-aboreto text-4xl">Saviera Dashboard</h1>
        <button
          type="button"
          className="whitespace-nowrap font-montserrat text-sm underline"
          onClick={() => {
            setToken(null);
            setAuthed(false);
          }}
        >
          Log out
        </button>
      </div>
      <div className="mt-8 flex gap-6 font-montserrat">
        <button type="button" className={tab === "homepage" ? "border-b border-accent-1" : ""} onClick={() => setTab("homepage")}>
          Homepage
        </button>
        <button type="button" className={tab === "about" ? "border-b border-accent-1" : ""} onClick={() => setTab("about")}>
          About Us
        </button>
      </div>
      <form onSubmit={save} className="mt-8 flex flex-col gap-5">
        {tab === "homepage" ? (
          <>
            <Field label="Headline" value={draft.homepage.headline} onChange={(value) => updateHome("headline", value)} />
            <Field label="Story" value={draft.homepage.story} onChange={(value) => updateHome("story", value)} rows={5} />
            <Field label="Story CTA" value={draft.homepage.cta} onChange={(value) => updateHome("cta", value)} />
            <Field label="Promo title" value={draft.homepage.promoTitle} onChange={(value) => updateHome("promoTitle", value)} />
            <Field label="Promo body" value={draft.homepage.promoBody} onChange={(value) => updateHome("promoBody", value)} rows={4} />
          </>
        ) : (
          <>
            <Field label="Hero" value={draft.about.hero} onChange={(value) => updateAbout("hero", value)} />
            <Field label="Lead" value={draft.about.lead} onChange={(value) => updateAbout("lead", value)} rows={4} />
            <Field label="Vision" value={draft.about.vision} onChange={(value) => updateAbout("vision", value)} rows={4} />
            <Field label="Status title" value={draft.about.statusTitle} onChange={(value) => updateAbout("statusTitle", value)} />
            <Field label="Status paragraphs" value={draft.about.status.join("\n\n")} onChange={(value) => updateAbout("status", value.split(/\n\n+/))} rows={8} />
            <Field label="Sentiment intro" value={draft.about.sentimentIntro} onChange={(value) => updateAbout("sentimentIntro", value)} rows={3} />
            <Field label="People" value={draft.about.people.join("\n")} onChange={(value) => updateAbout("people", value.split("\n").filter(Boolean))} rows={6} />
            <Field label="Planet" value={draft.about.planet.join("\n")} onChange={(value) => updateAbout("planet", value.split("\n").filter(Boolean))} rows={6} />
            <Field label="Profit" value={draft.about.profit.join("\n")} onChange={(value) => updateAbout("profit", value.split("\n").filter(Boolean))} rows={6} />
            <Field label="Closing" value={draft.about.closing} onChange={(value) => updateAbout("closing", value)} rows={4} />
          </>
        )}
        {error && <p className="font-trap text-accent-1">{error}</p>}
        {notice && <p className="font-trap text-accent-2">{notice}</p>}
        <button type="submit" className="bg-accent-1 py-3 font-montserrat text-primary-2">
          Save
        </button>
      </form>
    </section>
  );
}

function Field({ label, value, onChange, rows = 1 }) {
  const shared = "mt-2 w-full border border-secondary-2/40 bg-primary-2 px-3 py-2 font-trap outline-none";
  return (
    <label className="block font-montserrat text-sm">
      {label}
      {rows > 1 ? (
        <textarea rows={rows} className={shared} value={value} onChange={(event) => onChange(event.target.value)} />
      ) : (
        <input className={shared} value={value} onChange={(event) => onChange(event.target.value)} />
      )}
    </label>
  );
}
