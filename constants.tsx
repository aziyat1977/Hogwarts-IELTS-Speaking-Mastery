
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
  Star,
  Brain,
  Lightbulb,
  Scroll,
  Feather,
  Hourglass
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
    id: 101,
    type: SlideType.QUIZ,
    title: "Quiz: Prepositions",
    content: "Which preposition is correct?",
    options: [
      { id: 'A', text: "I found it in the internet." },
      { id: 'B', text: "I found it on the internet.", isCorrect: true }
    ],
    visualDescription: "Sorting Hat Decision",
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
    id: 102,
    type: SlideType.INFO,
    title: "Grammar Insight",
    content: "Stative verbs (like 'prefer', 'need', 'love') are rarely used in continuous forms.",
    insight: "Say 'I prefer emailing' not 'I am preferring'.",
    visualDescription: "Ancient Scroll",
    part: "Part 1"
  },
  
  // --- TIMELINE 1: Present Perfect Continuous ---
  {
    id: 200,
    type: SlideType.TIMELINE,
    content: "Present Perfect Continuous",
    timelineData: {
        tenseName: "Present Perfect Continuous",
        description: "Actions starting in the past and continuing until NOW.",
        markers: [
            { label: "Past (2010)", position: 10 },
            { label: "NOW", position: 90 },
            { label: "Future", position: 100 }
        ],
        events: [
            { label: "Started Using", position: 10, type: 'point', color: 'gold', description: "Action began here" },
            { label: "have been using...", position: 90, type: 'range', color: 'gold' }
        ]
    },
    visualDescription: "Binary Hourglass",
    part: "Part 1"
  },
  // 10 QUIZZES for Timeline 1
  { id: 201, type: SlideType.QUIZ, title: "Drill 1/10", content: "I ____ (study) English for 5 years.", options: [{id:'A', text:'have studied'}, {id:'B', text:'have been studying', isCorrect:true}], visualDescription: "Time Turner" },
  { id: 202, type: SlideType.QUIZ, title: "Drill 2/10", content: "She ____ (wait) here since 2pm.", options: [{id:'A', text:'has been waiting', isCorrect:true}, {id:'B', text:'is waiting'}], visualDescription: "Time Turner" },
  { id: 203, type: SlideType.QUIZ, title: "Drill 3/10", content: "How long ____ (you / play) this game?", options: [{id:'A', text:'have you been playing', isCorrect:true}, {id:'B', text:'do you play'}], visualDescription: "Time Turner" },
  { id: 204, type: SlideType.QUIZ, title: "Drill 4/10", content: "We ____ (not / live) here long.", options: [{id:'A', text:'haven\'t been living', isCorrect:true}, {id:'B', text:'didn\'t live'}], visualDescription: "Time Turner" },
  { id: 205, type: SlideType.QUIZ, title: "Drill 5/10", content: "It ____ (rain) all day.", options: [{id:'A', text:'has been raining', isCorrect:true}, {id:'B', text:'rains'}], visualDescription: "Time Turner" },
  { id: 206, type: SlideType.QUIZ, title: "Drill 6/10", content: "I'm tired because I ____ (run).", options: [{id:'A', text:'have been running', isCorrect:true}, {id:'B', text:'ran'}], visualDescription: "Time Turner" },
  { id: 207, type: SlideType.QUIZ, title: "Drill 7/10", content: "____ (you / watch) the show lately?", options: [{id:'A', text:'Have you been watching', isCorrect:true}, {id:'B', text:'Do you watch'}], visualDescription: "Time Turner" },
  { id: 208, type: SlideType.QUIZ, title: "Drill 8/10", content: "He ____ (work) on this project since March.", options: [{id:'A', text:'has been working', isCorrect:true}, {id:'B', text:'works'}], visualDescription: "Time Turner" },
  { id: 209, type: SlideType.QUIZ, title: "Drill 9/10", content: "They ____ (travel) around Europe for months.", options: [{id:'A', text:'have been traveling', isCorrect:true}, {id:'B', text:'are traveling'}], visualDescription: "Time Turner" },
  { id: 210, type: SlideType.QUIZ, title: "Drill 10/10", content: "I ____ (learn) magic since I was 11.", options: [{id:'A', text:'have been learning', isCorrect:true}, {id:'B', text:'learn'}], visualDescription: "Time Turner" },

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
    id: 103,
    type: SlideType.QUIZ,
    title: "Quiz: 'Used to'",
    content: "Select the correct structure for a past habit that has stopped:",
    options: [
      { id: 'A', text: "I am used to using Skype." },
      { id: 'B', text: "I used to use Skype.", isCorrect: true }
    ],
    visualDescription: "Time Turner",
    part: "Part 1"
  },
  {
    id: 104,
    type: SlideType.TEST,
    title: "Grammar Challenge",
    content: "Use 'get used to' in a sentence about a new app.",
    visualDescription: "Marauder's Map Quill",
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
    id: 105,
    type: SlideType.VOCAB,
    title: "Magic Vocab",
    content: "\"Indispensable\" (adj.) - Absolutely necessary.",
    visualDescription: "Glowing Wand",
    part: "Part 1"
  },
  {
    id: 106,
    type: SlideType.QUIZ,
    title: "Quiz: Vocab Context",
    content: "Is 'indispensable' stronger than 'useful'?",
    options: [
      { id: 'A', text: "Yes, much stronger.", isCorrect: true },
      { id: 'B', text: "No, they are the same." }
    ],
    visualDescription: "Ornate Key Scale",
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
    id: 107,
    type: SlideType.VOCAB,
    title: "Power Vocab",
    content: "\"Tech-savvy\" (adj.) - Proficient with modern technology.",
    visualDescription: "Treasure Chest",
    part: "Part 1"
  },
  {
    id: 108,
    type: SlideType.QUIZ,
    title: "Quiz: Adjective Order",
    content: "Which is correct?",
    options: [
      { id: 'A', text: "A young tech-savvy student." },
      { id: 'B', text: "A tech-savvy young student.", isCorrect: true }
    ],
    visualDescription: "Sorting Hat Decision",
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
    id: 109,
    type: SlideType.QUIZ,
    title: "Quiz: Adverbs of Frequency",
    content: "Where do we usually place 'hardly ever'?",
    options: [
      { id: 'A', text: "Before the main verb (I hardly ever use...)", isCorrect: true },
      { id: 'B', text: "After the object (I use Skype hardly ever)" }
    ],
    visualDescription: "Golden Arrow",
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
    id: 110,
    type: SlideType.VOCAB,
    title: "Magic Vocab",
    content: "\"Glitch\" (n.) - A sudden, usually temporary malfunction.",
    visualDescription: "Glowing Wand",
    part: "Part 1"
  },
  {
    id: 111,
    type: SlideType.TEST,
    title: "Vocab Application",
    content: "Describe a time your computer had a 'glitch' versus a 'crash'.",
    visualDescription: "Gargoyle Masks",
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
    id: 112,
    type: SlideType.INFO,
    title: "Grammar Insight",
    content: "Use Past Perfect to describe what happened *before* the main event.",
    insight: "\"I had never heard of this issue until I saw the article...\"",
    visualDescription: "Ancient Scroll",
    part: "Part 2"
  },

  // --- TIMELINE 2: Past Perfect ---
  {
    id: 220,
    type: SlideType.TIMELINE,
    content: "The Past Perfect Tense",
    timelineData: {
        tenseName: "Past Perfect",
        description: "An action that happened before another past action.",
        markers: [
            { label: "Far Past", position: 10 },
            { label: "Recent Past", position: 50 },
            { label: "NOW", position: 90 }
        ],
        events: [
            { label: "Action 1 (First)", position: 10, type: 'point', color: 'gold', description: "had eaten" },
            { label: "Action 2 (Later)", position: 50, type: 'point', color: 'blue', description: "arrived" }
        ]
    },
    visualDescription: "Time Turner",
    part: "Part 2"
  },
  // 10 QUIZZES for Timeline 2
  { id: 221, type: SlideType.QUIZ, title: "Drill 1/10", content: "When I arrived, the train ____ (leave).", options: [{id:'A', text:'had left', isCorrect:true}, {id:'B', text:'left'}], visualDescription: "Time Turner" },
  { id: 222, type: SlideType.QUIZ, title: "Drill 2/10", content: "She was hungry because she ____ (not / eat).", options: [{id:'A', text:'had not eaten', isCorrect:true}, {id:'B', text:'didn\'t eat'}], visualDescription: "Time Turner" },
  { id: 223, type: SlideType.QUIZ, title: "Drill 3/10", content: "I recognized him because I ____ (meet) him before.", options: [{id:'A', text:'had met', isCorrect:true}, {id:'B', text:'met'}], visualDescription: "Time Turner" },
  { id: 224, type: SlideType.QUIZ, title: "Drill 4/10", content: "By the time he woke up, the sun ____ (rise).", options: [{id:'A', text:'had risen', isCorrect:true}, {id:'B', text:'rose'}], visualDescription: "Time Turner" },
  { id: 225, type: SlideType.QUIZ, title: "Drill 5/10", content: "They ____ (finish) the test when the bell rang.", options: [{id:'A', text:'had finished', isCorrect:true}, {id:'B', text:'finish'}], visualDescription: "Time Turner" },
  { id: 226, type: SlideType.QUIZ, title: "Drill 6/10", content: "She ____ (live) in London before moving to Paris.", options: [{id:'A', text:'had lived', isCorrect:true}, {id:'B', text:'lived'}], visualDescription: "Time Turner" },
  { id: 227, type: SlideType.QUIZ, title: "Drill 7/10", content: "He ____ (never / see) a dragon before.", options: [{id:'A', text:'had never seen', isCorrect:true}, {id:'B', text:'never saw'}], visualDescription: "Time Turner" },
  { id: 228, type: SlideType.QUIZ, title: "Drill 8/10", content: "The road was wet because it ____ (rain).", options: [{id:'A', text:'had rained', isCorrect:true}, {id:'B', text:'rained'}], visualDescription: "Time Turner" },
  { id: 229, type: SlideType.QUIZ, title: "Drill 9/10", content: "I realized I ____ (forget) my wand.", options: [{id:'A', text:'had forgotten', isCorrect:true}, {id:'B', text:'forgot'}], visualDescription: "Time Turner" },
  { id: 230, type: SlideType.QUIZ, title: "Drill 10/10", content: "After he ____ (do) his homework, he went out.", options: [{id:'A', text:'had done', isCorrect:true}, {id:'B', text:'did'}], visualDescription: "Time Turner" },

  {
    id: 113,
    type: SlideType.TEST,
    title: "Grammar Challenge",
    content: "Create a sentence starting: \"By the time I read the news...\"",
    visualDescription: "Marauder's Map Quill",
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
    id: 114,
    type: SlideType.QUIZ,
    title: "Quiz: Cleft Sentences",
    content: "Which structure adds more emphasis?",
    options: [
      { id: 'A', text: "The scale of the problem surprised me." },
      { id: 'B', text: "What surprised me was the scale of the problem.", isCorrect: true }
    ],
    visualDescription: "Glowing Wand",
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
    id: 115,
    type: SlideType.VOCAB,
    title: "Power Vocab",
    content: "\"Credible Source\" (n.) - A trustworthy origin of information.",
    visualDescription: "Treasure Chest",
    part: "Part 2"
  },
  {
    id: 116,
    type: SlideType.TEST,
    title: "Vocab Application",
    content: "Why is it important to \"verify your sources\"?",
    visualDescription: "Master's Medal",
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
    id: 117,
    type: SlideType.INFO,
    title: "Grammar Insight",
    content: "News is often reported using the Passive Voice.",
    insight: "\"It was announced that...\" sounds more formal than \"They announced that...\"",
    visualDescription: "Ancient Scroll",
    part: "Part 2"
  },
  {
    id: 118,
    type: SlideType.TEST,
    title: "Grammar Challenge",
    content: "Change to Passive: \"The government passed a new law.\"",
    visualDescription: "Marauder's Map Quill",
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
    id: 119,
    type: SlideType.VOCAB,
    title: "Magic Vocab",
    content: "\"Sensationalism\" (n.) - Use of exciting language at the expense of accuracy.",
    visualDescription: "Glowing Cauldron",
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
    id: 120,
    type: SlideType.VOCAB,
    title: "Power Vocab",
    content: "\"Watershed moment\" (Idiom) - A turning point.",
    visualDescription: "Treasure Chest",
    part: "Part 2"
  },
  {
    id: 121,
    type: SlideType.TEST,
    title: "Vocab Application",
    content: "Describe a 'watershed moment' in technology history.",
    visualDescription: "Master's Medal",
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
    id: 122,
    type: SlideType.VOCAB,
    title: "Power Vocab",
    content: "\"Unprecedented\" (adj.) - Never done or known before.",
    visualDescription: "Treasure Chest",
    part: "Part 2"
  },
  {
    id: 123,
    type: SlideType.QUIZ,
    title: "Quiz: Syllable Stress",
    content: "Where is the stress in 'un-pre-ce-den-ted'?",
    options: [
      { id: 'A', text: "2nd syllable (pre)", isCorrect: true },
      { id: 'B', text: "3rd syllable (ce)" }
    ],
    visualDescription: "Sound Wave Spell",
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
    id: 124,
    type: SlideType.INFO,
    title: "Grammar Insight",
    content: "Use 2nd Conditional for hypothetical situations.",
    insight: "\"If the internet were less unregulated, we might see...\"",
    visualDescription: "Ancient Scroll",
    part: "Part 3"
  },
  {
    id: 125,
    type: SlideType.QUIZ,
    title: "Quiz: Conditional Grammar",
    content: "Complete: \"If social media ____ existed...\"",
    options: [
      { id: 'A', text: "had not", isCorrect: true },
      { id: 'B', text: "has not" }
    ],
    visualDescription: "Time Turner",
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
    id: 126,
    type: SlideType.VOCAB,
    title: "Power Vocab",
    content: "\"Ubiquitous\" (adj.) - Present, appearing, or found everywhere.",
    visualDescription: "Treasure Chest",
    part: "Part 3"
  },
  {
    id: 127,
    type: SlideType.TEST,
    title: "Vocab Application",
    content: "Name three things that have become 'ubiquitous' in the last decade.",
    visualDescription: "Master's Medal",
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
    id: 128,
    type: SlideType.QUIZ,
    title: "Quiz: Linking Words",
    content: "Which word introduces a contrast?",
    options: [
      { id: 'A', text: "Furthermore" },
      { id: 'B', text: "Conversely", isCorrect: true }
    ],
    visualDescription: "Two Sided Mirror",
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
    id: 129,
    type: SlideType.VOCAB,
    title: "Magic Vocab",
    content: "\"Digital Divide\" (n.) - The gap between those who have access to computers/internet and those who do not.",
    visualDescription: "Split Mirror",
    part: "Part 3"
  },
  {
    id: 130,
    type: SlideType.QUIZ,
    title: "Quiz: Concept",
    content: "Does the digital divide increase or decrease inequality?",
    options: [
      { id: 'A', text: "Increases inequality", isCorrect: true },
      { id: 'B', text: "Decreases inequality" }
    ],
    visualDescription: "Uneven Scale",
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
    id: 131,
    type: SlideType.INFO,
    title: "Grammar Insight",
    content: "Use Future Perfect to look back from the future.",
    insight: "\"By 2050, AI will have transformed education...\"",
    visualDescription: "Ancient Scroll",
    part: "Part 3"
  },
  
  // --- TIMELINE 3: Future Perfect ---
  {
    id: 240,
    type: SlideType.TIMELINE,
    content: "The Future Perfect Tense",
    timelineData: {
        tenseName: "Future Perfect",
        description: "An action that will be finished before a specific time in the future.",
        markers: [
            { label: "NOW", position: 10 },
            { label: "Future", position: 90 }
        ],
        events: [
            { label: "Action Completed", position: 50, type: 'point', color: 'gold', description: "will have finished" },
            { label: "Deadline", position: 90, type: 'point', color: 'blue', description: "by next year" }
        ]
    },
    visualDescription: "Digital Moon Telescope",
    part: "Part 3"
  },
  // 10 QUIZZES for Timeline 3
  { id: 241, type: SlideType.QUIZ, title: "Drill 1/10", content: "By 2030, we ____ (solve) this problem.", options: [{id:'A', text:'will have solved', isCorrect:true}, {id:'B', text:'are solving'}], visualDescription: "Digital Moon Telescope" },
  { id: 242, type: SlideType.QUIZ, title: "Drill 2/10", content: "I ____ (finish) this book by tomorrow.", options: [{id:'A', text:'will have finished', isCorrect:true}, {id:'B', text:'finished'}], visualDescription: "Digital Moon Telescope" },
  { id: 243, type: SlideType.QUIZ, title: "Drill 3/10", content: "She ____ (leave) by the time you arrive.", options: [{id:'A', text:'will have left', isCorrect:true}, {id:'B', text:'leaves'}], visualDescription: "Digital Moon Telescope" },
  { id: 244, type: SlideType.QUIZ, title: "Drill 4/10", content: "In two years, they ____ (build) the bridge.", options: [{id:'A', text:'will have built', isCorrect:true}, {id:'B', text:'built'}], visualDescription: "Digital Moon Telescope" },
  { id: 245, type: SlideType.QUIZ, title: "Drill 5/10", content: "____ (you / complete) the report by 5pm?", options: [{id:'A', text:'Will you have completed', isCorrect:true}, {id:'B', text:'Did you complete'}], visualDescription: "Digital Moon Telescope" },
  { id: 246, type: SlideType.QUIZ, title: "Drill 6/10", content: "We ____ (not / arrive) before dark.", options: [{id:'A', text:'will not have arrived', isCorrect:true}, {id:'B', text:'didn\'t arrive'}], visualDescription: "Digital Moon Telescope" },
  { id: 247, type: SlideType.QUIZ, title: "Drill 7/10", content: "By the end of the month, I ____ (save) $500.", options: [{id:'A', text:'will have saved', isCorrect:true}, {id:'B', text:'save'}], visualDescription: "Digital Moon Telescope" },
  { id: 248, type: SlideType.QUIZ, title: "Drill 8/10", content: "The show ____ (start) by the time we get there.", options: [{id:'A', text:'will have started', isCorrect:true}, {id:'B', text:'starts'}], visualDescription: "Digital Moon Telescope" },
  { id: 249, type: SlideType.QUIZ, title: "Drill 9/10", content: "He ____ (work) here for 10 years next week.", options: [{id:'A', text:'will have worked', isCorrect:true}, {id:'B', text:'works'}], visualDescription: "Digital Moon Telescope" },
  { id: 250, type: SlideType.QUIZ, title: "Drill 10/10", content: "By next summer, she ____ (graduate).", options: [{id:'A', text:'will have graduated', isCorrect:true}, {id:'B', text:'is graduating'}], visualDescription: "Digital Moon Telescope" },

  {
    id: 132,
    type: SlideType.TEST,
    title: "Grammar Challenge",
    content: "Predict a change by 2040 using \"will have + past participle\".",
    visualDescription: "Digital Moon Telescope",
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
    id: 133,
    type: SlideType.VOCAB,
    title: "Power Vocab",
    content: "\"Confirmation Bias\" (n.) - Searching for info that supports your existing beliefs.",
    visualDescription: "Treasure Chest",
    part: "Part 3"
  },
  {
    id: 134,
    type: SlideType.TEST,
    title: "Concept Check",
    content: "Explain the difference between 'Confirmation Bias' and 'Fake News'.",
    visualDescription: "Master's Medal",
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
    id: 135,
    type: SlideType.QUIZ,
    title: "Quiz: Modals of Deduction",
    content: "If you are 100% sure something is true, use:",
    options: [
      { id: 'A', text: "It must be..." , isCorrect: true },
      { id: 'B', text: "It could be..." }
    ],
    visualDescription: "Glowing Wand",
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
    id: 136,
    type: SlideType.VOCAB,
    title: "Power Vocab",
    content: "\"Disseminate\" (v.) - To spread widely (especially information).",
    visualDescription: "Treasure Chest",
    part: "Part 3"
  },
  {
    id: 137,
    type: SlideType.TEST,
    title: "Vocab Application",
    content: "Use 'disseminate' in a sentence about fake news.",
    visualDescription: "Master's Medal",
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
        { id: '6', text: "Algorithmic bias (n): Unfairness in computer systems." },
        { id: '7', text: "Ephemeral (adj): Lasting a short time (e.g., Stories)." },
        { id: '8', text: "Gamification (n): Using game design in non-games." },
        { id: '9', text: "Inadvertently (adv): Accidentally/Without intention." },
        { id: '10', text: "Scrutinize (v): To examine closely." },
    ]
  },
  // --- DEDICATED SPEAKING PRACTICE ---
  {
    id: 300,
    type: SlideType.PART_HEADER,
    content: "Speaking Practice Arena",
    visualDescription: "Duel Silhouette",
    part: "Practice"
  },
  {
    id: 301,
    type: SlideType.SPEAKING_PRACTICE,
    title: "Part 2: Long Turn Practice",
    content: "Describe a piece of technology you own that you find difficult to use. \n\nYou should say:\n- What it is\n- When you got it\n- Why it is difficult to use\nAnd explain how you handle this difficulty.",
    insight: "Focus on organizing your ideas coherently. Use linking words like 'Regarding the reason why...', 'Moving on to...', 'Consequently...'.",
    visualDescription: "Magical Quill",
    part: "Practice"
  },
  {
    id: 302,
    type: SlideType.SPEAKING_PRACTICE,
    title: "Part 3: Deep Dive Discussion",
    content: "Do you think that in the future, humans will become completely dependent on Artificial Intelligence for decision-making?",
    insight: "Develop your answer with clear examples. Show contrast (e.g., 'While some argue..., others believe...'). Ensure your argument flows logically.",
    visualDescription: "Divination Ball",
    part: "Practice"
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
  "Ancient Scroll": Scroll,
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
  "Treasure Chest": Award,
  "Hogwarts Express Header": Star
};