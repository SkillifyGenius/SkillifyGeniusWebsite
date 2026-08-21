import {
  Course,
  CurriculumModule,
  ProjectEvidence,
  StudentGrowthProfile,
  TrialBooking,
  LeadInquiry,
  BlogPost,
  ParentReview,
  RCALog,
  User,
  MentorReport,
  ParentGrowthTimelineItem,
  PlatformAnalytics,
  AiMentorRequest,
  AiMentorResponse,
  ProjectStatus,
  EngineeringGrowthMetrics,
  ProductFeedback,
  AnalyticsEvent,
} from "../../../src/types/index.js";
import { isAppwriteConfigured, appwriteDatabases, APPWRITE_DB_ID } from "../config/appwrite.js";
import { ID } from "node-appwrite";


// ==============================================================================
// SEED DATA FOR THE 7 APPWRITE COLLECTIONS & CORE DOMAINS
// ==============================================================================

const INITIAL_USERS: User[] = [
  {
    id: "user-101",
    userId: "student-101",
    name: "Liam Vance",
    email: "liam@example.com",
    role: "student",
    studentId: "student-101",
    createdAt: new Date(Date.now() - 86400000 * 60).toISOString(),
  },
  {
    id: "user-201",
    userId: "parent-201",
    name: "Elena Vance",
    email: "elena.vance@example.com",
    role: "parent",
    studentId: "student-101",
    createdAt: new Date(Date.now() - 86400000 * 60).toISOString(),
  },
  {
    id: "user-301",
    userId: "mentor-301",
    name: "Alex",
    email: "alex@skillifygenius.com",
    role: "mentor",
    createdAt: new Date(Date.now() - 86400000 * 180).toISOString(),
  },
  {
    id: "user-401",
    userId: "admin-401",
    name: "Platform Director",
    email: "admin@skillifygenius.com",
    role: "admin",
    createdAt: new Date(Date.now() - 86400000 * 365).toISOString(),
  },
];

const INITIAL_STUDENTS: StudentGrowthProfile[] = [
  {
    studentId: "student-101",
    studentName: "Liam Vance",
    age: 13,
    grade: "8th Grade",
    currentPhase: 2,
    level: "Full-Stack Creator (Level 2)",
    activeSprint: "Phase 2: Creator Lab - Web Architecture & Appwrite Cloud",
    learningPath: "full-stack-web-apps",
    metrics: {
      problemSolving: 82,
      selfLearning: 88,
      programming: 74,
      systemThinking: 68,
      creativity: 85,
      engineeringMindset: 76,
      updatedAt: new Date().toISOString(),
    },
    verifiedProjectsCount: 5,
    challengesSolved: 34,
    strengths: [
      "Deconstructing nested UI component hierarchies",
      "Autonomous error tracing and RCA documentation",
      "Asynchronous fetch pipelines and REST endpoints",
    ],
    focusAreas: [
      "Defensive input validation schemas with Zod",
      "Optimizing complex SQL/NoSQL query joins",
      "Automated unit testing coverage",
    ],
    recentMentorNotes:
      "Liam showed outstanding self-direction this week. When encountering an asynchronous state synchronization race condition, he used the Socratic prompt ladder to identify the missing useEffect dependency without asking for direct answers.",
    isAtRisk: false,
  },
  {
    studentId: "student-102",
    studentName: "Sophia Chen",
    age: 15,
    grade: "10th Grade",
    currentPhase: 3,
    level: "AI Systems Builder (Level 3)",
    activeSprint: "Phase 3: AI Automation - LLM Agent Pipelines",
    learningPath: "ai-tools-automation",
    metrics: {
      problemSolving: 91,
      selfLearning: 94,
      programming: 88,
      systemThinking: 85,
      creativity: 92,
      engineeringMindset: 86,
      updatedAt: new Date().toISOString(),
    },
    verifiedProjectsCount: 8,
    challengesSolved: 52,
    strengths: [
      "Multi-agent prompt orchestration",
      "Python data transformation pipelines",
      "API webhook security hygiene",
    ],
    focusAreas: [
      "Benchmarking LLM latency vs token cost tradeoffs",
      "Vector embeddings semantic search architecture",
    ],
    recentMentorNotes:
      "Sophia built an autonomous homework synthesis bot with local Markdown export. High code cleanliness.",
    isAtRisk: false,
  },
  {
    studentId: "student-103",
    studentName: "Noah Sterling",
    age: 11,
    grade: "6th Grade",
    currentPhase: 1,
    level: "Junior Explorer (Level 1)",
    activeSprint: "Phase 1: Foundation - Computational Logic & Loop Physics",
    learningPath: "game-development-track",
    metrics: {
      problemSolving: 64,
      selfLearning: 60,
      programming: 58,
      systemThinking: 52,
      creativity: 78,
      engineeringMindset: 55,
      updatedAt: new Date().toISOString(),
    },
    verifiedProjectsCount: 2,
    challengesSolved: 14,
    strengths: [
      "Creative game mechanics design",
      "Spatial 2D coordinate calculations",
    ],
    focusAreas: [
      "Debugging infinite while-loops before execution",
      "Consistent variable naming conventions",
    ],
    recentMentorNotes:
      "Noah needs reinforcement on tracking variable states across function scopes. Scheduled 15-min diagnostic review.",
    isAtRisk: true,
    atRiskReason: "Struggling with conditional nesting in physics challenge 3. Needs 1:1 check-in.",
  },
];

