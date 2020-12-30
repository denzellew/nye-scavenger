/* --- STATE --- */
export interface HomePageState {
  questions: ScavengerQuestionModel[];
}
export interface ScavengerQuestionModel {
  location: string;
  answer: string;
  answerHelp: string;
  userAnswer: string;
  isCorrect: boolean;
}

export type ContainerState = HomePageState;
