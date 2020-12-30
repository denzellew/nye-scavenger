import React, { Component } from 'react';
import InputBox from './InputBox';

interface Props {
  template: string;
  value: string;
  inputRegExp: RegExp;
  password: boolean;
  inputProps?: object;
  handleOutputString: (output) => any;
}

interface State {
  characterArray: string[];
}

class SingleInputGroup extends Component<Props, State> {
  inputElements: object;

  constructor(props: Props) {
    super(props);

    const charArray = props.template
      .split('')
      .map((l, i) => (props.value ? props.value[i] : ''));

    this.state = { characterArray: charArray };

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.inputElements = {};
  }

  shouldComponentUpdate(nextProps) {
    if (
      this.props.template !== nextProps.template ||
      this.props.inputRegExp !== nextProps.inputRegExp
    ) {
      return true;
    }
    return false;
  }

  renderItems() {
    let items: any[] = [];

    for (var i = 0; i < this.state.characterArray.length; i++) {
      items.push(
        <InputBox
          type="text"
          key={i}
          handleKeyDown={this.handleKeyDown}
          handleFocus={this.handleFocus}
          handleChange={this.handleChange}
          name={'input' + i}
          value={this.state.characterArray[i]}
          inputProps={this.props.inputProps}
          inputRef={el => {
            if (!el) return;
            this.inputElements[el.name] = el;
          }}
        ></InputBox>,
      );
    }

    return items;
  }

  render() {
    return (
      <div>
        <div>{this.renderItems()}</div>
      </div>
    );
  }

  handleChange({ target }) {
    if (target.value.match(this.props.inputRegExp)) {
      this.focusNextChar(target);
      this.setModuleOutput(target);
    }
  }

  handleKeyDown({ target, key }) {
    if (key === 'Backspace') {
      if (target.value === '' && target.previousElementSibling !== null) {
        target.previousElementSibling.value = '';
        this.focusPrevChar(target);
      } else {
        target.value = '';
      }
      this.setModuleOutput(target);
    } else if (key === 'ArrowLeft') {
      this.focusPrevChar(target);
    } else if (key === 'ArrowRight' || key === ' ') {
      this.focusNextChar(target);
    }
  }

  handleFocus({ target }) {
    var el = target;
    // In most browsers .select() does not work without the added timeout.
    setTimeout(function () {
      el.select();
    }, 0);
  }

  focusPrevChar(target) {
    if (target.previousElementSibling !== null) {
      target.previousElementSibling.focus();
    }
  }

  focusNextChar(target) {
    if (target.nextElementSibling !== null) {
      target.nextElementSibling.focus();
    }
  }

  setModuleOutput(target) {
    this.setState(
      prevState => {
        let updatedCharacters = prevState.characterArray.map(
          (character, number) => {
            return this.inputElements['input' + number].value;
          },
        );
        return { characterArray: updatedCharacters };
      },
      () => this.props.handleOutputString(this.state.characterArray.join('')),
    );
  }
}

export default SingleInputGroup;
