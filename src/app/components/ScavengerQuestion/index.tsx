/**
 *
 * ScavengerQuestion
 *
 */
import { Button, message } from 'antd';
import * as React from 'react';
import styled from 'styled-components/macro';
import SingleInputGroup from '../SingleInputGroup';

interface Props {
  location?: string;
  answer?: string;
  userAnswer?: string;
  help?: any;
  isCorrect?: boolean;
}

const defaultProps = {
  location: 'This clue is found in the facet',
  answer: 'Test Answer',
  help: 'Some kind of help',
};

const ScavengerQuestion = (props: Props) => {
  const trueAnswer = props.answer?.toLocaleLowerCase().replace(' ', '') || '';
  const [userAnswer, setUserAnswer] = React.useState(props.userAnswer || '');
  const [isCorrect, setIsCorrect] = React.useState(false);

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
      setIsCorrect(true);
      success();
    } else {
      error();
    }
  };

  console.log(userAnswer);
  return (
    <Div>
      <div>{props.location}</div>
      <SingleInputGroup
        word={trueAnswer}
        autoFocus={false}
        inputRegExp={/^[a-zA-Z0-9_.-]*$/}
        password={false}
        handleOutputString={updateAnswer}
        inputProps={{ readonly: isCorrect }}
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
