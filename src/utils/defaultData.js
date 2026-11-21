// Default Initial State & Seed Data for CreatorPilot AI

export const INITIAL_USER = {
  id: "usr_78912",
  name: "Alex Rivera",
  email: "alex@creatorpilot.demo",
  channelName: "DevPulse AI",
  handle: "@devpulse_ai",
  platform: "YouTube",
  secondaryPlatforms: ["Instagram", "Twitter/X", "LinkedIn"],
  niche: "AI Tools & Tech Tutorials",
  targetAudience: "Aspiring developers, tech professionals, and college students looking for practical AI workflows.",
  preferredLanguage: "English",
  subscribers: "148,500",
  monthlyViews: "520,000",
  avgEngagementRate: "7.8%",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  bio: "Teaching 140k+ creators & engineers how to build with modern AI and developer stacks.",
  tier: "Pro Creator",
  joinedDate: "January 2025"
};

export const INITIAL_IDEAS = [
  {
    id: "idea-1",
    title: "5 AI Tools That Save 20+ Hours Every Week for Students & Devs",
    topic: "AI Productivity & Workflow Automation",
    platform: "YouTube",
    targetAudience: "College students & remote software engineers",
    format: "long_form",
    status: "Script",
    createdAt: "2026-11-12",
    effort: "Medium",
    viewsEstimate: "45,000"
  },
  {
    id: "idea-2",
    title: "Building a Production-Grade Agent in 15 Minutes (Zero to Hero)",
    topic: "AI Agent Frameworks & Deep Dive",
    platform: "YouTube",
    targetAudience: "Junior & Mid-level Engineers",
    format: "long_form",
    status: "Production",
    createdAt: "2026-11-14",
    effort: "High",
    viewsEstimate: "75,000"
  },
  {
    id: "idea-3",
    title: "Stop Using ChatGPT Like a Beginner: 3 Advanced Prompt Techniques",
    topic: "Prompt Engineering & Productivity",
    platform: "Instagram",
    targetAudience: "General tech enthusiasts & students",
    format: "short_form",
    status: "Published",
    createdAt: "2026-11-10",
    effort: "Low",
    viewsEstimate: "120,000"
  },
  {
    id: "idea-4",
    title: "Why Most Tech Startups Are Switching from Next.js to FastAPI in 2026",
    topic: "Modern Tech Stacks & Architecture",
    platform: "YouTube",
    targetAudience: "Full-stack developers and tech leads",
    format: "long_form",
    status: "Research",
    createdAt: "2026-11-15",
    effort: "High",
    viewsEstimate: "60,000"
  },
  {
    id: "idea-5",
    title: "Day in the Life of a Solopreneur Creator Building AI Software",
    topic: "Vlog & Behind the Scenes",
    platform: "YouTube",
    targetAudience: "Community & prospective creators",
    format: "long_form",
    status: "Idea",
    createdAt: "2026-11-16",
    effort: "Medium",
    viewsEstimate: "35,000"
  }
];

