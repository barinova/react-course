import { Component } from 'react';
import './Button.css';

interface ButtonProps {
  onButtonClick: () => void;
  text: string;
}

export default class Button extends Component<ButtonProps> {
  render() {
    const { onButtonClick, text } = this.props;
    return (
      <button className={'button'} onClick={onButtonClick}>
        {text}
      </button>
    );
  }
}
