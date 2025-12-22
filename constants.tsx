import { SlideContent, SlideType } from './types';
import React from 'react';
import { 
  Globe, 
  Wifi, 
  MessageCircle, 
  Clock, 
  PenTool, 
  BookOpen, 
  Mic, 
  AlertTriangle, 
  Activity, 
  Zap, 
  Award, 
  Newspaper, 
  TrendingUp, 
  Users, 
  Search, 
  Star 
} from 'lucide-react';

export const SLIDES: SlideContent[] = [
  // --- PART 1 ---
  {
    id: 1,
    type: SlideType.PART_HEADER,
    content: "Part 1: The Internet",
    visualDescription: "Hogwarts Express Header",
    part: "Part 1"
  },
  {
    id: 2,
    type: SlideType.QUESTION,
    title: "Question & Translation",
    content: "How often do you use the internet to communicate with people abroad?",
    uzbek: "Chet eldagilar bilan muloqot qilish uchun internetdan qanchalik tez-tez foydalanasiz?",
    russian: "Как часто вы используете интернет для общения с людьми за границей?",
    visualDescription: "Owl with Wi-Fi symbol",
    part: "Part 1"
  },
  {
    id: 3,
    type: SlideType.QUIZ,
    title: "Quiz: Natural Phrasing",
    content: "Which sounds more natural to an examiner?",
    options: [
      { id: 'A', text: "I make the internet..." },
      { id: 'B', text: "I browse the internet...", isCorrect: true },
      { id: 'C', text: "I do the internet..." }
    ],
    visualDescription: "Three Golden Snitches",
    part: "Part 1"
  },
  {
    id: 4,
    type: SlideType.QUIZ,
    title: "Quiz: Grammar Tense",
    content: "For a habit starting in the past and continuing now, use:",
    options: [
      { id: 'A', text: "I used the internet..." },
      { id: 'B', text: "I have been using the internet...", isCorrect: true }
    ],
    visualDescription: "Binary Hourglass",
    part: "Part 1"
  },
  {
    id: 5,
    type: SlideType.TEST,
    title: "Quick Test",
    content: "Use \"daily basis\" in a sentence about your internet use.",
    visualDescription: "Marauder's Map Quill",
    part: "Part 1"
  },
  {
    id: 6,
    type: SlideType.INFO,
    title: "Model Answer Start",
    content: "To be honest, I rely on the internet almost constantly to stay in touch with my friends overseas...",
    visualDescription: "Pensieve Mist",
    part: "Part 1"
  },
  {
    id: 7,
    type: SlideType.QUIZ,
    title: "Quiz: Synonyms",
    content: "Replace \"stay in touch\" with a formal synonym:",
    options: [
      { id: 'A', text: "Maintain contact", isCorrect: true },
      { id: 'B', text: "Talk to" }
    ],
    visualDescription: "Restricted Section Books",
    part: "Part 1"
  },
  {
    id: 8,
    type: SlideType.QUIZ,
    title: "Quiz: Strategy",
    content: "If you forget a word, should you:",
    options: [
      { id: 'A', text: "Stay silent." },
      { id: 'B', text: "Use a filler like \"What I’m trying to say is...\"", isCorrect: true }
    ],
    visualDescription: "Moving Staircases",
    part: "Part 1"
  },
  {
    id: 9,
    type: SlideType.TEST,
    title: "Quick Test",
    content: "Complete: \"I use apps like WhatsApp to call my cousins, WHEREAS...\"",
    visualDescription: "Split Mirror",
    part: "Part 1"
  },
  {
    id: 10,
    type: SlideType.REASON,
    title: "Pauline's Insight",
    content: "Using specific terms like \"abroad\" or \"overseas\" instead of repeating \"other countries\" shows Lexical Resource.",
    insight: "Avoid repetition to boost your Band Score.",
    visualDescription: "Moving Portrait",
    part: "Part 1"
  },
  {
    id: 11,
    type: SlideType.QUIZ,
    title: "Quiz: Error Correction",
    content: "Correct the error: \"I use the internet for talk with friends.\"",
    options: [
      { id: 'A', text: "...for talking...", isCorrect: true },
      { id: 'B', text: "...to talking..." }
    ],
    visualDescription: "Cauldron Smoke",
    part: "Part 1"
  },
  {
    id: 12,
    type: SlideType.QUIZ,
    title: "Quiz: Pronunciation",
    content: "Where is the stress in 'CON-nec-tiv-i-ty'?",
    options: [
      { id: 'A', text: "1st syllable" },
      { id: 'B', text: "4th syllable (tiv)", isCorrect: true }
    ],
    visualDescription: "Sound Wave Spell",
    part: "Part 1"
  },
  {
    id: 13,
    type: SlideType.TEST,
    title: "Quick Test",
    content: "Use \"instantaneous\" in a sentence about messaging.",
    visualDescription: "Telescope Constellation",
    part: "Part 1"
  },
  {
    id: 14,
    type: SlideType.VOCAB,
    title: "Magic Vocab",
    content: "\"Bridging the gap\" (Idiom) - to reduce differences.",
    visualDescription: "Castle Bridge",
    part: "Part 1"
  },
  {
    id: 15,
    type: SlideType.QUIZ,
    title: "Quiz: Register",
    content: "Is \"Bridging the gap\" formal enough for Speaking Part 1?",
    options: [
      { id: 'A', text: "Yes", isCorrect: true },
      { id: 'B', text: "No" }
    ],
    visualDescription: "Sorting Hat Decision",
    part: "Part 1"
  },
  {
    id: 16,
    type: SlideType.TEST,
    title: "Quick Test",
    content: "Answer: \"Has the internet made the world feel smaller?\" using \"Bridging the gap.\"",
    visualDescription: "Master's Medal",
    part: "Part 1"
  },

  // --- PART 2 ---
  {
    id: 17,
    type: SlideType.PART_HEADER,
    content: "Part 2: Individual Long Turn",
    visualDescription: "Daily Prophet Animation",
    part: "Part 2"
  },
  {
    id: 18,
    type: SlideType.QUESTION,
    title: "The Prompt",
    content: "Describe an international news story that you found interesting.",
    uzbek: "O'zingizga qiziqarli tuyulgan xalqaro yangilik haqida gapirib bering.",
    russian: "Опишите международную новость, которая показалась вам интересной.",
    visualDescription: "Magical Quill",
    part: "Part 2"
  },
  {
    id: 19,
    type: SlideType.QUIZ,
    title: "Quiz: Preparation",
    content: "How should you use your 1-minute prep time?",
    options: [
      { id: 'A', text: "Write a full script." },
      { id: 'B', text: "Write keywords and collocations.", isCorrect: true }
    ],
    visualDescription: "Remembrall",
    part: "Part 2"
  },
  {
    id: 20,
    type: SlideType.QUIZ,
    title: "Quiz: Timing",
    content: "If the examiner stops you at 2 minutes, did you fail?",
    options: [
      { id: 'A', text: "Yes" },
      { id: 'B', text: "No", isCorrect: true }
    ],
    visualDescription: "Stopped Hourglass",
    part: "Part 2"
  },
  {
    id: 21,
    type: SlideType.TEST,
    title: "The Hook",
    content: "Use the hook: \"I’d like to talk about a significant development regarding...\"",
    visualDescription: "Sorting Hat Speech",
    part: "Part 2"
  },
  {
    id: 22,
    type: SlideType.INFO,
    title: "Model Answer",
    content: "I’d like to talk about a story I followed regarding the global shift to renewable energy, which has far-reaching consequences...",
    visualDescription: "Ancient Scroll",
    part: "Part 2"
  },
  {
    id: 23,
    type: SlideType.QUIZ,
    title: "Quiz: Vocabulary Upgrade",
    content: "Instead of \"good news,\" use:",
    options: [
      { id: 'A', text: "Nice info" },
      { id: 'B', text: "A significant breakthrough", isCorrect: true }
    ],
    visualDescription: "Glowing Wand",
    part: "Part 2"
  },
  {
    id: 24,
    type: SlideType.QUIZ,
    title: "Quiz: Tense",
    content: "Which tense sets the scene? \"I read / was reading the news when...\"",
    options: [
      { id: 'A', text: "read" },
      { id: 'B', text: "was reading", isCorrect: true }
    ],
    visualDescription: "Time Turner",
    part: "Part 2"
  },
  {
    id: 25,
    type: SlideType.TEST,
    title: "Quick Test",
    content: "Describe where you heard it: \"I stumbled across this while SCROLLING THROUGH...\"",
    visualDescription: "Digital Footprints",
    part: "Part 2"
  },
  {
    id: 26,
    type: SlideType.REASON,
    title: "Pauline's Insight",
    content: "To reach Band 7+, you must explain the IMPACT. Use abstract nouns like \"implications\" or \"consequences.\"",
    visualDescription: "Band Score Ladder",
    part: "Part 2"
  },
  {
    id: 27,
    type: SlideType.QUIZ,
    title: "Quiz: Transition",
    content: "Which helps transition?",
    options: [
      { id: 'A', text: "Moving on to why...", isCorrect: true },
      { id: 'B', text: "And next thing..." }
    ],
    visualDescription: "Golden Arrow",
    part: "Part 2"
  },
  {
    id: 28,
    type: SlideType.QUIZ,
    title: "Quiz: Idioms",
    content: "\"To go viral\" means?",
    options: [
      { id: 'A', text: "Spread rapidly", isCorrect: true },
      { id: 'B', text: "To be deleted" }
    ],
    visualDescription: "Multiplying Owls",
    part: "Part 2"
  },
  {
    id: 29,
    type: SlideType.TEST,
    title: "Quick Test",
    content: "Use \"relieved\" or \"appalled\" to describe your feeling about the news.",
    visualDescription: "Gargoyle Masks",
    part: "Part 2"
  },
  {
    id: 30,
    type: SlideType.VOCAB,
    title: "Magic Vocab",
    content: "\"Widespread\" (adj.) - found or distributed over a large area.",
    visualDescription: "Globe Ripples",
    part: "Part 2"
  },
  {
    id: 31,
    type: SlideType.QUIZ,
    title: "Quiz: Collocation",
    content: "Correct collocation:",
    options: [
      { id: 'A', text: "Widespread interest", isCorrect: true },
      { id: 'B', text: "Widespread fast" }
    ],
    visualDescription: "Glowing Cauldron",
    part: "Part 2"
  },
  {
    id: 32,
    type: SlideType.TEST,
    title: "1 Minute Challenge",
    content: "Speak for 1 minute using: \"Significant development,\" \"Widespread,\" and \"Moving on to...\"",
    visualDescription: "Flying Snitch Timer",
    part: "Part 2"
  },

  // --- PART 3 ---
  {
    id: 33,
    type: SlideType.PART_HEADER,
    content: "Part 3: Two-way Discussion (CR7 vs Messi)",
    visualDescription: "Duel Silhouette",
    part: "Part 3"
  },
  {
    id: 34,
    type: SlideType.QUESTION,
    title: "The Question",
    content: "In the future, will the internet lead to more understanding between cultures or more conflict?",
    uzbek: "Kelajakda internet madaniyatlar o'rtasida ko'proq tushunishga olib keladimi yoki mojarogami?",
    russian: "В будущем интернет приведет к большему взаимопониманию или к большему конфликту?",
    visualDescription: "CR7 vs Messi Split",
    part: "Part 3"
  },
  {
    id: 35,
    type: SlideType.QUIZ,
    title: "Quiz: Academic Tone",
    content: "Academic way to say \"It's hard\":",
    options: [
      { id: 'A', text: "It’s a bit tricky." },
      { id: 'B', text: "It’s a multifaceted issue.", isCorrect: true }
    ],
    visualDescription: "Ornate Key Scale",
    part: "Part 3"
  },
  {
    id: 36,
    type: SlideType.QUIZ,
    title: "Quiz: Trends",
    content: "Best phrase for a trend:",
    options: [
      { id: 'A', text: "People are doing..." },
      { id: 'B', text: "There has been a significant shift towards...", isCorrect: true }
    ],
    visualDescription: "Spark Line Graph",
    part: "Part 3"
  },
  {
    id: 37,
    type: SlideType.TEST,
    title: "Quick Test",
    content: "Use \"Consequently\" to explain the result of \"Echo Chambers.\"",
    visualDescription: "Glowing Chain Links",
    part: "Part 3"
  },
  {
    id: 38,
    type: SlideType.INFO,
    title: "Model Answer",
    content: "While the internet could bridge cultural gaps, it often fosters POLARIZATION, as seen in the rivalry between CR7 and Messi fans...",
    visualDescription: "Floo Network Fire",
    part: "Part 3"
  },
  {
    id: 39,
    type: SlideType.QUIZ,
    title: "Quiz: Quantity",
    content: "Replace \"many\" with:",
    options: [
      { id: 'A', text: "A lot of" },
      { id: 'B', text: "A myriad of", isCorrect: true }
    ],
    visualDescription: "Galleon Bag",
    part: "Part 3"
  },
  {
    id: 40,
    type: SlideType.QUIZ,
    title: "Quiz: Speculation",
    content: "More tentative (academic) for future:",
    options: [
      { id: 'A', text: "It will definitely..." },
      { id: 'B', text: "It is highly probable that...", isCorrect: true }
    ],
    visualDescription: "Divination Ball",
    part: "Part 3"
  },
  {
    id: 41,
    type: SlideType.TEST,
    title: "Quick Test",
    content: "Use \"On the other hand...\" to discuss globalization's downsides.",
    visualDescription: "Two Sided Mirror",
    part: "Part 3"
  },
  {
    id: 42,
    type: SlideType.REASON,
    title: "Pauline's Insight",
    content: "In Part 3, using a world-famous rivalry like CR7 vs Messi helps you explain the abstract concept of \"Digital Tribes\" clearly.",
    visualDescription: "Bridge Diagram",
    part: "Part 3"
  },
  {
    id: 43,
    type: SlideType.QUIZ,
    title: "Quiz: Complex Issues",
    content: "Do countries benefit equally? Best start:",
    options: [
      { id: 'A', text: "I think so." },
      { id: 'B', text: "That’s a complex issue, but there’s a clear imbalance...", isCorrect: true }
    ],
    visualDescription: "Uneven Scale",
    part: "Part 3"
  },
  {
    id: 44,
    type: SlideType.QUIZ,
    title: "Quiz: Stress",
    content: "Stress the contrast: \"Some benefit...\"",
    options: [
      { id: 'A', text: "MORE than others.", isCorrect: true },
      { id: 'B', text: "more THAN others." }
    ],
    visualDescription: "Volume Meter",
    part: "Part 3"
  },
  {
    id: 45,
    type: SlideType.TEST,
    title: "Quick Test",
    content: "Predict the future using: \"It is conceivable that...\"",
    visualDescription: "Digital Moon Telescope",
    part: "Part 3"
  },
  {
    id: 46,
    type: SlideType.VOCAB,
    title: "Power Vocab",
    content: "\"Echo Chamber\" - an environment where you only hear opinions that match your own.",
    visualDescription: "Mirror Room",
    part: "Part 3"
  },
  {
    id: 47,
    type: SlideType.QUIZ,
    title: "Quiz: Classification",
    content: "The CR7 vs Messi debate on Twitter is an example of:",
    options: [
      { id: 'A', text: "Unity" },
      { id: 'B', text: "Polarization", isCorrect: true }
    ],
    visualDescription: "Lightning Bolt Split",
    part: "Part 3"
  },
  {
    id: 48,
    type: SlideType.TEST,
    title: "Final Challenge",
    content: "Combine your thoughts into a 30-second summary using \"Polarization\" and \"Echo Chamber.\"",
    visualDescription: "Final Crest",
    part: "Part 3"
  },
  {
    id: 49,
    type: SlideType.VOCAB,
    title: "Band 9 Vocabulary List (Bonus)",
    content: "Precision & Analytical Depth",
    visualDescription: "Treasure Chest",
    part: "Bonus",
    options: [
        { id: '1', text: "Ubiquitous (adj): Found everywhere." },
        { id: '2', text: "Paradigm shift (n): A fundamental change." },
        { id: '3', text: "Double-edged sword (idiom): Has pros and cons." },
        { id: '4', text: "Digital nomad (n): Remote worker traveling." },
        { id: '5', text: "Disseminate (v): To spread information." },
    ]
  }
];

