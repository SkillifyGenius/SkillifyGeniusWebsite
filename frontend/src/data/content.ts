import type { BlogPost, Course } from "@/types";

export const fallbackCourses: Course[] = [
  {
    id: "course-foundations",
    title: "Coding & Creative Logic",
    slug: "coding-creative-logic",
    phase: 1,
    ageGroup: "Ages 8-12",
    duration: "12 weeks",
    classFrequency: "2 or 3 live classes per week",
    level: "Beginner",
    description: "A friendly first step into coding through games, puzzles, and visual projects.",
    primaryOutcome: "Build and explain an original interactive project.",
    skillsDeveloped: ["Logical thinking", "Creative problem-solving", "Confident debugging"],
  },
  {
    id: "course-creator",
    title: "Web Creator Lab",
    slug: "web-creator-lab",
    phase: 2,
    ageGroup: "Ages 12-18",
    duration: "16 weeks",
    classFrequency: "2 or 3 live classes per week",
    level: "Intermediate",
    description: "Turn ideas into responsive websites while learning how real digital products are made.",
    primaryOutcome: "Design, build, and publish a complete web project.",
    skillsDeveloped: ["HTML, CSS & JavaScript", "Product thinking", "Publishing projects"],
  },
  {
    id: "course-ai",
    title: "Practical AI for Students",
    slug: "practical-ai-for-students",
    phase: 3,
    ageGroup: "Ages 13-18",
    duration: "10 weeks",
    classFrequency: "2 or 3 live classes per week",
    level: "Intermediate",
    description: "Use modern AI responsibly for research, study, creativity, and simple automation.",
    primaryOutcome: "Create a useful AI-supported study workflow.",
    skillsDeveloped: ["Prompt design", "Fact checking", "Responsible AI use"],
  },
];

