import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function handleScroll() {
      const scrollY = window.scrollY;
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;

      if (scrollableHeight > 0) {
        const percent = Math.min(100, Math.max(0, (scrollY / scrollableHeight) * 100));
        setProgress(percent);
      } else {
        setProgress(0);
      }

      // Show promptly once user scrolls past 120px
      setVisible(scrollY > 120);
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

  // Circular progress SVG constants (viewBox 0 0 48 48)
  const size = 48;
  const strokeWidth = 3;
  const radius = (size - strokeWidth) / 2; // 22.5px
  const circumference = 2 * Math.PI * radius; // ~141.37px
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      title="Scroll to top"
      className={`group fixed bottom-[5.25rem] right-6 z-30 flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white/95 text-emerald-950 shadow-xl shadow-emerald-950/20 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-emerald-600 hover:text-white focus:outline-none focus:ring-4 focus:ring-emerald-200 ${
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto scale-100"
          : "opacity-0 translate-y-4 pointer-events-none scale-90"
      }`}
    >
      {/* Circular scroll progress ring */}
      <svg
        className="pointer-events-none absolute inset-0 -rotate-90"
        width="100%"
        height="100%"
        viewBox={`0 0 ${size} ${size}`}
        aria-hidden="true"
      >
        {/* Background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          className="stroke-emerald-950/10 group-hover:stroke-white/25"
        />
        {/* Animated scroll progress fill */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="stroke-emerald-600 transition-[stroke-dashoffset] duration-150 ease-out group-hover:stroke-white"
        />
      </svg>

      {/* Up arrow sign (icon symbol only, no text) */}
      <ArrowUp
        className="relative z-10 h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-200 group-hover:-translate-y-0.5"
        strokeWidth={2.5}
        aria-hidden="true"
      />
    </button>
  );
}
