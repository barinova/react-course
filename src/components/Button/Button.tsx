import './Button.css';

interface ButtonProps {
  onButtonClick: () => void;
  text: string;
}

const Button: React.FC<ButtonProps> = ({
  onButtonClick,
  text,
}: ButtonProps) => {
  return (
    <button className={'button'} onClick={onButtonClick}>
      {text}
    </button>
  );
};

export default Button;
