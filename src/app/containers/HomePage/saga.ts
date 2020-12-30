import { PayloadAction } from '@reduxjs/toolkit';
import { put, takeLatest } from 'redux-saga/effects';
import { homePageActions, UpdateQuestPayload } from './slice';
import { ScavengerQuestionModel } from './types';

export function* homePageSaga() {
  yield takeLatest(homePageActions.updateQuest.type, performUpdateQuest);
  yield takeLatest(homePageActions.getQuests.type, performGetQuests);
}

export function* performUpdateQuest(action: PayloadAction<UpdateQuestPayload>) {
  // Update Quest
  const questions = action.payload.currentQuestions;
  const currentQuestion = questions[action.payload.index];
  const changes = { isCorrect: true, userAnswer: action.payload.userAnswer };
  const newQuest = { ...currentQuestion, ...changes };

  // Save Quests
  const newQuests: ScavengerQuestionModel[] = [];
  for (let i = 0; i < questions.length; i++) {
    if (i === action.payload.index) {
      newQuests.push(newQuest);
    } else {
      newQuests.push(questions[i]);
    }
  }
  const newSave = JSON.stringify(newQuests);
  localStorage.setItem('quests', newSave);

  // Set Quests
  yield put({ type: homePageActions.setQuestions, payload: newQuests });
}

export function* performGetQuests(action) {
  // Get Quests
  const storedQuestStr = localStorage.getItem('quests');

  // Update if available
  if (storedQuestStr) {
    const quests = JSON.parse(storedQuestStr); // Set Quests
    yield put({ type: homePageActions.setQuestions, payload: quests });
  }
}