const INITIAL_PROJECTS: ProjectEvidence[] = [
  {
    id: "proj-1",
    title: "Gravity Escape: 2D Physics Engine",
    slug: "gravity-escape-2d-physics-engine",
    studentId: "student-101",
    studentName: "Liam Vance",
    studentAge: 13,
    phase: 1,
    description:
      "A custom-built HTML5 Canvas arcade platformer featuring velocity vectors, restitution physics, collision boundary calculations, and particle trails without external libraries.",
    skillsDemonstrated: [
      "Coordinate Geometry",
      "Velocity & Acceleration Physics",
      "State Machines",
      "Frame-rate Delta Timing",
    ],
    demoUrl: "https://gravity-escape.demo.skillifygenius.com",
    repoUrl: "https://github.com/SkillifyGenius/gravity-escape-student",
    frameworkStage: "defend",
    mentorFeedback:
      "Liam engineered the collision matrix from first mathematical principles. Flawless variable scoping and clean modular render loops.",
    mentorName: "Alex (Senior Technology Mentor)",
    status: "verified_capstone",
    createdAt: "2026-01-15T10:00:00Z",
  },
  {
    id: "proj-2",
    title: "Smart Task & Habit OS with Appwrite",
    slug: "smart-task-habit-os-appwrite",
    studentId: "student-101",
    studentName: "Liam Vance",
    studentAge: 13,
    phase: 2,
    description:
      "A full-stack productivity web app utilizing JavaScript ES6+, localStorage caching, and asynchronous REST API synchronization to a cloud Appwrite backend database.",
    skillsDemonstrated: [
      "REST API Data Flow",
      "NoSQL Data Schemas",
      "DOM Manipulation",
      "Asynchronous JavaScript",
    ],
    demoUrl: "https://habitos.demo.skillifygenius.com",
    repoUrl: "https://github.com/SkillifyGenius/smart-habit-os",
    frameworkStage: "defend",
    mentorFeedback:
      "Demonstrated impressive defensive error handling for offline network drops and database latency.",
    mentorName: "Alex (Senior Technology Mentor)",
    status: "approved",
    createdAt: "2026-02-20T14:30:00Z",
  },
  {
    id: "proj-3",
    title: "AI Study Mentor & Flashcard Synthesizer",
    slug: "ai-study-mentor-synthesizer",
    studentId: "student-102",
    studentName: "Sophia Chen",
    studentAge: 15,
    phase: 3,
    description:
      "An automated study companion that takes raw textbook notes, structures them into active recall flashcards, and generates spaced repetition schedules using Socratic prompting.",
    skillsDemonstrated: [
      "LLM Prompt Engineering",
      "Task Automation",
      "Python Scripting",
      "JSON Schema Output Enforcement",
    ],
    demoUrl: "https://study-ai.demo.skillifygenius.com",
    repoUrl: "https://github.com/SkillifyGenius/study-ai-synthesizer",
    frameworkStage: "defend",
    mentorFeedback:
      "Sophia crafted few-shot system instructions that mitigate AI hallucinations. Excellent engineering maturity.",
    mentorName: "Elena (AI Curriculum Specialist)",
    status: "verified_capstone",
    createdAt: "2026-03-02T11:20:00Z",
  },
  {
    id: "proj-4",
    title: "Cyber Defense: PassVault Password Auditor",
    slug: "passvault-password-auditor",
    studentId: "student-101",
    studentName: "Liam Vance",
    studentAge: 13,
    phase: 4,
    description:
      "An interactive web safety utility that analyzes entropy, checks against common leak patterns, and demonstrates salt/hash cryptographic concepts in-browser.",
    skillsDemonstrated: [
      "Cyber Hygiene",
      "Entropy Calculations",
      "Cryptographic Hashing Concepts",
      "XSS Defense",
    ],
    demoUrl: "https://passvault.demo.skillifygenius.com",
    repoUrl: "https://github.com/SkillifyGenius/passvault-auditor",
    frameworkStage: "defend",
    mentorFeedback:
      "Strong understanding of client-side data isolation. Built with zero third-party dependencies.",
    mentorName: "Alex (Senior Technology Mentor)",
    status: "submitted",
    createdAt: "2026-03-10T16:45:00Z",
  },
];

