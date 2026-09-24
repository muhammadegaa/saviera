export function IconShopee() {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" aria-hidden="true">
      <path d="M8 13h16l-1.2 12H9.2L8 13z" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path d="M12 13c0-4 8-4 8 0" fill="none" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

export function IconInstagram() {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" aria-hidden="true">
      <rect x="7" y="7" width="18" height="18" rx="4" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="16" cy="16" r="4" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="21.5" cy="10.5" r="1" fill="currentColor" />
    </svg>
  );
}

export function IconSearch() {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" aria-hidden="true">
      <circle cx="14" cy="14" r="6" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path d="M19 19l6 6" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

export function IconMenu({ open }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true">
      {open ? (
        <path d="M8 8l16 16M24 8L8 24" stroke="currentColor" strokeWidth="1.4" />
      ) : (
        <path d="M6 10h20M6 16h20M6 22h20" stroke="currentColor" strokeWidth="1.4" />
      )}
    </svg>
  );
}

export function IconArrow() {
  return (
    <svg width="22" height="12" viewBox="0 0 22 12" aria-hidden="true" className="ml-2">
      <path d="M0 6h20M15 1l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}