export const INITIAL_STRATEGY = {
  topic: "5 AI Tools That Save 20+ Hours Every Week for Students & Devs",
  target_audience: "College students, self-taught devs, and remote knowledge workers",
  content_angle: "Cut through AI hype by showcasing 5 battle-tested workflows that eliminate repetitive homework and coding busywork.",
  format: "long_form",
  estimated_duration: "11 - 13 minutes",
  hooks: [
    {
      id: "h1",
      type: "High Stakes & Loss Aversion",
      text: "If you're still spending 4 hours researching, formatting code, and organizing study notes by hand, you're competing at a massive disadvantage in 2026."
    },
    {
      id: "h2",
      type: "Curiosity & Contrarian",
      text: "90% of people use AI like a glorified search engine. Today, I'm showing you the exact 5 background automation setups that do my actual college assignments and client prep while I sleep."
    },
    {
      id: "h3",
      type: "Relatable Pain Point",
      text: "Last semester, I almost burned out between 18 credit hours and freelance projects—until I built this 5-tool automated pipeline. Here is the blueprint."
    }
  ],
  title_options: [
    "I Tested 50+ AI Tools: Only These 5 Are Actually Worth It",
    "5 AI Automations That Save 20+ Hours A Week (Student & Dev Guide)",
    "Stop Wasting Time: 5 AI Tools You Should Be Using Daily in 2026",
    "The Ultimate AI Student Stack (Save 3 Hours Every Single Day)"
  ],
  outline: [
    {
      heading: "00:00 - The High-Stakes Opening",
      purpose: "Hook viewers with the reality of AI work inflation and promise 5 practical, free/cheap tool setups.",
      talking_points: ["The productivity trap of basic prompting", "Overview of time saved: 20 hrs/week benchmark"]
    },
    {
      heading: "01:15 - Tool #1: Smart Context Aggregator",
      purpose: "Demonstrate automated PDF & lecture note synthesis with zero hallucination.",
      talking_points: ["How to feed semester syllabus or repo docs", "Live side-by-side speed test"]
    },
    {
      heading: "03:45 - Tool #2: Local LLM Pair Programmer",
      purpose: "Show an IDE sidecar that writes unit tests and debugs error logs in real time.",
      talking_points: ["Zero token costs on local machine", "Demonstrating fixing a broken React component"]
    },
    {
      heading: "06:20 - Tool #3: Voice-to-Structured-Action Engine",
      purpose: "Capturing chaotic brain dumps on phone and turning them into clean GitHub tasks or study flashcards.",
      talking_points: ["Mobile app demo while walking", "Instant Markdown export"]
    },
    {
      heading: "08:50 - Tool #4: Automated Citation & Literature Mapper",
      purpose: "Eliminating the nightmare of academic papers and tech documentation reviews.",
      talking_points: ["Graph view of connected research", "Auto-generating APA/BibTeX citations"]
    },
    {
      heading: "10:30 - Tool #5: Autonomous Calendar & Focus Shield",
      purpose: "Guarding deep work blocks and scheduling recordings without back-and-forth emails.",
      talking_points: ["AI rescheduling buffer when tasks overrun", "Preventing afternoon burnout"]
    },
    {
      heading: "12:15 - Closing & Call to Action",
      purpose: "Drive engagement and prompt viewers to download the free cheat sheet.",
      talking_points: ["Pinning top comment with tool download links", "Ask: 'Which tool was your favorite?'"]
    }
  ],
  call_to_action: "Drop a comment with which tool you're trying first, and check the pinned link for my complete Notion template with all prompt formulas.",
  production_effort: {
    level: "Medium",
    shooting_time: "2.5 hours",
    editing_complexity: "Medium (Screen recordings with zoom cuts and motion graphics)",
    b_roll_needed: "High (Clean B-roll screencasts of each tool interface)"
  }
};

