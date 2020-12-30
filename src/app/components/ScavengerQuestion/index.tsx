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

export function ScavengerQuestion(props: Props) {
  const [userAnswer, setUserAnswer] = React.useState(props.userAnswer);

  const updateAnswer = output => {
    setUserAnswer(output);
  };
  console.log(userAnswer);
  return (
    <Div>
      <div>This clue is found in the bathroom</div>
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
}

const Div = styled.div``;
