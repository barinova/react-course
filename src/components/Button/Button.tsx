import './Button.css';

interface ButtonProps {
  onButtonClick: () => void;
  text: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  onButtonClick,
  text,
  disabled,
}: ButtonProps) => {
  return (
    <button className={'button'} disabled={disabled} onClick={onButtonClick}>
      {text}
    </button>
  );
};

export default Button;
