export type ProgramId = "foundation" | "professional" | "mastery";
export type Interest = "software" | "cybersecurity" | "ai" | "mobile" | "research";

export interface Program {
  id: ProgramId;
  name: string;
  duration: string;
  audience: string;
  outcome: string;
  skills: string[];
  approach: string;
  phases: { period: string; title: string; topics: string[] }[];
}

export const programs: Program[] = [
  {
    id: "foundation",
    name: "Foundation Technology Mentorship",
    duration: "6 months",
    audience: "Complete beginners, technology explorers, and career changers",
    outcome: "Build a technology mindset and the confidence to learn, solve, and secure basic systems independently.",
    skills: ["Computational thinking", "Personalized programming", "Debugging", "Responsible AI", "Security awareness"],
    approach: "A mentor selects the first language and projects around your goals, background, and interests. The sequence adapts as your ability grows.",
    phases: [
      { period: "Month 1", title: "Technology mindset", topics: ["How computers and software work", "How programmers think", "Break large problems into smaller steps", "Logic exercises and a debugging mindset"] },
      { period: "Months 2–3", title: "Programming foundation", topics: ["Choose a language for your goals rather than a fixed syllabus", "Variables, logic, functions, data structures, and algorithms", "Clean code and reading documentation", "Build and explain small original projects"] },
      { period: "Month 4", title: "Problem-solving system", topics: ["Analyze requirements and decompose problems", "Search and read technical documentation", "Debug systematically and test assumptions"] },
      { period: "Month 5", title: "AI-assisted development", topics: ["Ask better technical questions", "Review and verify AI-generated code", "Understand AI limitations and use it as a learning partner"] },
      { period: "Month 6", title: "Cybersecurity foundation", topics: ["Security mindset and common vulnerabilities", "Authentication and secure coding basics", "Privacy awareness and basic networking"] },
    ],
  },
  {
    id: "professional",
    name: "Professional Technology Mentorship",
    duration: "12 months",
    audience: "Career-focused students, university learners, aspiring developers, and professionals changing fields",
    outcome: "Move from foundations to real-world projects, portfolio evidence, and professional technical practice.",
    skills: ["Architecture", "APIs and databases", "Git and cloud", "Applied security", "Portfolio and communication"],
    approach: "Begin with the Foundation journey, then deepen the technologies and projects most relevant to your career direction.",
    phases: [
      { period: "Months 1–6", title: "Complete Foundation", topics: ["Technology mindset, programming, problem solving, AI-assisted learning, and cybersecurity"] },
      { period: "Months 7–9", title: "Professional engineering", topics: ["Software architecture and advanced algorithms", "Git, APIs, databases, and cloud fundamentals", "Build and document real-world projects"] },
      { period: "Months 10–11", title: "Applied cybersecurity", topics: ["Network and web application security", "Vulnerability assessment basics", "Threat modelling and secure development lifecycle"] },
      { period: "Month 12", title: "Career readiness", topics: ["Portfolio and technical communication", "Problem-solving interviews", "Open-source contribution and industry practices"] },
    ],
  },
  {
    id: "mastery",
    name: "Technology Mastery Apprenticeship",
    duration: "18 months+",
    audience: "Learners seeking sustained transformation and a specialized technology direction",
    outcome: "Develop the independence to research unfamiliar tools, design ambitious systems, and adapt as technology changes.",
    skills: ["Advanced specialization", "Research habits", "Complex projects", "System design", "Technical independence"],
    approach: "Complete the earlier stages, then follow a mentor-shaped specialization with progressively independent projects and reviews.",
    phases: [
      { period: "Months 1–12", title: "Foundation + Professional", topics: ["Build the full technology, engineering, security, and career foundation"] },
      { period: "Months 13–18+", title: "Specialized apprenticeship", topics: ["Choose software engineering, cybersecurity, AI/data, mobile, or research", "Design, build, critique, and improve ambitious projects", "Read primary sources and learn unfamiliar technologies independently"] },
    ],
  },
];

