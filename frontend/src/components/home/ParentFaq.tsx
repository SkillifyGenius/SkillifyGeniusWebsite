import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, HelpCircle, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

const faqData: FaqItem[] = [
  {
    category: "Equipment & Setup",
    question: "What equipment or software does my child need?",
    answer:
      "All you need is a standard desktop computer or laptop (Mac, Windows, or Chromebook) with a reliable internet connection, a functioning webcam, and a microphone. We use lightweight, industry-standard browser environments and safe educational tools. You will never be asked to purchase expensive specialized software or licenses.",
  },
  {
    category: "Parent Involvement",
    question: "Can parents sit in and observe the live sessions?",
    answer:
      "Yes, absolutely. We maintain a 100% open-door policy. Parents and guardians are always welcome to quietly observe any live 1:1 session or join the first few minutes. In addition, the educator provides direct, plain-language milestone updates so you always know what your child built, what challenges they overcame, and what comes next.",
  },
  {
    category: "Live Sessions",
    question: "Which video platform is used and how do we join?",
    answer:
      "Sessions take place in secure, private 1:1 Google Meet or Zoom rooms. After we review and confirm your preferred trial time, we will send you the meeting details and a calendar invite. No complex downloads or account setups are required.",
  },
  {
    category: "Scheduling Flexibility",
    question: "What is your rescheduling and cancellation policy?",
    answer:
      "We understand that family schedules, school exams, and travel can be unpredictable. You can reschedule any session with 24 hours of advance notice at no penalty. Because this is customized 1:1 mentorship, your child will never 'miss a class' or fall behind a group cohort.",
  },
  {
    category: "Personalization",
    question: "What if my child is a complete beginner or already has prior coding experience?",
    answer:
      "That is the core strength of 1:1 mentorship. In group camps, advanced learners get bored and beginners feel overwhelmed. Our senior educator assesses each learner's current aptitude during the free initial session and crafts a personalized progression, whether that means starting with friendly visual logic or diving straight into modern JavaScript and algorithmic problem solving.",
  },
  {
    category: "Value & Results",
    question: "How is this different from large group coding bootcamps?",
    answer:
      "Large group bootcamps typically assign rotating college interns to read standardized slide decks to 15-20 students who copy-paste pre-written code. At Skillify Genius, your child works directly with a Senior Software Engineer and Educator teaching since 2012. We focus on true computational reasoning, self-directed debugging, and original project building.",
  },
];

export function ParentFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  function toggle(index: number) {
    setOpenIndex((current) => (current === index ? null : index));
  }

  return (
    <section id="faq" className="px-5 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100/80 px-4 py-1.5 text-xs font-black uppercase tracking-wider text-emerald-900">
            <HelpCircle className="h-3.5 w-3.5 text-emerald-700" /> Parent Questions Answered
          </span>
          <h2 className="mt-4 font-display text-4xl font-black tracking-tight text-[#102a25] sm:text-5xl">
            Everything you need to know.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#597068] sm:text-lg">
            Straightforward answers about equipment, safeguarding, session formats, and what to expect from 1:1 mentorship.
          </p>
        </div>

        <div className="mt-12 space-y-4">
          {faqData.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={item.question}
                className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? "border-emerald-700/30 bg-white shadow-lg shadow-emerald-950/5 ring-1 ring-emerald-700/20"
                    : "border-emerald-950/10 bg-white/80 hover:border-emerald-950/20 hover:bg-white"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="flex w-full items-center justify-between gap-4 p-6 text-left"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-4">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-emerald-50 text-xs font-black text-emerald-800">
                      0{index + 1}
                    </span>
                    <span className="font-display text-lg font-bold text-[#102a25] sm:text-xl">
                      {item.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-emerald-700 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-primary" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="border-t border-emerald-950/5 px-6 pb-6 pt-4 text-sm leading-7 text-[#4f675f] sm:text-base">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 rounded-3xl border border-emerald-950/10 bg-white p-6 shadow-md sm:p-8">
          <div className="flex items-center gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-emerald-100 text-primary">
              <MessageSquare className="h-6 w-6" />
            </span>
            <div>
              <p className="font-display text-base font-bold text-[#102a25]">Have a specific question about your learner?</p>
              <p className="text-xs text-[#597068]">The senior instructor will gladly answer your questions during a free 45-minute live consultation.</p>
            </div>
          </div>
          <Button asChild className="w-full sm:w-auto">
            <Link href="/trial">Book free 45-min assessment <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