export const INITIAL_SCRIPTS = [
  {
    id: "script-101",
    ideaId: "idea-1",
    title: "5 AI Tools That Save 20+ Hours Every Week",
    format: "long_form",
    language: "English",
    currentVersion: "v2.1",
    updatedAt: "2026-11-15 16:30",
    wordCount: 1680,
    estimatedMinutes: "11m 40s",
    versions: [
      {
        version: "v1.0",
        date: "2026-11-12 11:00",
        note: "Initial Gemini Draft",
        content: `[00:00 - HOOK]
(Camera: Tight shot, high energy)
If you're still spending 4 hours researching, formatting code, and organizing study notes by hand, you're competing at a massive disadvantage in 2026.

[00:45 - INTRO]
I spent the last 3 months testing over 50 new AI productivity extensions so you don't have to. Today, I'm cutting through the vaporware to give you the 5 exact setups that save me 20 hours every single week.`
      },
      {
        version: "v2.1",
        date: "2026-11-15 16:30",
        note: "Added B-roll Callouts, Pacing Polish & Hinglish cues",
        content: `[00:00 - HOOK - HIGH STAKES]
(Visual: Quick montage of calendar overflowing with red blocks -> sudden snap to clean, empty desk)
[Audio: Sub bass drop]
ALEX:
"If you are still spending 4 hours writing boilerplate code, summarizing 80-page PDFs by hand, or drowning in unorganized lecture notes... you are competing at a huge disadvantage in 2026."

[00:25 - TENSION & PROMISE]
(Visual: Screen recording showing 50 folders of useless AI tools being deleted)
ALEX:
"Most 'top AI tools' videos are just paid sponsorships for apps that will shut down in 6 months. But today, we're cutting through the noise. I'll show you five zero-fluff automations that run in the background while you focus on deep work."

[01:10 - TOOL 1: SMART CONTEXT SYNTHESIZER]
(Visual: Split screen - student textbook on left, clean structured markdown mindmap generating on right)
[B-Roll: Close up typing on mechanical keyboard]
ALEX:
"First up: Stop copy-pasting text into web chat windows. Instead, we use an indexed workspace scanner. When you dump an entire syllabus or a 10,000-line codebase into this folder, it creates a local vector index."

[04:20 - TOOL 2: IN-EDITOR CODE EXPLAINER]
(Visual: VS Code terminal throwing a nasty red syntax error, cursor triggers shortcut, explanation appears in 1.2s)
ALEX:
"Tool number two solves the biggest pain point for student programmers: cryptic compiler errors at 2 AM. Watch what happens when I trigger this inline debugger..."

[08:15 - TOOL 3: VOICE-TO-ACTION BRAIN DUMP]
(Visual: Walking outside with phone, speaking naturally, phone transcribes directly into sorted Notion checklist)
ALEX:
"How many great video ideas or study insights do you forget the moment you get home? This mobile shortcut takes raw voice rambles and structures them into prioritized tasks."

[11:00 - CALL TO ACTION]
(Visual: Motion graphics card with download link and community Discord QR code)
ALEX:
"I packaged the exact config files and prompt templates for all 5 tools into a free guide linked in the description. If this saved you even one hour this week, hit subscribe and drop your favorite tool below!"`
      }
    ],
    reviewMetrics: {
      hookScore: 94,
      clarityScore: 91,
      pacingScore: 88,
      storytellingGrade: "A+",
      suggestions: [
        "Hook introduces clear stakes within the first 6 seconds - excellent retention driver.",
        "Add a 5-second teaser of Tool #4 before minute 02:00 to reduce early drop-off.",
        "Pacing slows slightly around minute 06:00; consider adding a visual speed-up or timer graphic."
      ]
    },
    shortRepurposed: [
      {
        id: "short-1",
        title: "Short 1: The 2 AM Coding Fix You Didn't Know Existed",
        targetDuration: "45s",
        hook: "Stop copying error messages into ChatGPT like this...",
        body: "Watch what happens when you bind this local LLM hotkey in VS Code. It doesn't just fix the bug—it writes the missing test case and explains the algorithmic trap in 3 bullet points.",
        cta: "Full 5-tool breakdown on my channel link in bio!"
      },
      {
        id: "short-2",
        title: "Short 2: Turn 80-Page PDFs into 2-Minute Flashcards",
        targetDuration: "50s",
        hook: "If you have an exam next week, watch this before you start reading chapter 1.",
        body: "Instead of highlighting half the textbook, drag the PDF into this context engine. Ask: 'What are the 10 hardest edge-cases most professors test on?' Boom—instant high-yield study deck.",
        cta: "Save this reel so you don't forget during finals week!"
      },
      {
        id: "short-3",
        title: "Short 3: My 20-Hour Productivity Secret",
        targetDuration: "35s",
        hook: "I took 18 college credits while building a 140k tech channel. Here's my secret weapon.",
        body: "I don't type notes anymore. I speak my raw thoughts while walking between classes, and this AI tool automatically files them into my project manager with deadlines attached.",
        cta: "Comment 'TOOL' and I'll DM you the link!"
      }
    ]
  }
];

export const INITIAL_THUMBNAIL_LAB = [
  {
    id: "thumb-1",
    ideaTitle: "5 AI Tools That Save 20+ Hours Every Week",
    options: [
      {
        id: "opt-1",
        title: "I Tested 50+ AI Tools: Only 5 Are Worth It",
        category: "Curiosity & High Stakes",
        predictedCtr: 9.8,
        recommendedBadge: "Highest Predicted CTR",
        brief: {
          visualConcept: "Split screen: Alex looking intensely skeptical on the left with a big red '50 JUNK APPS' stamp, pointing toward a glowing neon green box on the right labeled 'THE HOLY GRAIL'.",
          textOverlay: "ONLY 5 WORK",
          textPosition: "Top-Right, Bold Impact Font, Yellow fill with black stroke",
          composition: "Rule of thirds. Subject face on left third taking up 40% of height. Glowing tool badges on right.",
          expression: "Shocked/Disapproving eyebrow raise pointing to left, excited glance to right.",
          contrastScheme: "Deep navy background (#0B1120) with high-intensity electric yellow (#FFE600) and emerald (#10B981) highlights.",
          audienceAngle: "Saves them money and hours of testing by acting as the trusted filter."
        }
      },
      {
        id: "opt-2",
        title: "5 AI Automations That Do My Work While I Sleep",
        category: "Aspirational & Passive Value",
        predictedCtr: 8.7,
        brief: {
          visualConcept: "Alex sleeping comfortably on desk chair with cozy ambient light, while laptop screen projects glowing holographic automated workflows.",
          textOverlay: "DO NOT WORK",
          textPosition: "Bottom center, bold red pill",
          composition: "Centered subject with dynamic glowing HUD overlays.",
          expression: "Serene / smiling resting face.",
          contrastScheme: "Moody purple/dark teal with high-contrast white and magenta glow.",
          audienceAngle: "The fantasy of true effortless leverage."
        }
      },
      {
        id: "opt-3",
        title: "Stop Using ChatGPT (Use These 5 Instead)",
        category: "Contrarian / Debunking",
        predictedCtr: 9.2,
        brief: {
          visualConcept: "ChatGPT logo inside a broken glass circle with a red caution triangle, surrounded by 5 slick modern futuristic app icons.",
          textOverlay: "IT'S OVER.",
          textPosition: "Left side, huge bold typography",
          composition: "Dramatic angled perspective.",
          expression: "Serious warning glance directly at viewer.",
          contrastScheme: "Dark slate with aggressive crimson warning reds and crisp white accents.",
          audienceAngle: "FOMO that their current favorite tool is already obsolete."
        }
      }
    ],
    activeAbTest: {
      variantA: { name: "Variant A (ONLY 5 WORK)", impressions: 24500, clicks: 2352, ctr: 9.6, status: "Active Winner" },
      variantB: { name: "Variant B (IT'S OVER)", impressions: 23800, clicks: 1951, ctr: 8.2, status: "Underperforming" }
    }
  }
];

