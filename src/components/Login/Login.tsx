import {
  ChangeEvent,
  useState,
  useReducer,
  useEffect,
  useContext,
  useRef,
} from "react";

import Card from "../../UI/Card/Card";
import Button from "../../UI/Button/Button";
import AuthContext from "../../context/AuthContext";
import Input from "../Input/Input";

import styles from "./Login.module.css";

enum InputActionKind {
  USER_INPUT = "USER_INPUT",
  INPUT_BLUR = "INPUT_BLUR",
}

interface InputAction {
  type: InputActionKind;
}

interface InputActionWithPayload extends InputAction {
  payload: string;
}

interface InputState {
  value: string;
  isValid: boolean;
}

const isInputActionWithPayload = (
  object: InputAction | InputActionWithPayload
): object is InputActionWithPayload => {
  return "payload" in object;
};

const isInputAction = (
  object: InputAction | InputActionWithPayload
): object is InputAction => {
  return !("payload" in object);
};

const emailReducer = (
  state: InputState,
  action: InputAction | InputActionWithPayload
) => {
  if (
    isInputActionWithPayload(action) &&
    action.type === InputActionKind.USER_INPUT
  ) {
    return { value: action.payload, isValid: action.payload.includes("@") };
  }
  if (isInputAction(action) && action.type === InputActionKind.INPUT_BLUR) {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};

const passwordReducer = (
  state: InputState,
  action: InputAction | InputActionWithPayload
) => {
  if (
    isInputActionWithPayload(action) &&
    action.type === InputActionKind.USER_INPUT
  ) {
    return { value: action.payload, isValid: action.payload.trim().length > 6 };
  }
  if (isInputAction(action) && action.type === InputActionKind.INPUT_BLUR) {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: "", isValid: false };
};

const Login: React.FC = () => {
  const [formIsValid, setFormIsValid] = useState<boolean>(false);

  const authContext = useContext(AuthContext);

  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const initialState: InputState = {
    value: "",
    isValid: false,
  };

  const [emailState, dispatchEmail] = useReducer(emailReducer, initialState);

  const [passwordState, dispatchPassword] = useReducer(
    passwordReducer,
    initialState
  );

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 500);

    return () => {
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    dispatchEmail({
      type: InputActionKind.USER_INPUT,
      payload: event.target.value,
    });
  };

  const passwordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    dispatchPassword({
      type: InputActionKind.USER_INPUT,
      payload: event.target.value,
    });
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: InputActionKind.INPUT_BLUR });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: InputActionKind.INPUT_BLUR });
  };

  const submitHandler = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formIsValid) {
      authContext.onLogin(emailState.value, passwordState.value);
    } else if (!emailIsValid) {
      emailInputRef.current?.focus();
    } else {
      passwordInputRef.current?.focus();
    }
  };

  return (
    <Card className={styles.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailInputRef}
          id="email"
          label="E-Mail"
          type="email"
          isValid={emailIsValid}
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input
          ref={passwordInputRef}
          id="password"
          label="Password"
          type="password"
          isValid={passwordIsValid}
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        <div className={styles.actions}>
          <Button type="submit" className={styles.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
