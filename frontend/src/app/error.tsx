"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error("Page rendering failed", error);
  }, [error]);

  return (
    <section className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-5 py-20 text-center">
      <h1 className="font-display text-4xl font-black text-[#102a25]">We could not load this page.</h1>
      <p className="mt-5 text-base leading-7 text-[#597068]">Please try again. If the problem continues, contact us and we will help.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button type="button" onClick={reset} className="rounded-xl bg-emerald-800 px-6 py-3 font-bold text-white hover:bg-emerald-900">Try again</button>
        <Link href="/contact" className="rounded-xl border border-emerald-800 px-6 py-3 font-bold text-emerald-900 hover:bg-emerald-50">Contact us</Link>
      </div>
    </section>
  );
}