export const INITIAL_KANBAN = [
  {
    id: "task-1",
    title: "5 AI Tools That Save 20+ Hours Every Week",
    platform: "YouTube",
    stage: "Script",
    assignee: "Alex Rivera (Creator)",
    dueDate: "2026-11-20",
    priority: "High",
    tags: ["Productivity", "Top Priority", "Sponsor Ready"]
  },
  {
    id: "task-2",
    title: "Building a Production-Grade Agent in 15 Minutes",
    platform: "YouTube",
    stage: "Production",
    assignee: "Marcus Vance (Editor)",
    dueDate: "2026-11-23",
    priority: "Urgent",
    tags: ["Deep Dive", "Code Demo"]
  },
  {
    id: "task-3",
    title: "Why Most Tech Startups Are Switching from Next.js",
    platform: "YouTube",
    stage: "Research",
    assignee: "Sarah Chen (Researcher)",
    dueDate: "2026-11-26",
    priority: "Medium",
    tags: ["Tech Architecture"]
  },
  {
    id: "task-4",
    title: "Stop Using ChatGPT Like a Beginner (Shorts Repurpose)",
    platform: "Instagram",
    stage: "Review",
    assignee: "Elena Rostova (Shorts Manager)",
    dueDate: "2026-11-18",
    priority: "High",
    tags: ["Vertical 9:16", "Growth"]
  },
  {
    id: "task-5",
    title: "Desk Setup 2026: Minimalist Cable Management & Lighting",
    platform: "YouTube",
    stage: "Idea",
    assignee: "Alex Rivera (Creator)",
    dueDate: "2026-12-02",
    priority: "Low",
    tags: ["Lifestyle", "Affiliate"]
  },
  {
    id: "task-6",
    title: "Mastering Gemini 2.0 Flash in Python",
    platform: "YouTube",
    stage: "Published",
    assignee: "Alex Rivera (Creator)",
    dueDate: "2026-11-08",
    priority: "Done",
    tags: ["Tutorial", "125k Views"]
  }
];

export const INITIAL_COMMENTS = [
  {
    id: "cmt-1",
    author: "@code_ninja_99",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=60&auto=format&fit=crop&q=80",
    text: "Can you do a dedicated video explaining how to integrate Tool #2 with a private FastAPI backend? That would be insane for college projects!",
    sentiment: "Positive",
    isQuestion: true,
    topic: "FastAPI Integration",
    flagged: false,
    likes: 142
  },
  {
    id: "cmt-2",
    author: "@sarah_dev_journey",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&auto=format&fit=crop&q=80",
    text: "Honestly this saved me at least 5 hours on my thesis research yesterday. The context scanner tool is pure magic.",
    sentiment: "Positive",
    isQuestion: false,
    topic: "Study Workflow",
    flagged: false,
    likes: 89
  },
  {
    id: "cmt-3",
    author: "@crypto_pump_bot_2984",
    avatar: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=60&auto=format&fit=crop&q=80",
    text: "INVEST IN BITCOIN 1000X PROFIT GUARANTEED CLICK TELEGRAM @PROFIT_KINGS FREE MONEY NOW",
    sentiment: "Negative",
    isQuestion: false,
    topic: "Spam",
    flagged: true,
    flagReason: "Bot Spam / Financial Fraud",
    likes: 0
  },
  {
    id: "cmt-4",
    author: "@rahul_sharma_tech",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&auto=format&fit=crop&q=80",
    text: "Bhaiya, do these tools work on Windows PowerShell or only Mac/Linux? Please clarify in the pinned comment!",
    sentiment: "Neutral",
    isQuestion: true,
    topic: "OS Compatibility",
    flagged: false,
    likes: 34
  },
  {
    id: "cmt-5",
    author: "@skeptic_viewer",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&auto=format&fit=crop&q=80",
    text: "Nice video but I feel Tool #4 has privacy concerns if you upload proprietary company code. You should have mentioned local self-hosted alternatives.",
    sentiment: "Constructive",
    isQuestion: false,
    topic: "Privacy & Security",
    flagged: false,
    likes: 56
  },
  {
    id: "cmt-6",
    author: "@design_enthusiast",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&auto=format&fit=crop&q=80",
    text: "What microphone and lighting do you use? The audio clarity in this tutorial was top notch!",
    sentiment: "Positive",
    isQuestion: true,
    topic: "Creator Gear",
    flagged: false,
    likes: 19
  }
];

