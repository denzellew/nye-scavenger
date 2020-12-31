import { Divider, Layout, Skeleton, Typography } from 'antd';
import ScavengerQuestion from 'app/components/ScavengerQuestion';
import { BackgroundColor } from 'chalk';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { homePageSaga } from './saga';
import { selectQuestions } from './selectors';
import { homePageActions, reducer, sliceKey } from './slice';

const { Header, Content } = Layout;
const { Title, Paragraph } = Typography;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const num6Time = new Date(2020, 11, 31, 12, 0, 0);
const num12Time = new Date(2020, 11, 31, 3, 0, 0);
export function HomePage() {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: homePageSaga });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const questions = useSelector(selectQuestions);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(homePageActions.getQuests({}));
  }, [dispatch]);

  const onCorrectAnswer = (index, userAnswer) => {
    dispatch(
      homePageActions.updateQuest({
        currentQuestions: questions,
        index,
        userAnswer,
      }),
    );
  };

  let scavQuests: any[] = [];
  let restSkell = false;
  for (let i = 0; i < questions.length; i++) {
    // Stop if up to 5 before noon
    if (!restSkell && i === 5 && num6Time > new Date()) {
      scavQuests.push(
        <div>
          <Title>Next Question available at 12:00PM (Refresh then)</Title>
        </div>,
      );
      restSkell = true;
    }

    // Stop if up to 12 before 3
    if (!restSkell && i === 11 && num12Time > new Date()) {
      scavQuests.push(
        <div>
          <Title>Next Question available 3:00PM (Refresh then)</Title>
        </div>,
      );
      restSkell = true;
    }

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

      // Set the rest to skell
      if (!curQuest.isCorrect) {
        restSkell = true;
      }
    }
  }

  return (
    <>
      <Helmet>
        <title>Sudu's Sayang 2020 NYE Scavenger Hunt</title>
        <meta
          name="description"
          content="Farewell and FUCK YOU 2020, Love you!"
        />
      </Helmet>
      <Layout>
        <Header
          style={{
            height: 'auto',
            backgroundColor: 'fuchsia',
            padding: '1rem',
          }}
        >
          <Title
            style={{ color: '#FFF', fontSize: '1.75rem', textAlign: 'center' }}
          >
            Sudu's Sayang
            <br />
            2020 NYE Scavenger Hunt
          </Title>
        </Header>
        <Content style={{ padding: '1rem' }}>
          <Title level={3}>
            Answer the question on the clue to get the next prize!
          </Title>
          <Paragraph>
            No Spaces for multiple words (i.e. Two Words = Two Words)
            <br />
            Case doesn't matter
            <br />
            Dates are entered MMDDYYYY (i.e. 12312021)
          </Paragraph>
          {scavQuests}
        </Content>
      </Layout>
    </>
  );
}
