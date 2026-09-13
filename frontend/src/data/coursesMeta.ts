export interface CourseVisualMeta {
  badge: string;
  isPopular?: boolean;
  highlightText: string;
  gradientHeader: string;
  borderClass: string;
  badgeClass: string;
  image: string;
  imageAlt: string;
  cyberSecurityFocus: string;
  techPills: { label: string; bg: string; text: string }[];
  accentColor: string;
}

export const COURSE_VISUAL_META: Record<string, CourseVisualMeta> = {
  "coding-creative-logic": {
    badge: "Foundation Pathway",
    isPopular: false,
    highlightText: "Friendly First Steps in Real Logic",
    gradientHeader: "from-[#0b3328] via-[#0f4436] to-[#062019]",
    borderClass: "border-emerald-950/10 hover:border-emerald-500/40 hover:shadow-emerald-950/10",
    badgeClass: "bg-emerald-50 text-emerald-800 border-emerald-200/60",
    image: "/images/course_scratch_3d.png",
    imageAlt: "3D block coding and interactive visual logic blocks",
    cyberSecurityFocus: "Safe browsing, strong passwords, and spotting fake popup traps.",
    accentColor: "text-emerald-700",
    techPills: [
      { label: "Visual Logic", bg: "bg-emerald-50 text-emerald-800 border border-emerald-200/50", text: "text-emerald-800" },
      { label: "Scratch 3.0", bg: "bg-amber-50 text-amber-800 border border-amber-200/50", text: "text-amber-800" },
      { label: "Game Physics", bg: "bg-teal-50 text-teal-800 border border-teal-200/50", text: "text-teal-800" },
      { label: "Cyber Safety", bg: "bg-emerald-100/80 text-emerald-900 border border-emerald-300/60", text: "text-emerald-900" },
    ],
  },
  "web-creator-lab": {
    badge: "Web Creator Pathway",
    isPopular: true,
    highlightText: "Real Digital Products in Production",
    gradientHeader: "from-[#0c3131] via-[#124240] to-[#071f1f]",
    borderClass: "border-2 border-emerald-500 shadow-2xl shadow-emerald-700/15 hover:shadow-emerald-700/25 ring-4 ring-emerald-500/10",
    badgeClass: "bg-amber-50 text-amber-900 border border-amber-200/60 font-black",
    image: "/images/course_web_3d.png",
    imageAlt: "3D responsive web development workstation with HTML and CSS",
    cyberSecurityFocus: "HTTPS encryption, login hygiene, and protecting personal identity online.",
    accentColor: "text-amber-600",
    techPills: [
      { label: "HTML5 Semantics", bg: "bg-orange-50 text-orange-800 border border-orange-200/50", text: "text-orange-800" },
      { label: "CSS3 & Flexbox", bg: "bg-sky-50 text-sky-800 border border-sky-200/50", text: "text-sky-800" },
      { label: "JavaScript Logic", bg: "bg-amber-50 text-amber-800 border border-amber-200/50", text: "text-amber-800" },
      { label: "Web Security", bg: "bg-emerald-100/80 text-emerald-900 border border-emerald-300/60", text: "text-emerald-900" },
    ],
  },
  "practical-ai-for-students": {
    badge: "Future Skills Pathway",
    isPopular: false,
    highlightText: "Critical Thinking in the Age of AI",
    gradientHeader: "from-[#0b2638] via-[#103750] to-[#061824]",
    borderClass: "border-teal-950/10 hover:border-teal-500/40 hover:shadow-teal-950/10",
    badgeClass: "bg-teal-50 text-teal-800 border-teal-200/60",
    image: "/images/promo_2_3d.png",
    imageAlt: "3D friendly AI mentor robot with luminous intelligence network",
    cyberSecurityFocus: "Prompt data privacy, verifying AI hallucinations, and safeguarding family info.",
    accentColor: "text-teal-700",
    techPills: [
      { label: "Prompt Engineering", bg: "bg-indigo-50 text-indigo-800 border border-indigo-200/50", text: "text-indigo-800" },
      { label: "Fact-Verification", bg: "bg-teal-50 text-teal-800 border border-teal-200/50", text: "text-teal-800" },
      { label: "Study Automation", bg: "bg-purple-50 text-purple-800 border border-purple-200/50", text: "text-purple-800" },
      { label: "AI Safety & Ethics", bg: "bg-emerald-100/80 text-emerald-900 border border-emerald-300/60", text: "text-emerald-900" },
    ],
  },
};