export const INITIAL_BRAND_CAMPAIGNS = [
  {
    id: "brand-1",
    brandName: "Supabase",
    contactPerson: "Jessica Miller (Developer Marketing)",
    email: "jessica@supabase.io",
    dealType: "Dedicated Integration (60s mid-roll)",
    status: "In Negotiation",
    proposedFee: 3200,
    pitchDate: "2026-11-10",
    followUpDate: "2026-11-19",
    targetVideo: "Building a Production-Grade Agent in 15 Minutes",
    notes: "They loved our previous PostgreSQL breakdown. Asking for GitHub starter repo link in description.",
    pitchSummary: "Highlighting instant vector search and Postgres auth for developers."
  },
  {
    id: "brand-2",
    brandName: "NordVPN",
    contactPerson: "David Cohen",
    email: "partnerships@nordvpn-creators.com",
    dealType: "2-Video Sponsorship Package",
    status: "Contract Signed",
    proposedFee: 5500,
    pitchDate: "2026-11-04",
    followUpDate: "2026-11-22",
    targetVideo: "5 AI Tools That Save 20+ Hours Every Week",
    notes: "Contract signed, awaiting brand guidelines asset pack. Promo code: DEVPULSE.",
    pitchSummary: "Online developer security and bypassing regional API geoblocks."
  },
  {
    id: "brand-3",
    brandName: "Linear App",
    contactPerson: "Tobias Lindqvist",
    email: "creators@linear.app",
    dealType: "Sponsored Workflow Spotlight",
    status: "Pitched",
    proposedFee: 2800,
    pitchDate: "2026-11-14",
    followUpDate: "2026-11-21",
    targetVideo: "Day in the Life of a Solopreneur Creator",
    notes: "Sent cold outreach detailing our 140k dev audience engagement rate.",
    pitchSummary: "Showcasing how CreatorPilot and Linear handle agile content sprints."
  }
];

export const INITIAL_ANALYTICS = {
  overview: {
    totalSubscribers: 148500,
    subscribersGained30d: 8420,
    monthlyViews: 520000,
    avgWatchTime: "6m 45s",
    avgCtr: "8.4%",
    totalRevenueEstimated: 12450,
    activeSponsorshipsValue: 11500
  },
  performanceHistory: [
    { week: "Oct W1", views: 98000, watchHours: 8900, subscribers: 1200 },
    { week: "Oct W2", views: 112000, watchHours: 10400, subscribers: 1650 },
    { week: "Oct W3", views: 105000, watchHours: 9800, subscribers: 1420 },
    { week: "Oct W4", views: 128000, watchHours: 12100, subscribers: 2100 },
    { week: "Nov W1", views: 140000, watchHours: 13500, subscribers: 2450 },
    { week: "Nov W2", views: 165000, watchHours: 15800, subscribers: 3100 }
  ],
  sentimentDistribution: [
    { name: "Positive", value: 68, color: "#10b981" },
    { name: "Neutral", value: 16, color: "#6366f1" },
    { name: "Constructive", value: 12, color: "#f59e0b" },
    { name: "Negative/Spam", value: 4, color: "#f43f5e" }
  ],
  stageBreakdown: [
    { stage: "Idea", count: 4, fill: "#94a3b8" },
    { stage: "Research", count: 2, fill: "#38bdf8" },
    { stage: "Script", count: 3, fill: "#6366f1" },
    { stage: "Production", count: 2, fill: "#f59e0b" },
    { stage: "Review", count: 1, fill: "#a855f7" },
    { stage: "Published", count: 18, fill: "#10b981" }
  ]
};
