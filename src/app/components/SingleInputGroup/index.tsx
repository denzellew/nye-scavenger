import React, { Component } from 'react';
import InputBox from './InputBox';

interface Props {
  amount: number;
  autoFocus: boolean;
  inputRegExp: RegExp;
  password: boolean;
  handleOutputString: (output) => any;
}

interface State {
  characterArray: string[];
}

class SingleInputGroup extends Component<Props, State> {
  inputElements: object;

  constructor(props: Props) {
    super(props);
    this.state = { characterArray: [] };

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.inputElements = {};
  }

  componentDidMount() {
    if (this.props.autoFocus) {
      this.inputElements['input0'].select();
    }
  }

  shouldComponentUpdate(nextProps) {
    if (
      this.props.amount !== nextProps.amount ||
      this.props.inputRegExp !== nextProps.inputRegExp
    ) {
      return true;
    }
    return false;
  }

  renderItems() {
    let items: any[] = [];

    for (var i = 0; i < this.props.amount; i++) {
      items.push(
        <InputBox
          type="text"
          key={i}
          handleKeyDown={this.handleKeyDown}
          handleFocus={this.handleFocus}
          handleChange={this.handleChange}
          name={'input' + i}
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
    } else {
      target.value = this.state.characterArray[
        target.name.replace('input', '')
      ];
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
