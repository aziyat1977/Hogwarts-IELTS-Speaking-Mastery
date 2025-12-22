
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
  PART_HEADER = 'PART_HEADER',
  TIMELINE = 'TIMELINE'
}

export interface QuizOption {
  id: string;
  text: string;
  isCorrect?: boolean;
}

export interface TimelineEvent {
  label: string;
  position: number; // 0 to 100 represents position on the timeline
  type: 'point' | 'range' | 'arrow';
  color?: string;
  description?: string;
}

export interface TimelineData {
  tenseName: string;
  description: string;
  markers: { label: string; position: number }[]; // e.g., Past (0), Now (50), Future (100)
  events: TimelineEvent[];
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
  timelineData?: TimelineData;
}

export interface AppState {
  currentSlideIndex: number;
  mode: Mode;
  isDarkMode: boolean;
  score: number;
  showInsight: boolean;
  answers: Record<number, string>; // slideId -> selectedOptionId
}
