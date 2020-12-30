/**
 *
 * ScavengerQuestion
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import SingleInputGroup from '../SingleInputGroup';

interface Props {}

export function ScavengerQuestion(props: Props) {
  const [answer, setAnswer] = React.useState('');

  const updateAnswer = output => {
    console.log(output);
    setAnswer(output);
  };
  console.log(answer);
  return (
    <Div>
      <SingleInputGroup
        amount={5}
        autoFocus={true}
        inputRegExp={/^[0-9]$/}
        password={false}
        handleOutputString={updateAnswer}
      />
    </Div>
  );
}

const Div = styled.div``;
