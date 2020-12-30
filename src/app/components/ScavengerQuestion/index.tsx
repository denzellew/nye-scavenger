/**
 *
 * ScavengerQuestion
 *
 */
import { Button } from 'antd';
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
  const [userAnswer, setUserAnswer] = React.useState(props.userAnswer || '');

  const updateAnswer = output => {
    setUserAnswer(output);
  };
  console.log(userAnswer);
  return (
    <Div>
      <div>{props.location}</div>
      <SingleInputGroup
        amount={5}
        autoFocus={true}
        inputRegExp={/^[0-9]$/}
        password={false}
        handleOutputString={updateAnswer}
      />
      <Button type="primary" ghost>
        Need Help?
      </Button>
      <Button type="primary">Submit</Button>
    </Div>
  );
};

ScavengerQuestion.defaultProps = defaultProps;

const Div = styled.div``;

export default ScavengerQuestion;
