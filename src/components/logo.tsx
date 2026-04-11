import Image from "next/image";

export function TRTLogo() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-[var(--border)] bg-[var(--background)] shadow-[0_8px_24px_rgba(17,17,17,0.08)]">
        <Image
          src="/assets/logo/logo1.webp"
          alt="TRT logo"
          width={44}
          height={44}
          className="h-11 w-11 object-cover"
          priority
        />
      </div>
      <div className="leading-none">
        <p className="text-[1.95rem] font-light tracking-[0.22em] text-[var(--foreground)]">TRT</p>
        <p className="mt-1 text-[0.7rem] font-medium uppercase tracking-[0.33em] text-[var(--muted)]">
          Traditional Wear
        </p>
      </div>
    </div>
  );
}