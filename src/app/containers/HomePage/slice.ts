import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { initQuestions } from '../initData';
import { ContainerState } from './types';

interface SetQuestionAction {
  index: number;
  userAnswer: string;
}
// The initial state of the HomePage2 container
export const initialState: ContainerState = {
  questions: initQuestions,
};

const homePageSlice = createSlice({
  name: 'homePage',
  initialState,
  reducers: {
    someAction(state, action: PayloadAction<any>) {},
    setCorrect(state, action: PayloadAction<SetQuestionAction>) {
      const questions = state.questions;
      let currentQuestion = questions[action.payload.index];
      currentQuestion.isCorrect = true;
      currentQuestion.userAnswer = action.payload.userAnswer;
    },
  },
});

export const {
  actions: homePageActions,
  reducer,
  name: sliceKey,
} = homePageSlice;