const INITIAL_RCA_LOGS: RCALog[] = [
  {
    id: "rca-1",
    studentId: "student-101",
    moduleId: "module-1",
    moduleTitle: "Module 1: Computational Logic & Loop Physics",
    bugSummary: "Ball clipped straight through the floor boundary during high fall speeds.",
    rootCause: "Velocity accumulated faster than frame updates without continuous collision detection (tunneling).",
    solution: "Added discrete sub-step interpolation and clamped y-velocity to max terminal speed.",
    preventionLearned: "Always clamp physics velocities and check bounding boxes per sub-frame.",
    createdAt: "2026-01-12T15:20:00Z",
  },
  {
    id: "rca-2",
    studentId: "student-101",
    moduleId: "module-2",
    moduleTitle: "Module 2: Web Architecture & DOM State",
    bugSummary: "Deleting a task caused all subsequent task indices to desynchronize in localStorage.",
    rootCause: "Used array index instead of unique UUID timestamps for item keys.",
    solution: "Refactored items to generate `crypto.randomUUID()` and filtered by ID.",
    preventionLearned: "Never use mutable array indices as persistent entity primary keys.",
    createdAt: "2026-02-18T18:40:00Z",
  },
];

const INITIAL_PARENT_TIMELINE: ParentGrowthTimelineItem[] = [
  {
    id: "pt-1",
    month: "January",
    year: 2026,
    title: "Shipped 2D Physics Game Engine",
    description: "Architected custom gravity, velocity vectors, and boundary collisions from scratch in JavaScript.",
    category: "capstone",
    badgeText: "Phase 1 Capstone",
    skillImpact: "+12% Problem Solving",
  },
  {
    id: "pt-2",
    month: "February",
    year: 2026,
    title: "Resolved 20 Debugging & RCA Challenges",
    description: "Mastered unassisted debugging and authored Root Cause Analysis reflections for edge case bugs.",
    category: "debugging",
    badgeText: "Self-Learning Milestone",
    skillImpact: "+18% Self-Learning Ability",
  },
  {
    id: "pt-3",
    month: "March",
    year: 2026,
    title: "Full-Stack Appwrite Database Integration",
    description: "Built cloud data synchronization, user session state, and responsive Tailwind layouts.",
    category: "architecture",
    badgeText: "Creator Lab Milestone",
    skillImpact: "+15% System & Cloud Thinking",
  },
];

