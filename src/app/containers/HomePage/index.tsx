import { Layout, Typography } from 'antd';
import ScavengerQuestion from 'app/components/ScavengerQuestion';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectReducer } from 'redux-injectors';
import { selectQuestions } from './selectors';
import { reducer, sliceKey } from './slice';

const { Header, Content } = Layout;
const { Title } = Typography;
export function HomePage() {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const questions = useSelector(selectQuestions);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatch = useDispatch();

  let scavQuests: any[] = [];
  for (let i = 0; i < questions.length; i++) {
    const curQuest = questions[i];
    const scavProps = {
      location: curQuest.location,
      answer: curQuest.answer,
      help: curQuest.answerHelp,
      userAnswer: curQuest.userAnswer,
      isCorrect: curQuest.isCorrect,
    };
    scavQuests.push(<ScavengerQuestion {...scavProps} />);

    if (!curQuest.isCorrect) {
      break;
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
