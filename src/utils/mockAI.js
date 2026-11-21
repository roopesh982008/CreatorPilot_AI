// Mock Gemini Service - Simulates Server-Side FastAPI Gemini API integration
// Follows structured JSON output schemas specified in the project assignment

export const mockAI = {
  // 1. Content Strategy Generator
  generateStrategy: async ({ topic, targetAudience, platform, language, format }) => {
    // Simulate API network roundtrip
    await new Promise((r) => setTimeout(r, 1200));

    return {
      topic: topic || "AI tools for creators",
      target_audience: targetAudience || "Tech-savvy creators and developers",
      content_angle: `A high-utility, no-fluff breakdown showing how to leverage ${topic} with actionable demonstrations.`,
      format: format || "long_form",
      estimated_duration: format === "short_form" ? "45 - 60 seconds" : "12 - 15 minutes",
      hooks: [
        {
          id: `h_${Date.now()}_1`,
          type: "High Stakes & Urgency",
          text: `If you haven't automated this part of ${topic} by 2026, you are already losing 15 hours every week to someone who did.`
        },
        {
          id: `h_${Date.now()}_2`,
          type: "Contrarian Truth",
          text: `Most people teach ${topic} completely backwards. Today, I'll reveal the 3 hidden shortcuts industry insiders actually rely on.`
        },
        {
          id: `h_${Date.now()}_3`,
          type: "Curiosity Gap",
          text: `What happens when you combine ${topic} with a clean automated pipeline? The results surprised even senior engineers.`
        }
      ],
      title_options: [
        `The Ultimate Guide to ${topic} in 2026`,
        `Stop Doing This Wrong: Practical ${topic} Masterclass`,
        `I Built a Custom System for ${topic} (And Why It Changes Everything)`,
        `How Top 1% Creators Master ${topic} Without Burning Out`
      ],
      outline: [
        {
          heading: "00:00 - High-Impact Hook",
          purpose: "Capture viewer attention in the first 5 seconds and state the exact transformation promised.",
          talking_points: ["The immediate pain point", "Before vs After teaser"]
        },
        {
          heading: "01:30 - Core Architectural Concept",
          purpose: "Deconstruct the foundational principle behind the topic so beginners and pros follow easily.",
          talking_points: ["Why the old method failed", "The 2026 modern paradigm"]
        },
        {
          heading: "04:15 - Live Step-by-Step Walkthrough",
          purpose: "Hands-on execution showing realistic screen recordings, code, or workflow tips.",
          talking_points: ["Setup and initial configuration", "Avoiding the common beginner traps"]
        },
        {
          heading: "08:45 - Advanced Pro-Tips & Edge Cases",
          purpose: "Elevate value for experienced viewers and demonstrate deep domain authority.",
          talking_points: ["Performance optimization", "Secret settings 90% miss"]
        },
        {
          heading: "11:30 - Retention-Driven Closing & CTA",
          purpose: "Prompt viewer interaction, link relevant assets, and hook to the next video.",
          talking_points: ["Community question of the day", "Free template download link"]
        }
      ],
      call_to_action: "Drop a comment with your biggest roadblock, and grab the free companion checklist linked below!",
      production_effort: {
        level: "Medium",
        shooting_time: "2 hours",
        editing_complexity: "Moderate (Split-screens, on-screen subtitles, dynamic zooms)",
        b_roll_needed: "High (Clean B-roll screencasts and closeups)"
      }
    };
  },

  // 2. Regenerate Section
  regenerateStrategySection: async (sectionName, topic) => {
    await new Promise((r) => setTimeout(r, 800));

    if (sectionName === "hooks") {
      return [
        {
          id: `h_regen_${Date.now()}_1`,
          type: "Story-Driven Hook",
          text: `Six months ago, I was completely overwhelmed by ${topic}. Here's the one mental shift that changed my entire output.`
        },
        {
          id: `h_regen_${Date.now()}_2`,
          type: "Shock Factor",
          text: `Forget everything you thought you knew about ${topic}. A major shift just made 80% of current tutorials obsolete.`
        },
        {
          id: `h_regen_${Date.now()}_3`,
          type: "Question Hook",
          text: `Are you making this expensive mistake with ${topic}? Here's how to diagnose and fix it in 3 minutes.`
        }
      ];
    }

    if (sectionName === "title_options") {
      return [
        `Why ${topic} Will Make or Break Your Channel in 2026`,
        `The Only ${topic} Tutorial You Will Ever Need`,
        `We Tested 10 Methods for ${topic} — Here's the Winner`,
        `From Zero to Pro: ${topic} Full Course (No BS)`
      ];
    }

    return null;
  },

  // 3. AI Script Studio Generator
  generateScriptDraft: async ({ title, topic, strategy, format, language }) => {
    await new Promise((r) => setTimeout(r, 1500));

    let languagePrefix = "";
    if (language === "Hinglish") {
      languagePrefix = `[HINGLISH SCRIPT]
(Scene 1 - Studio Shot)
ALEX:
"Agar aap abhi bhi ${topic || title} manually kar rahe ho, toh bhai aapka daily 2-3 ghanta waste ho raha hai.
Aaj hum step-by-step dekhenge kaise aap isko automate kar sakte ho bilkul effortlessly!"`;
    } else if (language === "Kannada") {
      languagePrefix = `[KANNADA / KAN-ENG SCRIPT]
(Scene 1 - Intro)
ALEX:
"Nimage ${topic || title} bagge thiliyadidre, ee video nodi. Ee simple tricks use maadi nimma time save madi!"`;
    } else {
      languagePrefix = `[SCENE 1 - 00:00 - THE HOOK]
(Visual: Fast cut sequence showing the frustation of doing things manually, then a satisfying snap to automated bliss)
[Audio: Dynamic upbeat electronic punch]
HOST:
"If you are still trying to figure out ${topic || title} the old way, you are wasting hours of creative energy every single week."

[SCENE 2 - 00:35 - THE CONTRARIAN TRUTH]
(Visual: Host on camera, relaxed posture, clean desk aesthetic)
HOST:
"Most advice online tells you to overcomplicate things. But after testing dozens of systems, here is the leanest, most effective workflow that actually produces results in 2026."

[SCENE 3 - 01:45 - STEP 1: THE FOUNDATION]
(Visual: High resolution screen capture, mouse movement highlighted in neon emerald)
HOST:
"Let's jump straight into the setup. Notice how this clean configuration eliminates all repetitive friction right from day one."

[SCENE 4 - 05:20 - STEP 2: THE MULTIPLIER]
(Visual: Split screen comparison - manual time: 45m vs automated time: 45s)
HOST:
"This is where the magic happens. By chaining these operations together, you get 10x leverage with zero extra effort."

[SCENE 5 - 09:10 - CLOSING & ENGAGEMENT]
(Visual: Resource slide with QR code, link in description banner)
HOST:
"I packaged all the notes and templates for this into a free guide below. What is your biggest challenge with ${topic}? Let me know in the comments, and don't forget to subscribe for more creator deep-dives!"`;
    }

    return {
      scriptText: languagePrefix,
      language: language || "English",
      format: format || "long_form",
      wordCount: languagePrefix.split(/\s+/).length,
      version: "v1.0"
    };
  },

  // 4. Script Hook & Quality Review
  reviewScript: async (text) => {
    await new Promise((r) => setTimeout(r, 900));

    const wordCount = text ? text.split(/\s+/).length : 0;
    const hasHook = text.toLowerCase().includes("hook") || text.toLowerCase().includes("if you");
    const hasCta = text.toLowerCase().includes("comment") || text.toLowerCase().includes("subscribe") || text.toLowerCase().includes("link");

    return {
      hookScore: hasHook ? 95 : 72,
      clarityScore: 92,
      pacingScore: 89,
      storytellingGrade: "A",
      wordCount: wordCount,
      estimatedReadingTime: `${Math.ceil(wordCount / 130)} min`,
      suggestions: [
        "Strong opening hook with emotional resonance and clear stakes.",
        hasCta ? "Clear call-to-action placed at the natural conclusion." : "Consider strengthening the final CTA to ask an explicit question.",
        "Add visual B-roll indicators every 25-30 seconds to maintain visual pacing."
      ],
      breakdown: {
        problemDefinition: "Excellent",
        tensionBuilding: "Strong",
        valueDelivery: "Comprehensive",
        pacingFlow: "Consistent"
      }
    };
  },

  // 5. Repurpose to Shorts
  repurposeToShorts: async (scriptContent, ideaTitle) => {
    await new Promise((r) => setTimeout(r, 1100));

    return [
      {
        id: `short_rep_${Date.now()}_1`,
        title: "Short 1: The 15-Second Breakdown",
        targetDuration: "40s",
        hook: `Stop doing ${ideaTitle || "this"} the slow way...`,
        body: "Here is the exact shortcut top creators use in 2026. Instead of spending 3 hours grinding, set up this 2-minute automation.",
        cta: "Hit follow for daily creator hacks!"
      },
      {
        id: `short_rep_${Date.now()}_2`,
        title: "Short 2: The #1 Mistake You Are Making",
        targetDuration: "45s",
        hook: `Are you still making this mistake with ${ideaTitle || "your content"}?`,
        body: "Most people fail because they focus on output instead of leverage. Watch what happens when you flip this single setting.",
        cta: "Save this for your next video shoot!"
      },
      {
        id: `short_rep_${Date.now()}_3`,
        title: "Short 3: The Secret Tool Nobody Mentions",
        targetDuration: "35s",
        hook: "I bet you didn't know this free tool existed...",
        body: "It turns 2 hours of boring editing and formatting into a 10-second automatic background task.",
        cta: "Full link in my channel bio!"
      }
    ];
  },

  // 6. Title and Thumbnail Laboratory
  generateThumbnailAndTitles: async (ideaTitle, niche) => {
    await new Promise((r) => setTimeout(r, 1000));

    return {
      titleOptions: [
        {
          id: "t1",
          title: `I Tested 50+ Methods for ${ideaTitle || "Content"} (Only 3 Worked)`,
          category: "Curiosity & High Stakes",
          predictedCtr: 9.7,
          badge: "Recommended"
        },
        {
          id: "t2",
          title: `Why 99% of People Fail at ${ideaTitle || "This Strategy"} in 2026`,
          category: "Contrarian / Threat",
          predictedCtr: 9.3
        },
        {
          id: "t3",
          title: `How I Automated My Entire ${ideaTitle || "Workflow"} (Step-by-Step)`,
          category: "How-To / Authority",
          predictedCtr: 8.8
        },
        {
          id: "t4",
          title: `Stop Wasting Time on ${ideaTitle || "This Mistake"}!`,
          category: "Urgency / Loss Aversion",
          predictedCtr: 9.1
        },
        {
          id: "t5",
          title: `The Ultimate ${ideaTitle || "Masterclass"} You Were Waiting For`,
          category: "Comprehensive Guide",
          predictedCtr: 8.4
        }
      ],
      creativeBriefs: [
        {
          id: "cb1",
          name: "Concept A: The Stark Comparison (High Contrast)",
          visualConcept: "Split frame: Creator looking stressed next to a cluttered red graphic on left; smiling creator pointing to glowing neon green badge on right.",
          textOverlay: "STOP DOING THIS",
          textPosition: "Top right, angled bold typeface in electric yellow (#FFE600)",
          composition: "Rule of thirds, creator eyes at top third line, vibrant colored outline cutout.",
          expression: "Intense skepticism on left, confident relief on right.",
          contrastScheme: "Dark slate background (#0A0F1D) with high-saturation yellow and cyan rim lighting.",
          audienceAngle: "Taps into frustration with current inefficient habits."
        },
        {
          id: "cb2",
          name: "Concept B: The Secret Vault (Curiosity)",
          visualConcept: "Creator holding a futuristic holographic tablet displaying an unlocked glowing blueprint with blurred secret points.",
          textOverlay: "THE SECRET FIX",
          textPosition: "Center-bottom, high contrast pill banner",
          composition: "Centered close-up with intense cinematic depth of field.",
          expression: "Subtle knowing smirk, direct eye contact with camera.",
          contrastScheme: "Deep navy and obsidian with neon emerald (#10B981) highlights.",
          audienceAngle: "Appeals to the desire for an unfair insider advantage."
        }
      ]
    };
  },

  // 7. Audience Intelligence Analyzer
  analyzeComments: async (commentsInput) => {
    await new Promise((r) => setTimeout(r, 1300));

    return {
      sentimentBreakdown: [
        { name: "Positive", value: 68, count: 34, color: "#10b981" },
        { name: "Neutral", value: 16, count: 8, color: "#6366f1" },
        { name: "Constructive", value: 12, count: 6, color: "#f59e0b" },
        { name: "Negative/Spam", value: 4, count: 2, color: "#f43f5e" }
      ],
      topQuestions: [
        { question: "How do you connect this with a private FastAPI or Node.js server?", frequency: "34 viewers" },
        { question: "Does this require a paid subscription or does the free tier work?", frequency: "28 viewers" },
        { question: "Can we run this locally on Windows PowerShell without Docker?", frequency: "19 viewers" },
        { question: "What microphone and audio filters give that studio voice clarity?", frequency: "14 viewers" }
      ],
      topicClusters: [
        { topic: "API & Backend Integration", percentage: 38 },
        { topic: "Pricing & Free Tier Limits", percentage: 26 },
        { topic: "Windows vs Mac Compatibility", percentage: 20 },
        { topic: "Studio Setup & Gear", percentage: 16 }
      ],
      flaggedSpam: [
        {
          author: "@crypto_pump_bot",
          text: "INVEST IN BITCOIN 1000X PROFIT GUARANTEED CLICK TELEGRAM @PROFIT_KINGS FREE MONEY NOW",
          reason: "Cryptocurrency / Telegram phishing scam",
          confidence: "99.2%"
        },
        {
          author: "@telegram_sub_booster",
          text: "Buy 10k real subscribers for $5 click link in my bio fast instant delivery guaranteed",
          reason: "Spam bot link",
          confidence: "98.5%"
        }
      ],
      suggestedVideoIdeas: [
        {
          title: "Complete FastAPI + AI Integration Guide (Step-by-Step)",
          reason: "34 viewers asked about backend connectivity. High intent and high watch-time potential.",
          predictedDemand: "High"
        },
        {
          title: "Zero-Cost AI Tools: What Can You Actually Build for $0?",
          reason: "28 viewers expressed concern regarding subscription pricing.",
          predictedDemand: "Very High"
        },
        {
          title: "My 2026 YouTube Studio Tour & Audio Processing Secret",
          reason: "Recurring comments praising microphone warmth and audio clarity.",
          predictedDemand: "Medium"
        }
      ]
    };
  },

  // 8. Brand Partnership Assistant
  draftBrandProposal: async ({ brandName, productCategory, targetDeliverable, creatorProfile, customOffer }) => {
    await new Promise((r) => setTimeout(r, 1100));

    const subscribers = creatorProfile?.subscribers || "148,000";
    const monthlyViews = creatorProfile?.monthlyViews || "520,000";
    const engagement = creatorProfile?.avgEngagementRate || "7.8%";
    const channelName = creatorProfile?.channelName || "DevPulse AI";
    const creatorName = creatorProfile?.name || "Alex Rivera";

    const emailSubject = `Partnership Proposal: ${brandName} x ${channelName} (${subscribers} Tech Audience)`;

    const emailBody = `Hi ${brandName} Partnerships Team,

I hope you're having a productive week!

My name is ${creatorName}, and I run ${channelName}—a community of over ${subscribers} developers, creators, and tech professionals passionate about high-utility workflows and modern developer tools.

Over the past 30 days alone, our channel generated ${monthlyViews} views with a high-intent engagement rate of ${engagement}. Our viewers actively implement the recommendations we showcase.

We've been genuinely following ${brandName}'s product development, particularly in ${productCategory || "developer tooling"}, and believe it's an organic fit for an upcoming video titled: "${customOffer || "Building Production-Grade AI Operations Platforms"}".

Here is the proposed collaboration package:
• Format: ${targetDeliverable || "60-second Dedicated In-Video Integration"}
• Deliverables: Native host-read demo, pinned top comment with trackable referral link, and link in video description.
• Optional Add-On: 1x Instagram Reel / YouTube Short repurpose for cross-platform amplification.

Our media kit is attached with detailed viewer demographics and audience retention case studies.

Would you be open to a quick 10-minute chat next Tuesday or Wednesday to explore this?

Best regards,

${creatorName}
Creator & Lead Host, ${channelName}
${creatorProfile?.email || "alex@creatorpilot.demo"}`;

    const estimatedRate = Math.round((parseInt(monthlyViews.replace(/,/g, "")) / 1000) * 18);

    return {
      emailSubject,
      emailBody,
      estimatedMarketRate: estimatedRate || 3200,
      pricingNotes: "Estimate based on 520k monthly views at ~$18-$25 CPM for high-intent B2B/tech developer audience. Not guaranteed market pricing.",
      talkingPoints: [
        "Emphasize audience alignment: 74% of viewers are software engineers, students, or founders.",
        "Highlight high organic click-through rate on previous sponsor links (avg 6.2%).",
        "Offer exclusivity window (no competing sponsor mentions for 14 days)."
      ]
    };
  },

  // 9. AI Copilot Chat Engine
  askCopilot: async (query, creatorContext) => {
    await new Promise((r) => setTimeout(r, 900));

    const lower = query.toLowerCase();

    if (lower.includes("script") || lower.includes("hook")) {
      return {
        reply: `Based on your channel (${creatorContext?.channelName || "DevPulse AI"}), high-retention hooks work best when they present a quantifiable threat or loss within 4 seconds.\n\nRecommended hook formula:\n"If you are still spending 3 hours on [Task], you are already behind in 2026. Here is the 60-second automation that fixes it."`,
        actionSuggestion: {
          label: "Open Script Studio with this Hook",
          route: "/scripts"
        }
      };
    }

    if (lower.includes("sponsor") || lower.includes("rate") || lower.includes("brand") || lower.includes("money")) {
      return {
        reply: `With ${creatorContext?.subscribers || "148,000"} subscribers and ${creatorContext?.monthlyViews || "520,000"} monthly views in the tech niche, your estimated baseline rate for a 60s mid-roll integration is **$2,800 – $3,500 USD**.\n\nTip: You can pitch a 2-video package with a Short repurpose for **$5,500 USD** to maximize deal value.`,
        actionSuggestion: {
          label: "Draft Brand Proposal Now",
          route: "/brands"
        }
      };
    }

    if (lower.includes("idea") || lower.includes("film") || lower.includes("video") || lower.includes("next")) {
      return {
        reply: `Looking at your audience sentiment and comment analysis, viewers are repeatedly asking for:
1. **"FastAPI + AI In-Depth Tutorial"** (34 viewer requests)
2. **"Zero-Cost AI Tools for Students"** (High virality potential)
3. **"Minimalist Desk & Audio Setup 2026"**

Would you like to generate a complete strategy for one of these?`,
        actionSuggestion: {
          label: "Generate Strategy in AI Strategist",
          route: "/strategist"
        }
      };
    }

    return {
      reply: `I've analyzed your workspace. You currently have **1 script in production**, **1 review pending**, and **$11,500** in active sponsorship deals.\n\nHow can I help streamline your operations today? You can ask me to draft a hook, analyze comments, schedule tasks, or prepare a 1-click campaign.`,
      actionSuggestion: {
        label: "Prepare 1-Click Campaign",
        modal: "campaign-wizard"
      }
    };
  }
};
