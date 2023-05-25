import { ReactNode } from "react";
import styles from "./Button.module.css";

interface ButtonProps {
  type?: "submit" | "reset" | "button" | undefined;
  className: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  disabled?: boolean;
  children: ReactNode;
}

const Button: React.FC<ButtonProps> = (props) => {
  return (
    <button
      type={props.type || "button"}
      className={`${styles.button} ${props.className}`}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
