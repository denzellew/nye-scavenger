import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { initQuestions } from '../initData';
import { ContainerState, ScavengerQuestionModel } from './types';

export interface UpdateQuestPayload {
  currentQuestions: ScavengerQuestionModel[];
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
    getQuests(state, action: PayloadAction<any>) {},
    updateQuest(state, action: PayloadAction<UpdateQuestPayload>) {},
    setQuestions(state, action: PayloadAction<ScavengerQuestionModel[]>) {
      state.questions = action.payload;
    },
  },
});

export const {
  actions: homePageActions,
  reducer,
  name: sliceKey,
} = homePageSlice;
