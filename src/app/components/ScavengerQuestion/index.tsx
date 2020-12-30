/**
 *
 * ScavengerQuestion
 *
 */
import { Button, message, Typography } from 'antd';
import * as React from 'react';
import styled from 'styled-components/macro';
import SingleInputGroup from '../SingleInputGroup';

const { Title } = Typography;
interface Props {
  location?: string;
  answer?: string;
  userAnswer?: string;
  help?: any;
  isCorrect?: boolean;
  onCorrectAnswer: (answer: string) => any;
}

const defaultProps = {
  location: 'This clue is found in the facet',
  answer: 'Test Answer',
  help: 'Some kind of help',
};

const ScavengerQuestion = (props: Props) => {
  const trueAnswer = props.answer?.toLocaleLowerCase().replace(/\s/g, '') || '';
  const [userAnswer, setUserAnswer] = React.useState(props.userAnswer || '');

  const success = () => {
    message.success('Correct Answer!');
  };

  const error = () => {
    message.error('Wrong Answer!');
  };

  const help = () => {
    message.warning(props.help);
  };

  const updateAnswer = output => {
    setUserAnswer(output);
  };

  const submitAnswer = () => {
    if (userAnswer.toLowerCase() === trueAnswer) {
      success();
      props.onCorrectAnswer(userAnswer);
    } else {
      error();
    }
  };
  return (
    <Div>
      <Title level={4}>{props.location}</Title>
      <SingleInputGroup
        template={trueAnswer}
        value={userAnswer}
        inputRegExp={/^[a-zA-Z0-9_.-]*$/}
        password={false}
        handleOutputString={updateAnswer}
        inputProps={{ readonly: props.isCorrect }}
      />
      <Button
        type="primary"
        ghost
        onClick={help}
        style={{ marginRight: '1rem' }}
      >
        Need Help?
      </Button>
      <Button type="primary" onClick={submitAnswer}>
        Submit
      </Button>
    </Div>
  );
};

ScavengerQuestion.defaultProps = defaultProps;

const Div = styled.div``;

export default ScavengerQuestion;