export const fallbackPosts: BlogPost[] = [
  {
    id: "post-1",
    title: "How to help a child become a confident problem-solver",
    slug: "confident-problem-solver",
    excerpt: "Three simple habits parents can use to encourage curiosity without giving away every answer.",
    content: `When children get stuck while coding or exploring technology, our instinctive reaction as caring adults is to step in immediately and point out the mistake. We show them the missing bracket or fix the error for them. While well-intentioned, this inadvertently robs the learner of the single most empowering experience in computer science: the thrill of resolving their own confusion.

True intellectual confidence is not the absence of frustration; it is having the cognitive stamina to investigate a roadblock calmly. Here are three practical habits parents can use at home to cultivate self-reliance:

### 1. The Three-Minute Pause
When your child encounters an unexpected error or feels stuck, resist the urge to take over the mouse or keyboard. Instead, give them three full minutes to sit with the problem. Ask them to verbalize the situation: "What did you expect the computer to do, and what did it do instead?" Often, simply explaining the goal out loud (a software technique known as 'rubber duck debugging') clarifies the missing step.

### 2. Guide Through Socratic Questions
Instead of giving the direct answer ("You forgot a quotation mark on line 12"), ask diagnostic questions that train their analytical muscles:
- "Which line is the error message highlighting?"
- "What does that error keyword usually mean?"
- "Where in your code did you last see everything working properly?"

This shifts their mindset from guessing blindly to following a structured scientific method: hypothesize, inspect, test, and verify.

### 3. Celebrate the Bug as Information
In school, errors are often marked with red ink and penalized. In professional software engineering, bugs are celebrated as vital diagnostic clues. When an error appears on screen, reframe it positively: "Excellent: the computer just told us exactly where it's confused. Let's decode the clue together."

When learners realize that bugs are natural milestones rather than personal failures, their anxiety dissolves. They stop being afraid of making mistakes, and that is precisely when real, creative learning begins.`,
    author: "Skillify Genius Academic Team",
    category: "Parent guide",
    tags: ["parents", "problem-solving", "mentorship"],
    publishedAt: "2026-03-10T00:00:00.000Z",
    readTime: "4 min read",
  },
  {
    id: "post-2",
    title: "Projects make technology learning stick",
    slug: "project-based-learning",
    excerpt: "Why creating something meaningful builds deeper understanding than memorising isolated commands.",
    content: `If you ask an adult who learned a foreign language through textbooks twenty years ago how much they remember, they might recall a few disjointed vocabulary words. But if you ask someone who lived in the country and had to navigate train stations, order meals, and make friends, the fluency remains lifelong.

Programming is a language, and learning it through passive lecture slides or isolated syntax drills produces an 'illusion of competence.' Students nod along to the video, copy down the commands, and feel successful, until they are placed in front of a blank file and realize they have no idea how to start.

### The Power of Creative Agency
When a student is guided to build an original project (such as an interactive astronomy simulator, a personal portfolio site, or a custom game physics engine), the learning dynamic reverses:
- They aren't memorizing variables because a curriculum demanded it; they are learning variables because their game character needs to keep track of a score.
- They aren't studying loops for a test; they need loops to draw fifty animated stars across the canvas.

Every technical concept attaches to an emotional and practical purpose that the student genuinely cares about.

### Connecting Syntax to Systems
In our customized 1:1 mentorship model, we never treat code as abstract trivia. From week one, learners write real code that executes in production. They see immediate visual feedback, test their assumptions against reality, and learn how interconnected systems talk to one another.

When a student finishes a course with a live, functional product that they can proudly explain to parents and peers, they haven't just memorized commands, they have built genuine creator confidence.`,
    author: "Skillify Genius Academic Team",
    category: "Learning",
    tags: ["projects", "creativity", "engineering"],
    publishedAt: "2026-02-18T00:00:00.000Z",
    readTime: "5 min read",
  },
  {
    id: "post-3",
    title: "A safe and useful introduction to AI for teenagers",
    slug: "safe-ai-for-teens",
    excerpt: "A practical framework for using AI thoughtfully, checking outputs, and protecting personal information.",
    content: `Artificial Intelligence has rapidly become one of the most talked-about topics in education. For parents and teenagers, the prevailing sentiment often swings between hype and anxiety: Will AI make learning obsolete? Will students just use it to avoid thinking?

At Skillify Genius, we view modern AI not as a shortcut to bypass cognition, but as a powerful cognitive amplifier. When taught with rigor, ethics, and clear boundaries, AI literacy transforms young people from passive algorithmic consumers into discerning, principled directors of technology.

Here is the three-pillar framework we use to teach responsible AI:

### 1. Cognitive Partnership vs. Cognitive Surrender
We teach students that AI is a tireless brainstorming partner, never an intellectual replacement. A student who asks an AI to "write an entire essay" surrenders their own critical voice and learns nothing.

Instead, we teach learners to use AI as a Socratic sounding board: "Here is my proposed software architecture for a school project. What are three edge cases or security flaws I might have overlooked?" The student remains the creative architect; the AI acts as a sounding board.

### 2. The 3-Step Verification Law
Because large language models generate text based on statistical probability rather than conscious truth, they can produce convincing falsehoods ('hallucinations'). We teach every student our strict 3-step verification law:
- **Trace the logic**: Do not accept code or facts that you cannot step through line by line.
- **Cross-reference independently**: Verify critical assertions against primary documentation or peer-reviewed sources.
- **Test against real edge cases**: Write automated test inputs to prove the output functions under pressure.

### 3. Absolute Privacy & Digital Hygiene
Young people must understand the economics of modern machine learning models. We enforce strict digital safety habits:
- Never paste personal identifying information, school credentials, or confidential family data into public AI prompts.
- Understand that digital footprints persist.
- Recognize algorithmic bias and evaluate sources critically.

When students master these three pillars, they develop the judgment and intellectual maturity to navigate the future of work and technology with confidence.`,
    author: "Skillify Genius Academic Team",
    category: "AI literacy",
    tags: ["ai", "safety", "critical-thinking"],
    publishedAt: "2026-01-24T00:00:00.000Z",
    readTime: "6 min read",
  },
];
