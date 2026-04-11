import Link from "next/link";

const footerColumns = [
  {
    title: "Shop",
    links: ["New In", "Women", "Men", "Kids", "Accessories"],
  },
  {
    title: "Customer Care",
    links: ["Track Order", "Shipping Policy", "Returns & Exchange", "Size Guide", "Contact Support"],
  },
  {
    title: "Company",
    links: ["About TRT", "Store Locator", "Careers", "Editorial", "Gift Cards"],
  },
] as const;

const socials = [
  {
    name: "Instagram",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4.5 w-4.5">
        <rect x="3" y="3" width="18" height="18" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4.5 w-4.5">
        <path
          d="M13.4 21v-7h2.3l.5-3h-2.8V9.4c0-.9.3-1.5 1.5-1.5h1.4V5.2c-.7-.1-1.4-.2-2.1-.2-2.2 0-3.7 1.3-3.7 3.8V11H8v3h2.5v7h2.9Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    name: "TikTok",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4.5 w-4.5">
        <path
          d="M14.8 5c.4 1.4 1.4 2.4 2.8 2.8V11a5.9 5.9 0 0 1-2.8-.7v4.9A5.2 5.2 0 1 1 9.6 10h.3v3.1h-.3a2.1 2.1 0 1 0 2.1 2.1V4.9h3.1Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4.5 w-4.5">
        <path
          d="M21.2 8.3c-.2-1-.9-1.7-1.9-1.9C17.7 6 12 6 12 6s-5.7 0-7.3.4c-1 .2-1.7.9-1.9 1.9-.4 1.6-.4 3.7-.4 3.7s0 2.1.4 3.7c.2 1 .9 1.7 1.9 1.9 1.6.4 7.3.4 7.3.4s5.7 0 7.3-.4c1-.2 1.7-.9 1.9-1.9.4-1.6.4-3.7.4-3.7s0-2.1-.4-3.7ZM10.3 14.9V9.1l5.1 2.9-5.1 2.9Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-14 border-t border-[var(--border)] bg-[linear-gradient(180deg,#fbfbf9_0%,#f2f2ed_100%)]">
      <div className="mx-auto w-full max-w-[1400px] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="grid gap-8 rounded-3xl border border-black/10 bg-white/90 p-6 shadow-[0_18px_45px_rgba(0,0,0,0.08)] backdrop-blur-sm sm:p-8 lg:grid-cols-[1.4fr_2fr] lg:p-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--accent)]">TRT Premium Club</p>
            <h2 className="mt-3 max-w-[16ch] font-serif text-3xl leading-tight text-[#181818] sm:text-4xl">
              Fashion updates, limited drops and private offers.
            </h2>
            <p className="mt-4 max-w-[46ch] text-sm leading-6 text-[#575757] sm:text-[0.95rem]">
              Join our newsletter for first access to seasonal edits, exclusive campaigns and member-only style notes.
            </p>

            <form className="mt-6 flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                aria-label="Email address"
                className="w-full rounded-full border border-black/15 bg-white px-5 py-3 text-sm outline-none transition focus:border-[var(--accent)]"
              />
              <button
                type="submit"
                className="rounded-full bg-[#171717] px-6 py-3 text-sm font-semibold text-white transition hover:bg-black"
              >
                Subscribe
              </button>
            </form>

            <div className="mt-6 flex flex-wrap items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[#505050]">
              <span className="rounded-full border border-black/15 px-3 py-1.5">Secure Checkout</span>
              <span className="rounded-full border border-black/15 px-3 py-1.5">Fast Delivery</span>
              <span className="rounded-full border border-black/15 px-3 py-1.5">Easy Returns</span>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#202020]">{column.title}</h3>
                <ul className="mt-4 space-y-3">
                  {column.links.map((link) => (
                    <li key={link}>
                      <Link href="#" className="text-sm text-[#505050] transition hover:text-[#111]">
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-7 flex flex-col gap-4 border-t border-black/10 pt-6 text-sm text-[#555] sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} TRT Traditional Wear. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-3">
            {socials.map((social) => (
              <Link
                key={social.name}
                href={social.href}
                aria-label={social.name}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/15 bg-white text-[#333] transition hover:border-black/30 hover:text-black"
              >
                {social.icon}
                <span className="sr-only">{social.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
