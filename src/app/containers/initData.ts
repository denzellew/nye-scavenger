import { ScavengerQuestionModel } from './HomePage/types';

export const initQuestions: ScavengerQuestionModel[] = [
  {
    location: 'This clue is found in the facet!',
    answer: 'Some Answer',
    answerHelp: 'Some help with this answer',
    userAnswer: '',
    isCorrect: true,
  },
  {
    location: 'This clue is found in a wet place!',
    answer: 'Another Answer',
    answerHelp: 'Some help with this answer',
    userAnswer: '',
    isCorrect: false,
  },
  {
    location: 'This clue is found in the bedroom!',
    answer: 'Super Long Winded Answer',
    answerHelp: 'Some help with this answer',
    userAnswer: '',
    isCorrect: false,
  },
];