const INITIAL_COURSES: Course[] = [
  {
    id: "c-phase-1",
    phase: 1,
    title: "AI & Coding for Smart Students",
    slug: "ai-coding-for-smart-students",
    ageGroup: "Ages 6-18 (Tracked by Age)",
    duration: "24 Weeks (Weekly 1-on-1 / Micro-Group)",
    classFrequency: "1 or 2 live sessions per week (45 mins)",
    level: "Foundation to Intermediate",
    description:
      "Cultivate the foundational Problem Solver Framework™. Move beyond passive screen time into algorithmic logic, spatial coordinate geometry, loops, and interactive games.",
    primaryOutcome:
      "Student independently architects and deploys a playable 2D physics game with custom logic mechanics.",
    skillsDeveloped: [
      "Algorithmic Thinking & Decomposition",
      "Variable State Scoping & Logic Loops",
      "2D Coordinate Physics & Collision Math",
      "Socratic Debugging & Root Cause Analysis",
    ],
    modules: [
      {
        id: "module-1",
        phase: 1,
        title: "Computational Thinking & Loop Physics",
        slug: "computational-thinking-loop-physics",
        description: "Master variables, conditional branching, velocity vectors, and game loop timing.",
        moduleOrder: 1,
        project: "Gravity Escape: 2D Physics Simulator",
        skills: ["Logic Loops", "Velocity Vectors", "Conditionals"],
        challengeBrief:
          "Challenge: Build a 2D physics loop where the ball accelerates under gravity, bounces off walls with restitution, and never tunnels through floor boundaries.",
        hints: [
          "Level 1 Hint: Define a state object holding `{ x, y, vx, vy, gravity, bounce }`.",
          "Level 2 Hint: Inside each animation tick, update `vy += gravity` before updating `y += vy`.",
          "Level 3 Hint: To stop tunneling, clamp `y` to the canvas height minus the radius before inverting `vy`.",
          "Level 4 Solution Strategy: Use `vy = -vy * bounce` when `y + radius >= canvasHeight`.",
        ],
        initialCode: `// Socratic Physics Challenge
let player = { x: 50, y: 50, vx: 2, vy: 0, gravity: 0.5, bounce: 0.7 };
const floorY = 300;

function updatePhysics() {
  player.vy += player.gravity;
  player.y += player.vy;
  player.x += player.vx;

  // TODO: Add boundary collision check here
  if (player.y >= floorY) {
    player.y = floorY;
    player.vy = -player.vy * player.bounce;
  }

  console.log("Player state: y=" + Math.round(player.y) + ", vy=" + player.vy.toFixed(2));
}

// Run 5 simulation ticks
for (let i = 0; i < 5; i++) {
  updatePhysics();
}`,
      },
      {
        id: "module-2",
        phase: 1,
        title: "Digital Creation & Coordinate Geometry",
        slug: "digital-creation-coordinate-geometry",
        description: "Coordinate math, event-driven listeners, and particle explosion engines.",
        moduleOrder: 2,
        project: "Particle Collision Fireworks",
        skills: ["Trigonometry", "Array Iteration", "Event Listeners"],
      },
      {
        id: "module-3",
        phase: 1,
        title: "Programming Foundations (ES6+ & Python)",
        slug: "programming-foundations",
        description: "Pure functions, data structures, recursion, and modular software design.",
        moduleOrder: 3,
        project: "Algorithmic Maze Generator",
        skills: ["Data Structures", "Recursion", "Clean Code"],
      },
      {
        id: "module-4",
        phase: 1,
        title: "Engineering Mindset & Defensive Hygiene",
        slug: "engineering-mindset-defense",
        description: "Edge case testing, tradeoff analysis, and systematic Root Cause Analysis.",
        moduleOrder: 4,
        project: "Automated Test Runner & RCA Logger",
        skills: ["Test Assertions", "RCA Habits", "Tradeoff Analysis"],
      },
    ],
  },
  {
    id: "c-phase-2",
    phase: 2,
    title: "Build Real Apps & Websites - Creator Lab",
    slug: "build-apps-websites-creator-lab",
    ageGroup: "Ages 12-18",
    duration: "24 Weeks",
    classFrequency: "1 or 2 live sessions per week (45 mins)",
    level: "Intermediate to Advanced",
    description:
      "Transition from isolated scripts into complete web software architecture. Build cloud-connected applications with HTML5, responsive CSS Grid, async JavaScript, and Appwrite backend databases.",
    primaryOutcome:
      "Student ships a live multi-page web application with cloud database storage, user authentication, and custom domain.",
    skillsDeveloped: [
      "Modern Semantic Web Layouts (HTML5/CSS3)",
      "Asynchronous JavaScript & REST Data Ingestion",
      "Appwrite Cloud Database & Session State",
      "Git Source Control & Vercel Cloud Deployment",
    ],
    modules: [],
  },
  {
    id: "c-phase-3",
    phase: 3,
    title: "AI Tools & Automation for Smart Students",
    slug: "ai-tools-automation-for-students",
    ageGroup: "Ages 12-18",
    duration: "16 Weeks",
    classFrequency: "1 live session per week (45 mins)",
    level: "Advanced",
    description:
      "Master modern AI tools, prompt engineering architecture, Python task automation, and autonomous research workflows.",
    primaryOutcome:
      "Student builds an automated AI study operating system that ingests notes, synthesizes flashcards, and runs automated webhooks.",
    skillsDeveloped: [
      "Chain-of-Thought Prompt Engineering",
      "Python Web Automation & Webhooks",
      "Automated Knowledge Pipelines",
      "AI Ethics, Hallucination Mitigation & Privacy",
    ],
    modules: [],
  },
  {
    id: "c-phase-4",
    phase: 4,
    title: "Cyber Safety & Ethical Defense for Teens",
    slug: "cyber-safety-ethical-hacking",
    ageGroup: "Ages 12-18",
    duration: "16 Weeks",
    classFrequency: "1 live session per week (45 mins)",
    level: "Advanced Specialization",
    description:
      "Developed from ~2 years of cybersecurity research. Learn how the web actually works, packet analysis, password entropy, and defending personal identity online.",
    primaryOutcome:
      "Student conducts a security audit of a web application and builds a client-side cryptographic password auditor.",
    skillsDeveloped: [
      "Network Protocols & Packet Flow",
      "Password Entropy & Cryptographic Hashing",
      "OWASP Top 10 Web Vulnerability Defenses",
      "Digital Footprint Auditing & Threat Modeling",
    ],
    modules: [],
  },
];

const INITIAL_TRIALS: TrialBooking[] = [
  {
    id: "tb-101",
    parentName: "Sarah Jenkins",
    parentEmail: "sarah.jenkins@example.com",
    parentPhone: "+1 (415) 555-0192",
    childName: "Ethan Jenkins",
    childAge: 12,
    country: "United States",
    timezone: "America/Los_Angeles (PST)",
    preferredSlot: new Date(Date.now() + 86400000 * 2).toISOString(),
    interests: ["Game Design & Physics", "Web Apps & Creator Lab"],
    status: "confirmed",
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
  },
  {
    id: "tb-102",
    parentName: "David Sterling",
    parentEmail: "d.sterling@example.co.uk",
    parentPhone: "+44 20 7946 0912",
    childName: "Oliver Sterling",
    childAge: 14,
    country: "United Kingdom",
    timezone: "Europe/London (GMT/BST)",
    preferredSlot: new Date(Date.now() + 86400000 * 3).toISOString(),
    interests: ["AI Tools & Automation", "Cyber Safety & Ethical Defense"],
    status: "pending",
    createdAt: new Date(Date.now() - 86400000 * 0.5).toISOString(),
  },
];

