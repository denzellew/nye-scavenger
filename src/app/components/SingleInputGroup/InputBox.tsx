import React from 'react';
import styled from 'styled-components';

const Input = styled.input`
  justify-content: space-between;
  width: 45px;
  height: 45px;
  margin: 5px;
  border-radius: 5px;
  text-align: center;
  font-size: 34px;
  font-family: -apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Arial sans-serif;
`;

interface Props {
  name: string;
  type?: string;
  handleKeyDown: (target) => any;
  handleFocus: (target) => any;
  handleChange: (target) => any;
  inputRef: (el) => any;
  inputProps?: object;
}

export default function InputBox({
  type,
  handleKeyDown,
  handleChange,
  handleFocus,
  name,
  inputRef,
  inputProps,
}: Props) {
  return (
    <Input
      {...inputProps}
      type={type}
      onKeyDown={handleKeyDown}
      onChange={handleChange}
      onFocus={handleFocus}
      maxLength={1}
      name={name}
      ref={inputRef}
    />
  );
}
