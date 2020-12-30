import { PayloadAction } from '@reduxjs/toolkit';
import { homePageActions, UpdateQuestPayload } from './slice';
import { put, takeLatest } from 'redux-saga/effects';

export function* homePageSaga() {
  yield [
    takeLatest(homePageActions.getQuests.type, getQuests),
    takeLatest(homePageActions.updateQuest.type, updateQuest),
  ];
}

export function* updateQuest(action: PayloadAction<UpdateQuestPayload>) {
  // Update Quest
  const questions = action.payload.currentQuestions;
  let currentQuestion = questions[action.payload.index];
  currentQuestion.isCorrect = true;
  currentQuestion.userAnswer = action.payload.userAnswer;

  // Save Quests
  const newQuestions = [...questions];
  const newSave = JSON.stringify(newQuestions);
  localStorage.setItem('quests', newSave);

  // Set Quests
  yield put({ type: homePageActions.setQuestions, payload: newQuestions });
}

export function* getQuests(action: PayloadAction<UpdateQuestPayload>) {
  // Get Quests
  const storedQuestStr = localStorage.getItem('quests');

  // Update if available
  if (storedQuestStr) {
    const quests = JSON.parse(storedQuestStr); // Set Quests
    yield put({ type: homePageActions.setQuestions, payload: quests });
  }
}
