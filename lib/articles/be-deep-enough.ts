// Transcribed from article.docx. Completed prose is preserved verbatim.
// Two unfinished personal examples are omitted. The project uses verified portfolio data.
export type ArticleBlock =
  | { type: "paragraph" | "quote"; text: string }
  | { type: "list"; ordered?: boolean; items: { text: string; lead?: string }[] }
  | { type: "image"; name: string; alt: string; caption: string }
  | { type: "project" };
export type ArticleSection = { id: string; title: string; blocks: ArticleBlock[] };
export const articleTitle = "Be Deep Enough to Doubt the Machine";
export const articleSummary = "AI made breadth cheap. What’s scarce now is knowing enough about one thing to judge what the machine tells you.";
export const articlePath = "/writing/be-deep-enough-to-doubt-the-machine";
export const articleSections: ArticleSection[] = [
  {
    "id": "the-demo-that-worked-perfectly",
    "title": "The Demo That Worked Perfectly",
    "blocks": [
      {
        "type": "paragraph",
        "text": "A student asks an AI to add profile-photo uploads to their app. Seconds later there’s clean code, it runs, and the demo goes great."
      },
      {
        "type": "paragraph",
        "text": "Two weeks later, a real user uploads something nobody expected. The feature breaks, or worse, it quietly lets someone do what they shouldn’t."
      },
      {
        "type": "paragraph",
        "text": "The student never learned how file handling goes wrong, so they didn’t know what to check. Nothing looked broken. That was the whole problem."
      },
      {
        "type": "image",
        "name": "demo-that-worked-perfectl",
        "alt": "Illustrative code editor showing a photo-upload function, passing tests, and a question mark beside a line of code.",
        "caption": "Illustrative mockup: passing tests can leave important questions unanswered."
      }
    ]
  },
  {
    "id": "the-debate-everyone-knows",
    "title": "The Debate Everyone Knows",
    "blocks": [
      {
        "type": "paragraph",
        "text": "Specialist or generalist? Specialists go deep and get paid for rare expertise. Generalists range wide and adapt fast."
      },
      {
        "type": "paragraph",
        "text": "Both sides have good evidence, which is why the argument never ends. I think the framing itself is wrong, and AI is the reason."
      }
    ]
  },
  {
    "id": "what-ai-takes-away-from-both-sides",
    "title": "What AI Takes Away From Both Sides",
    "blocks": [
      {
        "type": "paragraph",
        "text": "AI made breadth cheap. Ask about almost any field and you get a confident overview in seconds, which hurts the generalist whose edge was knowing a little about everything."
      },
      {
        "type": "paragraph",
        "text": "It squeezes the narrow specialist too, because routine work inside one tool is exactly what AI does best."
      },
      {
        "type": "paragraph",
        "text": "So what’s still scarce?"
      },
      {
        "type": "quote",
        "text": "Breadth is now cheap. Judgment is not."
      }
    ]
  },
  {
    "id": "depth-is-now-a-verification-skill",
    "title": "Depth Is Now a Verification Skill",
    "blocks": [
      {
        "type": "paragraph",
        "text": "AI can build a working feature in seconds. Someone still has to decide whether it’s correct, secure, efficient, and usable, and that takes real understanding of code, data, and system design."
      },
      {
        "type": "paragraph",
        "text": "Depth used to mean producing more. Now it means being the one who can say, “This looks right, but it isn’t.”"
      },
      {
        "type": "paragraph",
        "text": "Could you explain every line of the last thing AI wrote for you?"
      },
      {
        "type": "image",
        "name": "depth-verification-code-review-des",
        "alt": "Illustrative developer desk with a code diff, highlighted mistakes, and handwritten code-review questions.",
        "caption": "Illustration: reviewing the code means understanding what could go wrong."
      }
    ]
  },
  {
    "id": "specialize-in-a-problem-not-a-tool",
    "title": "Specialize in a Problem, Not a Tool",
    "blocks": [
      {
        "type": "paragraph",
        "text": "For a builder, the most lasting specialty is a user’s problem. AI can write the code, but deciding what to build, for whom, and whether it actually helps them is still on me."
      },
      {
        "type": "paragraph",
        "text": "Take a problem, like how first-year students keep track of deadlines, and go deep. You get pulled into design, programming, data, and the domain itself, so breadth comes along for free."
      },
      {
        "type": "paragraph",
        "text": "But depth in a problem only lasts if I keep learning."
      },
      {
        "type": "image",
        "name": "specialize-in-a-problem-hub",
        "alt": "Diagram connecting one user problem to design, code, data, and domain knowledge.",
        "caption": "Different skills connect around one user problem."
      }
    ]
  },
  {
    "id": "learning-how-to-learn-is-the-durable-specialty",
    "title": "Learning How to Learn Is the Durable Specialty",
    "blocks": [
      {
        "type": "paragraph",
        "text": "Frameworks and languages keep changing. These don’t:"
      },
      {
        "type": "list",
        "items": [
          {
            "text": "Logic"
          },
          {
            "text": "Abstraction"
          },
          {
            "text": "Debugging"
          },
          {
            "text": "Understanding users"
          }
        ],
        "ordered": false
      },
      {
        "type": "paragraph",
        "text": "The first three let me pick up any new tool. The last one tells me which tool is worth picking up."
      },
      {
        "type": "quote",
        "text": "Tools expire. The habit of going deep does not."
      },
      {
        "type": "image",
        "name": "judgment-and-curiosity-t-diagram",
        "alt": "T-shaped diagram with curiosity across fields as the horizontal bar and deep judgment as the vertical bar.",
        "caption": "Curiosity across fields; judgment grounded in depth."
      }
    ]
  },
  {
    "id": "the-trap-of-the-fast-answer",
    "title": "The Trap of the Fast Answer",
    "blocks": [
      {
        "type": "paragraph",
        "text": "The version that worries me most is shipping AI-generated code I don’t understand. It works until it doesn’t, and then a real user is affected while I’m staring at code I can’t reason about."
      },
      {
        "type": "paragraph",
        "text": "The time I saved comes back with interest, at the worst moment."
      },
      {
        "type": "paragraph",
        "text": "The fix isn’t avoiding AI. It’s struggling with the fundamentals first, then using AI to go further than I could alone."
      },
      {
        "type": "image",
        "name": "trap-of-the-fast-answer-untangle",
        "alt": "Illustration of a hand gradually untangling teal string from a knot into a straight line.",
        "caption": "The slow work."
      }
    ]
  },
  {
    "id": "wont-my-expertise-expire-before-i-finish-building-it",
    "title": "“Won’t My Expertise Expire Before I Finish Building It?”",
    "blocks": [
      {
        "type": "paragraph",
        "text": "Fair question. Specific knowledge does age, and a library I master today may be irrelevant in five years."
      },
      {
        "type": "paragraph",
        "text": "The habits behind deep study don’t age: rigor, skepticism, good mental models. I carry those into every new field, and they’re what let me judge an answer in a domain I’ve never touched."
      },
      {
        "type": "paragraph",
        "text": "So what would I actually do now?"
      }
    ]
  },
  {
    "id": "what-id-do-if-i-started-today",
    "title": "What I’d Do If I Started Today",
    "blocks": [
      {
        "type": "list",
        "items": [
          {
            "lead": "Build and ship real projects.",
            "text": " Something with actual users beats ten tutorials."
          },
          {
            "lead": "Review AI code line by line.",
            "text": " If I can’t explain it, I don’t ship it."
          },
          {
            "lead": "Talk to real users.",
            "text": " Their problems decide what’s worth building."
          },
          {
            "lead": "Learn fundamentals deeply.",
            "text": " Data structures, systems, and debugging first, shortcuts second."
          }
        ],
        "ordered": true
      },
      {
        "type": "project"
      },
      {
        "type": "image",
        "name": "project-issues-dashboard",
        "alt": "Fictional aurora-app repository showing example issues about onboarding, mobile layout, dark mode, documentation, and shortcuts.",
        "caption": "Illustrative repository with fictional feedback; not an Astra screenshot or verified user results."
      }
    ]
  },
  {
    "id": "back-to-the-demo",
    "title": "Back to the Demo",
    "blocks": [
      {
        "type": "paragraph",
        "text": "Back to the student with the photo upload. The fix was never a better prompt. It was knowing enough to ask, “What happens if someone uploads something I didn’t expect?”"
      },
      {
        "type": "paragraph",
        "text": "That question comes from depth. Connecting it to users and other fields comes from curiosity. Starting over when the tools change comes from adaptability."
      },
      {
        "type": "quote",
        "text": "Be deep enough to doubt the machine, broad enough to connect ideas it can’t, and adaptable enough to start over."
      }
    ]
  }
];
export const articleTocItems = articleSections.map(({ id, title }) => ({ id, label: title }));
