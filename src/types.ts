/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface PRDComment {
  pm: 'Duolingo' | 'Babbel' | 'Busuu' | 'Memrise';
  author: string;
  avatarColor: string;
  comment: string;
  timestamp: string;
}

export interface PRDSection {
  id: string;
  title: string;
  icon: string;
  summary: string;
  details: string[];
  comments: PRDComment[];
  pmInsights: {
    gamification?: string;
    pedagogy?: string;
    community?: string;
    multimedia?: string;
  };
}

export interface WordCard {
  id: string;
  portuguese: string;
  english: string;
  pronunciation: string;
  category: 'Greetings' | 'Pastelaria' | 'Bureaucracy' | 'Daily Life';
  notes: string;
  examplePt: string;
  exampleEn: string;
  brazilianContrast?: string;
}

export interface GrammarRule {
  id: string;
  title: string;
  difficulty: 'A1' | 'A2' | 'B1' | 'B2';
  description: string;
  europeanConcept: string;
  brazilianContrast: string;
  examples: Array<{
    pt: string;
    en: string;
    context: string;
  }>;
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface DialogueLine {
  speaker: string;
  pt: string;
  en: string;
  notes?: string;
}

export interface AudioDialogue {
  id: string;
  title: string;
  scenario: string;
  difficulty: string;
  audience: string;
  lines: DialogueLine[];
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface StoryParagraph {
  textPt: string;
  textEn: string;
  vocabNotes: Record<string, string>;
}

export interface ReadingStory {
  id: string;
  title: string;
  difficulty: string;
  summary: string;
  paragraphs: StoryParagraph[];
  questions: Array<{
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }>;
}

export interface WritingChallenge {
  id: string;
  title: string;
  prompt: string;
  scenario: string;
  difficulty: string;
  helpfulWords: string[];
  referenceExample: string;
}
