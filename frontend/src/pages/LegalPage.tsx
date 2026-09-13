import { Link } from "react-router-dom";
import { Seo } from "@/components/Seo";
import { contact } from "@/lib/contact";
import {
  ShieldCheck,
  Eye,
  Lock,
  UserCheck,
  HeartHandshake,
  Clock,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  FileText,
  Mail,
  Laptop,
  Check,
  Compass
} from "lucide-react";

interface LegalPageProps {
  kind: "privacy" | "safeguarding" | "terms";
}

export function LegalPage({ kind }: LegalPageProps) {
  const tabs = [
    { id: "safeguarding", label: "Child Safeguarding & Well-Being", path: "/safeguarding" },
    { id: "privacy", label: "Privacy Policy", path: "/privacy" },
    { id: "terms", label: "Terms of Service", path: "/terms" },
  ];

  return (
    <>
      <Seo
        title={
          kind === "safeguarding"
            ? "Child Safeguarding & Digital Well-Being Protocol | Skillify Genius"
            : kind === "privacy"
            ? "Privacy Policy & Minor Data Protection | Skillify Genius"
            : "Terms of Service | Skillify Genius"
        }
        description={
          kind === "safeguarding"
            ? "Our uncompromising child safeguarding standards: 100% open-door parent observation, private encrypted video rooms, dedicated senior instructor accountability, and zero minor data sharing."
            : kind === "privacy"
            ? "Learn how Skillify Genius protects family and student data with strict COPPA and GDPR-conscious standards. We never sell data to advertisers."
            : "Skillify Genius terms of service: transparent expectations, flexible 1:1 scheduling, student IP ownership, and mutual respect."
        }
      />

      <div className="bg-slate-50 min-h-screen">
        {/* Navigation & Header Strip */}
        <section className="border-b border-slate-200 bg-white pt-16 pb-12 px-5 sm:px-8">
          <div className="mx-auto max-w-5xl">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1 text-xs font-bold text-emerald-800 tracking-wide uppercase">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                Trust, Safety & Governance
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Last updated: January 2025 &bull; Valid globally
              </p>
            </div>

            <h1 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 font-display">
              {kind === "safeguarding" && "Child Safeguarding & Digital Well-Being"}
              {kind === "privacy" && "Privacy Policy & Minor Data Protection"}
              {kind === "terms" && "Terms of Service & Enrollment Guidelines"}
            </h1>

            <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed">
              {kind === "safeguarding" &&
                "Skillify Genius operates with the stringent safety and transparency standards expected of elite private academic institutions. Every 1:1 session is designed to safeguard your child, keep parents fully informed, and foster healthy digital hygiene."}
              {kind === "privacy" &&
                "We respect your family's personal boundaries. We collect only the educational baseline necessary to customize lesson plans and deliver world-class 1:1 instruction. We never sell or monetize learner data."}
              {kind === "terms" &&
                "Clear, transparent, and fair expectations for families and our instruction team. Learn about student IP ownership, scheduling flexibility, and our commitment to educational excellence."}
            </p>

            {/* Document Switcher Tabs */}
            <div className="mt-8 flex flex-wrap gap-2 pt-4 border-t border-slate-100">
              {tabs.map((tab) => {
                const isActive = tab.id === kind;
                return (
                  <Link
                    key={tab.id}
                    to={tab.path}
                    className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-all ${
                      isActive
                        ? "bg-slate-900 text-white shadow-sm"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                    }`}
                  >
                    <FileText className="h-4 w-4" />
                    {tab.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Content Body */}
        <section className="px-5 py-12 sm:px-8 lg:py-16">
          <div className="mx-auto max-w-5xl">
            {kind === "safeguarding" && <SafeguardingContent />}
            {kind === "privacy" && <PrivacyContent />}
            {kind === "terms" && <TermsContent />}

            {/* Direct Inquiries Help Card */}
            <div className="mt-14 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Have a specific safety or policy question?</h3>
                <p className="mt-1 text-sm text-slate-600 max-w-xl">
                  Our Co-founder & Senior Instructor oversees safeguarding directly. Inquiries are responded to within 24 hours.
                </p>
              </div>
              <a
                href={contact.emailHref}
                className="inline-flex items-center gap-2 rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white hover:bg-emerald-700 transition shadow-sm"
              >
                <Mail className="h-4 w-4" />
                {contact.email}
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

/* =========================================================================
   SAFEGUARDING CONTENT COMPONENT
   ========================================================================= */
function SafeguardingContent() {
  const standards = [
    {
      icon: Eye,
      title: "1. Open-Door Parent Observation Policy",
      badge: "Total Parental Transparency",
      summary: "Parents and guardians are explicitly welcome to sit in on any session, listen via audio, or drop in unannounced at any time.",
      details: [
        "No hidden or closed-door calls: parents can join the Google Meet / Zoom link directly from their own device or sit alongside their child.",
        "Clear parent orientation during the very first trial session to align on student goals and safety boundaries.",
        "Open dialogue: parents can debrief with the instructor after any class to discuss progress, screen-time habits, or focus areas."
      ]
    },
    {
      icon: Lock,
      title: "2. Private, Encrypted 1:1 Video Infrastructure",
      badge: "Zero Public Rooms",
      summary: "All sessions are conducted in dedicated, authenticated meeting rooms distributed strictly to registered parent email addresses.",
      details: [
        "Rooms are locked to unauthorized participants and never shared publicly.",
        "No unmoderated peer-to-peer breakout rooms or student-to-student text backchannels.",
        "Direct screen sharing is strictly confined to code editors, development environments, and curated educational tools."
      ]
    },
    {
      icon: UserCheck,
      title: "3. Direct Senior Instructor Accountability",
      badge: "No Subcontracted Tutors",
      summary: "Your child is mentored directly by our vetted Co-founder & Senior Instructor with 12+ years of international youth education experience.",
      details: [
        "Unlike mass aggregator platforms that cycle through unvetted college students or part-time freelancers, your child builds an ongoing rapport with one trusted instructor.",
        "Zero automated or impersonal teaching bot handoffs: every lesson is an active, human Socratic conversation.",
        "Instructor credentials and track record are vetted, verified, and transparent."
      ]
    },
    {
      icon: ShieldCheck,
      title: "4. Strict Minor Media Protection & Zero Public Distribution",
      badge: "COPPA & GDPR-K Mindful",
      summary: "We never publish student video recordings, student faces, or full legal names on public social media or marketing ads.",
      details: [
        "Showcasing student work is restricted strictly to anonymized code repositories, functional interactive demos, or student-approved pseudonyms.",
        "Recorded review clips (if requested by parents for revision) are stored securely and accessible only to the enrolled family.",
        "Zero commercial exploitation or promotional commodification of minor students."
      ]
    },
    {
      icon: Clock,
      title: "5. Digital Well-Being, Posture & Screen Hygiene",
      badge: "Combatting Screen Fatigue",
      summary: "We believe screen time must be active, creative, and physically healthy, never passive scrolling or eye-straining marathons.",
      details: [
        "Lessons are strictly capped at 60 minutes to maintain peak cognitive focus and avoid cognitive overload.",
        "Integrated tactile breaks: students frequently use pencil and paper to architect algorithms before touching code.",
        "Screen-distance and posture reminders are built into the rhythm of every session."
      ]
    },
    {
      icon: Sparkles,
      title: "6. Ethical AI Literacy & Digital Citizenship",
      badge: "Responsible AI Education",
      summary: "We teach children how to utilize modern AI tools safely, responsibly, and with rigorous intellectual integrity.",
      details: [
        "Students are taught the fundamental rule of data privacy: never paste personal identities, addresses, or private credentials into LLMs.",
        "We emphasize critical thinking over blind reliance: students learn to audit, test, and detect algorithmic hallucinations.",
        "Academic honesty: students understand the difference between AI-assisted learning and unearned code copying."
      ]
    },
  ];

  return (
    <div className="space-y-12">
      {/* Overview Card */}
      <div className="rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-50/70 via-white to-sky-50/50 p-6 sm:p-10 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
              Our Safety Pledge to Parents Worldwide
            </h2>
            <p className="mt-3 text-slate-700 leading-relaxed">
              When families in North America, Europe, the UK, Australia, and Asia entrust us with their child’s computer science education, we hold that trust as a sacred responsibility. We believe modern online education should feel as safe and accountable as an in-person tutorial in your own living room.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 min-w-[240px]">
            <div className="rounded-2xl border border-emerald-200 bg-white p-3.5 text-center shadow-xs">
              <span className="text-xl font-black text-emerald-700 font-display">100%</span>
              <p className="text-xs font-semibold text-slate-600 mt-0.5">Parent Open-Door</p>
            </div>
            <div className="rounded-2xl border border-emerald-200 bg-white p-3.5 text-center shadow-xs">
              <span className="text-xl font-black text-emerald-700 font-display">1:1 Only</span>
              <p className="text-xs font-semibold text-slate-600 mt-0.5">Private Rooms</p>
            </div>
            <div className="rounded-2xl border border-emerald-200 bg-white p-3.5 text-center shadow-xs">
              <span className="text-xl font-black text-emerald-700 font-display">Zero</span>
              <p className="text-xs font-semibold text-slate-600 mt-0.5">Data Reselling</p>
            </div>
            <div className="rounded-2xl border border-emerald-200 bg-white p-3.5 text-center shadow-xs">
              <span className="text-xl font-black text-emerald-700 font-display">12+ Yrs</span>
              <p className="text-xs font-semibold text-slate-600 mt-0.5">Teaching History</p>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Standards List */}
      <div className="space-y-6">
        <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-display">
          Our Six Safeguarding & Well-Being Standards
        </h3>

        <div className="grid gap-6 md:grid-cols-2">
          {standards.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 sm:p-7 shadow-xs hover:border-slate-300 transition"
              >
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
                      {item.badge}
                    </span>
                  </div>

                  <h4 className="mt-4 text-lg font-bold text-slate-900">{item.title}</h4>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed font-medium">
                    {item.summary}
                  </p>

                  <ul className="mt-4 space-y-2 border-t border-slate-100 pt-4">
                    {item.details.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600">
                        <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Parent Experience Trial Banner */}
      <div className="rounded-3xl border border-slate-900 bg-slate-900 p-8 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="max-w-xl">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase text-emerald-400">
            <HeartHandshake className="h-4 w-4" />
            See It For Yourself
          </span>
          <h3 className="mt-2 text-2xl sm:text-3xl font-extrabold font-display text-white">
            Attend a Free 45-Minute Diagnostic Session with Your Child
          </h3>
          <p className="mt-2 text-sm sm:text-base text-slate-300 leading-relaxed">
            Experience our open-door safety standards, meet our senior instructor, and receive a customized technical roadmap, completely free and with zero obligation.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full sm:w-auto">
          <Link
            to="/trial"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-6 py-3.5 text-sm font-bold text-white hover:bg-emerald-400 transition shadow-lg shadow-emerald-500/20 text-center"
          >
            Book Free Assessment
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-700 bg-slate-800 px-6 py-3.5 text-sm font-semibold text-slate-200 hover:bg-slate-700 hover:text-white transition text-center"
          >
            Ask Questions First
          </Link>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   PRIVACY CONTENT COMPONENT
   ========================================================================= */
function PrivacyContent() {
  const sections = [
    {
      title: "1. Overview & Commitment to Youth Privacy",
      content:
        "Skillify Genius ('we', 'us', or 'our') is dedicated to upholding the highest standards of data privacy for our learners and their families. We design our software and operations with full mindfulness of global child privacy frameworks, including the United States Children's Online Privacy Protection Act (COPPA), the General Data Protection Regulation (GDPR / GDPR-K in the UK and European Union), and relevant Australian and Canadian privacy laws."
    },
    {
      title: "2. Information We Collect and Receive",
      content:
        "We operate on strict data minimization principles. We only collect the information necessary to fulfill our educational mission: \n\n• Parent/Guardian Information: Full name, contact email address, telephone/WhatsApp number for session notifications, and country/timezone.\n• Student Learner Profile: First name or preferred nickname, age bracket or grade level, prior coding or mathematical background, and educational interests.\n• Session Logs: Diagnostic skill benchmarks, curriculum milestones, and notes written by the instructor to personalize homework and upcoming modules."
    },
    {
      title: "3. Absolute Guarantee: Zero Sale or Rental of Personal Data",
      content:
        "We never sell, rent, license, or exchange student or parent information with advertisers, third-party data brokers, or marketing networks. Our sole business model is providing high-caliber 1:1 computer science education directly to families. There are no advertising trackers or telemetry widgets aimed at profiling minors on our platform."
    },
    {
      title: "4. How We Use Collected Data",
      content:
        "The information you share is used solely to:\n\n• Deliver, adapt, and personalize 1:1 live computer science lessons.\n• Coordinate calendar scheduling, send Google Meet / Zoom meeting room links, and handle timezone shifts.\n• Send a limited trial-booking alert through Telegram to the educator. This alert includes parent contact details and scheduling preferences, but excludes the student's name, age, and free-text notes.\n• Transmit written lesson recap notes, code project links, and milestone evaluations to parents.\n• Process course tuition via PCI-DSS certified, industry-standard payment processors (we do not store raw credit card numbers on our servers)."
    },
    {
      title: "5. Parental Rights & Data Management",
      content:
        `Parents and legal guardians maintain absolute control over their family’s data at all times. You have the right to:\n\n• Review the specific personal details and diagnostic records associated with your child.\n• Request immediate correction or updating of any inaccurate details.\n• Request total permanent deletion ('right to be forgotten') of your family's profile and learning logs upon concluding lessons.\n\nTo exercise any of these rights, email ${contact.email} and we will confirm fulfillment within 72 hours.`
    },
    {
      title: "6. Security & Infrastructure Practices",
      content:
        "All data transmissions on skillifygenius.com are encrypted in transit via Transport Layer Security (TLS/HTTPS). Live video sessions are authenticated with private meeting URLs. Our servers and database providers utilize industry-standard encryption at rest and strict role-based access controls."
    },
  ];

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-display">
          Privacy Policy Summary for Parents
        </h2>
        <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
          In simple terms: we only ask for the information needed to teach your child effectively, we never sell your data, we never show ads, and you can ask us to delete your family records at any time.
        </p>
      </div>

      <div className="grid gap-6">
        {sections.map((sec) => (
          <div key={sec.title} className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
            <h3 className="text-lg font-bold text-slate-900">{sec.title}</h3>
            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed whitespace-pre-line">
              {sec.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================================================================
   TERMS OF SERVICE CONTENT COMPONENT
   ========================================================================= */
function TermsContent() {
  const sections = [
    {
      title: "1. Educational Scope & Format",
      content:
        "Skillify Genius offers customized 1:1 live computer science mentorship and coding education. Sessions are scheduled directly between the parent/guardian and Skillify Genius. All lessons are conducted by verified instructors in a live interactive format."
    },
    {
      title: "2. Free 1:1 Trial Assessment",
      content:
        "We provide one free 45-minute 1:1 trial session per prospective student. This diagnostic session allows the student to experience our teaching approach, enables the instructor to assess coding baseline and learning pace, and gives parents a tailored curriculum roadmap. Completing a trial does not obligate the family to enroll."
    },
    {
      title: "3. Student Intellectual Property & Project Ownership",
      content:
        "Every line of code, game, website, artificial intelligence project, and digital asset created by the student during lessons remains 100% the intellectual property of the student and their family. Skillify Genius claims no ownership over student creations."
    },
    {
      title: "4. Scheduling, Punctuality & Rescheduling Flexibility",
      content:
        "We understand that family schedules can be dynamic. Parents may reschedule a planned session by providing at least 12 hours advance notice, allowing us to allocate that time slot to other families. In unexpected emergencies or illness, we make every reasonable effort to provide a flexible makeup session."
    },
    {
      title: "5. Respectful Learning Environment & Code of Conduct",
      content:
        "Skillify Genius maintains a supportive, encouraging, and academically rigorous environment. We cultivate psychological safety where making mistakes and debugging is celebrated. Both student and instructor are expected to treat each other with dignity and mutual respect."
    },
    {
      title: "6. Enrollment, Pausing & Cancellation",
      content:
        "Tuition is paid on an agreed monthly or modular schedule confirmed prior to enrollment. There are no lock-in annual contracts. Families may pause or conclude instruction at the end of any paid billing period by notifying us."
    },
  ];

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-display">
          Terms of Service & Enrollment Guidelines
        </h2>
        <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
          Our terms are designed to be fair, respectful of family schedules, and transparent. We believe education should be built on trust rather than restrictive contracts.
        </p>
      </div>

      <div className="grid gap-6">
        {sections.map((sec) => (
          <div key={sec.title} className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
            <h3 className="text-lg font-bold text-slate-900">{sec.title}</h3>
            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed whitespace-pre-line">
              {sec.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