const INITIAL_LEADS: LeadInquiry[] = [
  {
    id: "lead-1",
    fullName: "Marcus Aurelius",
    email: "marcus@rome.edu",
    phone: "+1 (555) 019-2834",
    subject: "Curriculum pacing for 14-year-old with Python basics",
    message:
      "My son has built small scripts in Python. Would he start at Phase 1 or transition straight to Phase 2 Creator Lab?",
    status: "new",
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
];

const INITIAL_REVIEWS: ParentReview[] = [
  {
    id: "rev-1",
    reviewerName: "Dr. Rachel Thorne",
    role: "Parent of 13-year-old Liam",
    location: "London, UK",
    studentAge: 13,
    rating: 5,
    comment:
      "Skillify Genius has completely altered how Liam approaches schoolwork and screen time. Instead of just playing games, he now thinks about the coordinate math and physics behind them. The Socratic mentoring is extraordinary.",
    studentProjectHighlight: "Built Gravity Escape 2D Physics Game",
  },
  {
    id: "rev-2",
    reviewerName: "Markus Schneider",
    role: "Software Engineering Lead & Parent",
    location: "Zurich, Switzerland",
    studentAge: 15,
    rating: 5,
    comment:
      "As a software lead myself, I was skeptical of typical coding bootcamps for kids that just teach Scratch. Skillify Genius is the real deal-they teach Root Cause Analysis, Git architecture, and system thinking from day one.",
    studentProjectHighlight: "Built Full-Stack Cloud Habit Tracker",
  },
  {
    id: "rev-3",
    reviewerName: "Jennifer Vance",
    role: "Parent of 11-year-old Maya",
    location: "California, USA",
    studentAge: 11,
    rating: 5,
    comment:
      "The Parent Trust Portal is what sold us. I don't just see a certificate; I can click a link and test the actual live web applications Maya built with her mentor. She has grown so much in self-confidence.",
    studentProjectHighlight: "Built Interactive Maze Generator",
  },
];

const INITIAL_BLOGS: BlogPost[] = [
  {
    id: "post-1",
    title: "Why Syntax Memorization Is Obsolete in the Age of AI (And What Children Should Learn Instead)",
    slug: "why-syntax-memorization-is-obsolete",
    excerpt:
      "When LLMs can generate Python code in milliseconds, the value of memorizing semicolons drops to zero. Here is the cognitive engineering framework future-ready students need.",
    content: `When artificial intelligence can write, refactor, and generate code in seconds, the traditional coding education model is obsolete.
    
Teaching a child syntax in 2026 is like teaching penmanship in the era of word processors. It has baseline utility, but it is not where leverage and true cognitive power lie.

What truly differentiates the future creator?
1. Problem Decomposition: The ability to deconstruct an ambiguous real-world challenge into modular mathematical constraints.
2. Self-Learning Ability: Having the research discipline and curiosity to learn an unknown API or framework without spoon-feeding.
3. Engineering Mindset: Understanding system tradeoffs, security hygiene, and debugging systematically via Root Cause Analysis.

At Skillify Genius, we anchor every lesson in our Socratic Problem Solver Framework™.`,
    author: "Founder - Skillify Genius",
    authorRole: "Technology Educator & Software Development Practitioner",
    publishedAt: "2026-02-15T08:00:00Z",
    tags: ["AI Education", "Cognitive Frameworks", "Future of Work"],
    readTime: "5 min read",
  },
  {
    id: "post-2",
    title: "From Consumers to Creators: Converting Passive Screen Time into Cognitive Capital",
    slug: "from-consumers-to-creators",
    excerpt:
      "How to redirect your child's natural curiosity from gaming and streaming into building real-world software, physics simulators, and web tools.",
    content: `Most parents struggle with screen time battles. But the problem is rarely the screen itself; it is the passivity of consumption.
    
When children transition from consuming media to engineering media-designing collision mechanics, writing asynchronous API endpoints, and observing their code execute live-screen time transforms from a distraction into lifelong cognitive capital.`,
    author: "Founder - Skillify Genius",
    authorRole: "Technology Educator & Software Development Practitioner",
    publishedAt: "2026-03-01T08:00:00Z",
    tags: ["Parenting", "Screen Time", "Engineering Habits"],
    readTime: "4 min read",
  },
];

// ==============================================================================
// REACTIVE UNIFIED STORE CLASS (PRODUCTION & APPWRITE SYNC)
// ==============================================================================

class UnifiedStore {
  private users: User[] = [...INITIAL_USERS];
  private students: StudentGrowthProfile[] = [...INITIAL_STUDENTS];
  private projects: ProjectEvidence[] = [...INITIAL_PROJECTS];
  private courses: Course[] = [...INITIAL_COURSES];
  private rcaLogs: RCALog[] = [...INITIAL_RCA_LOGS];
  private timeline: ParentGrowthTimelineItem[] = [...INITIAL_PARENT_TIMELINE];
  private trials: TrialBooking[] = [...INITIAL_TRIALS];
  private leads: LeadInquiry[] = [...INITIAL_LEADS];
  private reviews: ParentReview[] = [...INITIAL_REVIEWS];
  private blogs: BlogPost[] = [...INITIAL_BLOGS];
  private feedbacks: ProductFeedback[] = [];
  private events: AnalyticsEvent[] = [];

  // Product Feedback System
  getFeedback(role?: string): ProductFeedback[] {
    if (role) {
      return this.feedbacks.filter((f) => f.userRole === role);
    }
    return this.feedbacks;
  }

  addFeedback(feedback: Omit<ProductFeedback, "id" | "createdAt">): ProductFeedback {
    const newFeedback: ProductFeedback = {
      ...feedback,
      id: `fb-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    this.feedbacks.unshift(newFeedback);
    return newFeedback;
  }

  // Lightweight Analytics Events
  trackEvent(event: Omit<AnalyticsEvent, "id" | "createdAt">): AnalyticsEvent {
    const newEvent: AnalyticsEvent = {
      ...event,
      id: `ev-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    this.events.unshift(newEvent);
    return newEvent;
  }

  getEvents(): AnalyticsEvent[] {
    return this.events;
  }

  // Users & RBAC
  getUsers(): User[] {
    return this.users;
  }

  getUserById(userId: string): User | undefined {
    return this.users.find((u) => u.userId === userId || u.id === userId);
  }

  // Student Profiles
  getStudentProfiles(): StudentGrowthProfile[] {
    return this.students;
  }

  getStudentProfile(studentId: string = "student-101"): StudentGrowthProfile {
    const student = this.students.find((s) => s.studentId === studentId);
    return student || this.students[0];
  }

  // Dynamic Skill Telemetry Calculation Engine
  calculateTelemetry(studentId: string = "student-101"): EngineeringGrowthMetrics {
    const student = this.getStudentProfile(studentId);
    const studentProjects = this.projects.filter(
      (p) => p.studentId === studentId && (p.status === "approved" || p.status === "verified_capstone")
    );
    const studentRCAs = this.rcaLogs.filter((r) => r.studentId === studentId);

    // Problem solving = Base (60) + (RCAs * 5) + (Projects * 4), capped at 98
    const problemSolving = Math.min(98, 60 + studentRCAs.length * 6 + studentProjects.length * 4);
    
    // Self learning = Base (65) + (RCAs * 7) + (Challenges / 4), capped at 96
    const selfLearning = Math.min(96, 65 + studentRCAs.length * 7 + Math.floor(student.challengesSolved / 4));
    
    // Programming = Base (55) + (Projects * 6) + (Challenges / 3), capped at 95
    const programming = Math.min(95, 55 + studentProjects.length * 6 + Math.floor(student.challengesSolved / 3));
    
    // System Thinking = Base (50) + (Phase * 10) + (Projects * 5)
    const systemThinking = Math.min(94, 50 + student.currentPhase * 10 + studentProjects.length * 5);
    
    // Creativity = Base (70) + (Projects * 3)
    const creativity = Math.min(96, 70 + studentProjects.length * 4);
    
    // Engineering Mindset = Base (58) + (RCAs * 6) + (Projects * 4)
    const engineeringMindset = Math.min(95, 58 + studentRCAs.length * 6 + studentProjects.length * 4);

    const updatedMetrics: EngineeringGrowthMetrics = {
      problemSolving,
      selfLearning,
      programming,
      systemThinking,
      creativity,
      engineeringMindset,
      updatedAt: new Date().toISOString(),
    };

    // Update in store
    student.metrics = updatedMetrics;
    student.verifiedProjectsCount = studentProjects.length;

    return updatedMetrics;
  }

  updateStudentMetrics(
    studentId: string,
    metrics: Partial<StudentGrowthProfile["metrics"]>,
    mentorNotes?: string
  ): StudentGrowthProfile {
    const student = this.getStudentProfile(studentId);
    student.metrics = { ...student.metrics, ...metrics, updatedAt: new Date().toISOString() };
    if (mentorNotes) {
      student.recentMentorNotes = mentorNotes;
    }
    return student;
  }

  // Projects & Verification Workflow (Submitted -> Under Review -> Approved -> Verified Capstone)
  getProjects(): ProjectEvidence[] {
    return this.projects;
  }

  getPublicVerifiedProjects(): ProjectEvidence[] {
    return this.projects.filter(
      (p) => p.status === "approved" || p.status === "verified_capstone"
    );
  }

  getProjectBySlug(slug: string): ProjectEvidence | undefined {
    return this.projects.find((p) => p.slug === slug);
  }

  addProject(project: Omit<ProjectEvidence, "id" | "createdAt">): ProjectEvidence {
    const newProj: ProjectEvidence = {
      ...project,
      id: `proj-${Date.now()}`,
      status: project.status || "submitted",
      createdAt: new Date().toISOString(),
    };
    this.projects.unshift(newProj);
    this.calculateTelemetry(project.studentId);
    return newProj;
  }

  updateProjectStatus(
    projectId: string,
    status: ProjectStatus,
    mentorFeedback?: string,
    mentorName: string = "Alex (Senior Technology Mentor)"
  ): ProjectEvidence | null {
    const proj = this.projects.find((p) => p.id === projectId);
    if (!proj) return null;
    proj.status = status;
    if (mentorFeedback) proj.mentorFeedback = mentorFeedback;
    proj.mentorName = mentorName;
    proj.updatedAt = new Date().toISOString();

    // Recalculate telemetry for student
    this.calculateTelemetry(proj.studentId);
    return proj;
  }

  // RCA Logs
  getRCALogs(studentId: string = "student-101"): RCALog[] {
    return this.rcaLogs.filter((r) => r.studentId === studentId);
  }

  addRCALog(log: Omit<RCALog, "id" | "createdAt">): RCALog {
    const newLog: RCALog = {
      ...log,
      id: `rca-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    this.rcaLogs.unshift(newLog);

    // Auto-update student telemetry
    this.calculateTelemetry(log.studentId);
    return newLog;
  }

  // Parent Growth Timeline
  getParentTimeline(studentId: string = "student-101"): ParentGrowthTimelineItem[] {
    return this.timeline;
  }

  // Courses & Curriculum Modules
  getCourses(): Course[] {
    return this.courses;
  }

  getCourseBySlug(slug: string): Course | undefined {
    return this.courses.find((c) => c.slug === slug);
  }

  getModules(): CurriculumModule[] {
    return this.courses.flatMap((c) => c.modules);
  }

  getModuleById(id: string): CurriculumModule | undefined {
    return this.getModules().find((m) => m.id === id);
  }

  // Trial Bookings & Leads
  getTrials(): TrialBooking[] {
    return this.trials;
  }

  addTrial(trial: Omit<TrialBooking, "id" | "status" | "createdAt">): TrialBooking {
    const newTrial: TrialBooking = {
      ...trial,
      id: `tb-${Date.now()}`,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    this.trials.unshift(newTrial);
    return newTrial;
  }

  updateTrialStatus(id: string, status: TrialBooking["status"]): TrialBooking | null {
    const t = this.trials.find((x) => x.id === id);
    if (!t) return null;
    t.status = status;
    return t;
  }

  getLeads(): LeadInquiry[] {
    return this.leads;
  }

  addLead(lead: Omit<LeadInquiry, "id" | "status" | "createdAt">): LeadInquiry {
    const newLead: LeadInquiry = {
      ...lead,
      id: `lead-${Date.now()}`,
      status: "new",
      createdAt: new Date().toISOString(),
    };
    this.leads.unshift(newLead);
    return newLead;
  }

  // Reviews & Blogs
  getReviews(): ParentReview[] {
    return this.reviews;
  }

  getBlogs(): BlogPost[] {
    return this.blogs;
  }

  getBlogBySlug(slug: string): BlogPost | undefined {
    return this.blogs.find((b) => b.slug === slug);
  }

  // Platform Analytics Engine (for Admin Dashboard)
  getPlatformAnalytics(): PlatformAnalytics {
    const totalStudents = this.students.length * 48; // Scaled demo factor
    const activeLearners = Math.round(totalStudents * 0.88);
    const completedProjects = this.projects.length * 16;
    const trialConversionRate = 78;
    const courseCompletionRate = 94;

    return {
      totalStudents,
      activeLearners,
      completedProjects,
      trialConversionRate,
      courseCompletionRate,
      activeCohortsCount: 18,
      monthlyEnrollmentGrowth: [
        { month: "Nov", students: 72 },
        { month: "Dec", students: 95 },
        { month: "Jan", students: 118 },
        { month: "Feb", students: 134 },
        { month: "Mar", students: 144 },
      ],
      phaseDistribution: [
        { phase: "Phase 1: Foundation", count: 48, percentage: 33 },
        { phase: "Phase 2: Creator Lab", count: 52, percentage: 36 },
        { phase: "Phase 3: AI Automation", count: 28, percentage: 20 },
        { phase: "Phase 4: Cyber Defense", count: 16, percentage: 11 },
      ],
      challengesSolvedTotal: 482,
      rcaLoggedTotal: 128,
    };
  }

  // GeniusAI Socratic Learning Mentor
  aiMentorRespond(req: AiMentorRequest): AiMentorResponse {
    const prompt = req.userPrompt.toLowerCase();
    const code = req.codeSnippet;

    let detectedMistakePattern: string | undefined = undefined;
    let suggestedReflectionPrompt: string | undefined = undefined;
    let reply = "That is a thoughtful hypothesis! What test case would prove that this logic handles zero or maximum boundaries?";

    // Common error pattern detection
    if (code.includes("while (true)") || (code.includes("while(") && !code.includes("++") && !code.includes("+="))) {
      detectedMistakePattern = "Potential Infinite Loop in while condition";
      reply = "Notice your loop condition. How does the counter or termination condition mutate during each iteration?";
      suggestedReflectionPrompt = "Why must every loop contain a guaranteed termination condition?";
    } else if (prompt.includes("tunnel") || prompt.includes("fall through") || prompt.includes("floor")) {
      detectedMistakePattern = "Physics Velocity Tunneling";
      reply = "If velocity is large, the object's position might jump past the floor in a single frame. How can you clamp the position before or after updating `y`?";
      suggestedReflectionPrompt = "How does clamping position differ from modifying velocity?";
    } else if (prompt.includes("async") || prompt.includes("promise") || prompt.includes("undefined")) {
      detectedMistakePattern = "Asynchronous Data Flow Race Condition";
      reply = "When fetching data asynchronously, the response arrives later than immediate code execution. What state is your variable in before the Promise resolves?";
      suggestedReflectionPrompt = "How do you handle the loading state before data arrives?";
    } else if (prompt.includes("hint") || prompt.includes("help") || prompt.includes("stuck")) {
      reply = "Let's break it into smaller parts using the Problem Solver Framework™: 1. What are your inputs? 2. What is the expected output? 3. What step in between is currently failing?";
    } else {
      reply = `Great inquiry! Consider: What happens to your state variables if this function executes multiple times per second? Test your simulation in the Sandbox to inspect the console output.`;
    }

    return {
      reply,
      detectedMistakePattern,
      suggestedReflectionPrompt,
    };
  }

  // Authentication & Registration
  registerStudent(payload: {
    name: string;
    email: string;
    age: number;
    country: string;
    experienceLevel: string;
    interests: string[];
  }): { user: User; profile: StudentGrowthProfile } {
    const slugId = payload.name.toLowerCase().replace(/\s+/g, "-") + "-" + Math.floor(100 + Math.random() * 900);
    const userId = `student-${slugId}`;

    const newUser: User = {
      id: `user-${slugId}`,
      userId: userId,
      name: payload.name,
      email: payload.email,
      role: "student",
      studentId: userId,
      createdAt: new Date().toISOString(),
    };

    const newProfile: StudentGrowthProfile = {
      studentId: userId,
      studentName: payload.name,
      age: Number(payload.age) || 12,
      currentPhase: 1,
      level: "Level 1: Foundation Thinker",
      activeSprint: "Phase 1: Foundation - Computational Logic & Variables",
      learningPath: payload.interests[0] || "Foundations & Problem Solving",
      verifiedProjectsCount: 0,
      challengesSolved: 1,
      strengths: [payload.experienceLevel, ...payload.interests.slice(0, 2)],
      focusAreas: ["Algorithmic Thinking", "Code Structure"],
      recentMentorNotes: `Welcome to Skillify Genius! Completed initial registration for ${payload.country} cohort.`,
      metrics: {
        problemSolving: 60,
        selfLearning: 65,
        programming: 55,
        systemThinking: 50,
        creativity: 70,
        engineeringMindset: 58,
        updatedAt: new Date().toISOString(),
      },
    };

    INITIAL_USERS.push(newUser);
    INITIAL_STUDENTS.unshift(newProfile);

    // Sync to Appwrite if configured
    if (isAppwriteConfigured && appwriteDatabases) {
      appwriteDatabases.createDocument(
        APPWRITE_DB_ID,
        "users",
        ID.unique(),
        newUser
      ).catch((err: any) => console.warn("Appwrite user sync skipped:", err?.message));

      appwriteDatabases.createDocument(
        APPWRITE_DB_ID,
        "student_profiles",
        ID.unique(),
        {
          studentId: newProfile.studentId,
          studentName: newProfile.studentName,
          age: newProfile.age,
          currentPhase: newProfile.currentPhase,
          level: newProfile.level,
          learningPath: newProfile.learningPath,
          verifiedProjectsCount: newProfile.verifiedProjectsCount,
          challengesSolved: newProfile.challengesSolved,
          strengths: newProfile.strengths,
          focusAreas: newProfile.focusAreas,
          recentMentorNotes: newProfile.recentMentorNotes,
        }
      ).catch((err: any) => console.warn("Appwrite student sync skipped:", err?.message));
    }

    return { user: newUser, profile: newProfile };
  }

  loginUser(email: string, role?: string): User | null {
    const cleanEmail = email.toLowerCase().trim();
    let user = INITIAL_USERS.find((u) => u.email.toLowerCase() === cleanEmail);
    
    if (!user && role) {
      // Fallback matching by role for demo users
      user = INITIAL_USERS.find((u) => u.role === role);
    }
    
    return user || null;
  }
}

export const store = new UnifiedStore();
