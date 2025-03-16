import './Button.css';

interface ButtonProps {
  text: string;
  disabled?: boolean;
  small?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  text,
  disabled,
  small,
}: ButtonProps) => {
  return (
    <button
      className={`button ${small ? 'button-small' : ''} ${disabled ? 'button-disabled' : ''}`}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
