import './Button.css';

interface ButtonProps {
  onButtonClick: () => void;
  text: string;
  disabled?: boolean;
  small?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  onButtonClick,
  text,
  disabled,
  small,
}: ButtonProps) => {
  return (
    <button
      className={`button ${small ? 'button-small' : ''}`}
      disabled={disabled}
      onClick={onButtonClick}
    >
      {text}
    </button>
  );
};

export default Button;