export const specializations: Record<Interest, { name: string; path: string[]; focus: string[] }> = {
  software: { name: "Software Engineering", path: ["Programming logic", "JavaScript or another goal-fit language", "Web and APIs", "Databases", "Full-stack projects", "System design"], focus: ["Full-stack development", "Software architecture", "System design"] },
  cybersecurity: { name: "Cybersecurity", path: ["Programming logic", "Python", "Linux", "Networking", "Security fundamentals", "Ethical hacking and defense"], focus: ["Security research methodology", "Vulnerability analysis", "Defensive security"] },
  ai: { name: "AI & Data", path: ["Programming logic", "Python", "Data analysis", "Machine learning foundations", "AI engineering", "Applied projects"], focus: ["Data analysis", "Machine learning", "AI engineering concepts"] },
  mobile: { name: "Mobile Development", path: ["Programming logic", "Kotlin or Swift", "Mobile development", "App projects", "Testing and deployment"], focus: ["Android", "iOS", "Cross-platform development"] },
  research: { name: "Technical Research", path: ["Programming logic", "Goal-fit language", "Reading papers", "Experiment design", "Research project"], focus: ["Technical research skills", "Experiment design", "Building new knowledge"] },
};

export interface Assessment {
  age: number;
  country: string;
  education: string;
  currentSkills: string;
  careerGoal: string;
  weeklyHours: number;
  learningStyle: string;
  interest: Interest;
  preferredLanguage: string;
  program: ProgramId;
}

export interface Roadmap {
  program: Program;
  specialization: typeof specializations[Interest];
  language: string;
  stages: string[];
  weeklyGoals: string[];
  guidance: string;
}

export function createRoadmap(input: Assessment): Roadmap {
  const program = programs.find((item) => item.id === input.program) || programs[0];
  const specialization = specializations[input.interest];
  const language = input.preferredLanguage.trim() || ({ software: "JavaScript", cybersecurity: "Python", ai: "Python", mobile: /ios|apple|iphone/i.test(input.careerGoal) ? "Swift" : "Kotlin", research: "Python" } as Record<Interest, string>)[input.interest];
  const startingPoint = input.currentSkills.trim()
    ? `Review existing skills (${input.currentSkills.trim().slice(0, 100)}) and fill foundational gaps`
    : input.age < 16
      ? "Explore how computers and software work through guided logic projects and problem decomposition"
      : "Understand how computers and software work through goal-related problems and decomposition";
  const foundation = [startingPoint, `Learn programming foundations through ${language} and a goal-fit project`, "Practice requirements, documentation, debugging, and testing", "Use AI to question, review, and verify your own work", "Apply privacy, networking, authentication, and secure coding basics"];
  const extended = input.program === "foundation" ? [] : ["Build a version-controlled project using APIs, data, and cloud concepts", "Practice threat modelling, technical communication, and portfolio presentation"];
  const mastery = input.program === "mastery" ? [`Pursue ${specialization.name} through independent projects and mentor critique`] : [];
  const styleGoal = input.learningStyle === "Visual explanations" ? "Sketch one system or debugging flow" : input.learningStyle === "Reading and research" ? "Read and summarize one primary technical resource" : input.learningStyle === "Guided discussion" ? "Prepare three questions for your mentor" : "Build and test one small project improvement";
  const weeklyGoals = input.weeklyHours < 4
    ? ["One focused mentor session", "Two short independent practice blocks", styleGoal]
    : ["One focused mentor session", "Two build-and-debug practice blocks", styleGoal, "Record a weekly project reflection"];
  return {
    program,
    specialization,
    language,
    stages: [...foundation, ...extended, ...mastery],
    weeklyGoals,
    guidance: `Start with ${language} as a working recommendation for your ${specialization.name.toLowerCase()} goal: ${input.careerGoal.trim()}. Your mentor can change the language after reviewing your ${input.education.toLowerCase()} background, preferred ${input.learningStyle.toLowerCase()} style, and project interests. Discuss study or career opportunities relevant to ${input.country} during your live assessment.`,
  };
}
