import {
  ChangeEvent,
  useState,
  useReducer,
  useEffect,
  useContext,
} from "react";

import Card from "../../UI/Card/Card";
import Button from "../../UI/Button/Button";

import styles from "./Login.module.css";
import AuthContext from "../../context/AuthContext";

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

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: true,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: true,
  });

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
    authContext.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={styles.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${styles.control} ${
            emailState.isValid === false ? styles.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${styles.control} ${
            passwordState.isValid === false ? styles.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={styles.actions}>
          <Button type="submit" className={styles.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