export const ICONS: Record<string, React.FC<any>> = {
  "Owl with Wi-Fi symbol": Globe,
  "Three Golden Snitches": Award,
  "Binary Hourglass": Clock,
  "Marauder's Map Quill": PenTool,
  "Pensieve Mist": Wifi,
  "Restricted Section Books": BookOpen,
  "Moving Staircases": Activity,
  "Split Mirror": Users,
  "Moving Portrait": Star,
  "Cauldron Smoke": AlertTriangle,
  "Sound Wave Spell": Activity,
  "Telescope Constellation": Search,
  "Castle Bridge": Users,
  "Sorting Hat Decision": AlertTriangle,
  "Master's Medal": Award,
  "Daily Prophet Animation": Newspaper,
  "Magical Quill": PenTool,
  "Remembrall": Star,
  "Stopped Hourglass": Clock,
  "Sorting Hat Speech": MessageCircle,
  "Ancient Scroll": BookOpen,
  "Glowing Wand": Zap,
  "Time Turner": Clock,
  "Digital Footprints": Users,
  "Band Score Ladder": TrendingUp,
  "Golden Arrow": Zap,
  "Multiplying Owls": Users,
  "Gargoyle Masks": Users,
  "Globe Ripples": Globe,
  "Glowing Cauldron": AlertTriangle,
  "Flying Snitch Timer": Clock,
  "Duel Silhouette": Users,
  "CR7 vs Messi Split": Users,
  "Ornate Key Scale": Activity,
  "Spark Line Graph": TrendingUp,
  "Glowing Chain Links": Zap,
  "Floo Network Fire": Wifi,
  "Galleon Bag": Award,
  "Divination Ball": Globe,
  "Two Sided Mirror": Users,
  "Bridge Diagram": Users,
  "Uneven Scale": Activity,
  "Volume Meter": Activity,
  "Digital Moon Telescope": Search,
  "Mirror Room": Users,
  "Lightning Bolt Split": Zap,
  "Final Crest": Award,
  "Treasure Chest": Award
};
