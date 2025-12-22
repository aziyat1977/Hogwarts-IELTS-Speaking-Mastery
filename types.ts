export enum Mode {
  STUDENT = 'STUDENT',
  TEACHER = 'TEACHER',
  KAHOOT = 'KAHOOT',
  PRACTICE = 'PRACTICE'
}

export enum SlideType {
  QUESTION = 'QUESTION',
  QUIZ = 'QUIZ',
  TEST = 'TEST',
  INFO = 'INFO',
  VOCAB = 'VOCAB',
  REASON = 'REASON',
  INTRO = 'INTRO',
  PART_HEADER = 'PART_HEADER'
}

export interface QuizOption {
  id: string;
  text: string;
  isCorrect?: boolean;
}

export interface SlideContent {
  id: number;
  type: SlideType;
  title?: string;
  content: string;
  uzbek?: string;
  russian?: string;
  visualDescription?: string;
  options?: QuizOption[];
  correctAnswerId?: string;
  insight?: string; // Pauline's insight
  part?: string;
}

export interface AppState {
  currentSlideIndex: number;
  mode: Mode;
  isDarkMode: boolean;
  score: number;
  showInsight: boolean;
  answers: Record<number, string>; // slideId -> selectedOptionId
}
