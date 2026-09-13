import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      // Show when page has scrolled down more than 350px
      if (window.scrollY > 350) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      title="Go to top"
      className={`group fixed bottom-6 left-6 z-40 flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-950/10 bg-white/95 text-emerald-900 shadow-xl shadow-emerald-950/15 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 hover:shadow-emerald-900/25 focus:outline-none focus:ring-4 focus:ring-emerald-200 ${
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto scale-100"
          : "opacity-0 translate-y-4 pointer-events-none scale-95"
      }`}
    >
      <ArrowUp className="h-5 w-5 transition-transform group-hover:-translate-y-0.5" />
    </button>
  );
}
