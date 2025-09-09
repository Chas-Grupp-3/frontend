interface ButtonProps {
  label: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

export const Button = ({ label, onClick, type = "button" }: ButtonProps) => (
  <button type={type} onClick={onClick}>
    {label}
  </button>
);
