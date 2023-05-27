import { ChangeEvent, useRef, useImperativeHandle, forwardRef } from "react";
import styles from "./Input.module.css";

interface InputProps {
  isValid: boolean;
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
}

type Ref = {
  focus: () => void;
} | null;

const Input = forwardRef<Ref, InputProps>((props, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => {
    return {
      focus() {
        inputRef.current?.focus();
      },
    };
  });

  return (
    <div
      className={`${styles.control} ${
        props.isValid === false ? styles.invalid : ""
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      <input
        type={props.type}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
    </div>
  );
});

export default Input;
