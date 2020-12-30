import React from 'react';
import styled from 'styled-components';

const Input = styled.input`
  justify-content: space-between;
  width: 1.25rem;
  height: 1.25rem;
  margin: 5px;
  border-radius: 0;
  border-top: 0;
  border-left: 0;
  border-right: 0;
  text-align: center;
  font-size: 1rem;
  font-family: -apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Arial sans-serif;
`;

interface Props {
  name: string;
  value?: string;
  type?: string;
  handleKeyDown: (target) => any;
  handleFocus: (target) => any;
  handleChange: (target) => any;
  inputRef: (el) => any;
  inputProps?: object;
}

export default function InputBox({
  type,
  value,
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
      value={value}
      ref={inputRef}
    />
  );
}
