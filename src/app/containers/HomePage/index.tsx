import { Divider, Layout, Skeleton, Typography } from 'antd';
import ScavengerQuestion from 'app/components/ScavengerQuestion';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectReducer } from 'redux-injectors';
import { selectQuestions } from './selectors';
import { homePageActions, reducer, sliceKey } from './slice';

const { Header, Content } = Layout;
const { Title } = Typography;
export function HomePage() {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const questions = useSelector(selectQuestions);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatch = useDispatch();
  const onCorrectAnswer = (index, userAnswer) => {
    dispatch(homePageActions.setCorrect({ index, userAnswer }));
  };

  let scavQuests: any[] = [];
  let restSkell = false;
  for (let i = 0; i < questions.length; i++) {
    if (restSkell) {
      scavQuests.push(
        <>
          <Skeleton avatar />
          <Divider />
        </>,
      );
    } else {
      const curQuest = questions[i];
      const scavProps = {
        location: curQuest.location,
        answer: curQuest.answer,
        help: curQuest.answerHelp,
        userAnswer: curQuest.userAnswer,
        isCorrect: curQuest.isCorrect,
        onCorrectAnswer: answer => onCorrectAnswer(i, answer),
      };
      scavQuests.push(
        <>
          <ScavengerQuestion {...scavProps} />
          <Divider />
        </>,
      );

      if (!curQuest.isCorrect) {
        restSkell = true;
      }
    }
  }

  return (
    <>
      <Helmet>
        <title>Home Page</title>
        <meta name="description" content="A Boilerplate application homepage" />
      </Helmet>
      <Layout>
        <Header>
          <Title style={{ color: '#FFF' }}>Scavenger Hunt</Title>
        </Header>
        <Content>{scavQuests}</Content>
      </Layout>
    </>
  );
}
