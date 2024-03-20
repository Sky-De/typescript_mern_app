import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {
  useLoginFormValidator,
  useRegisterFormValidator,
} from "../../../hooks/formValidators";
import {
  googleAuth,
  loginUser,
  registerUser,
} from "../../../redux/features/user/userActionCreators";
import { useAppDispatch, useAppSelectore } from "../../../hooks/reduxHooks";
import Input from "../Input";
import "./style.scss";
import LogoutFrom from "./LogoutFrom";
import SubmitBtn from "../../buttons/SubmitBtn";
import { resetUserError } from "../../../redux/features/user/userSlice";
import ErrorMessage from "../../Error/Error";
import CloseBtn from "../../buttons/CloseBtn";

import { GoogleLogin } from "@react-oauth/google";

type Form = {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
};

const formDataInitialState: Form = {
  name: "",
  email: "",
  password: "",
  repeatPassword: "",
};

type FormErr = {
  isError: boolean;
  msg: string;
};
const formErrInitialState = {
  isError: false,
  msg: "",
};

const AuthForm: React.FC = () => {
  const [isRegister, setIsRegister] = useState<boolean>(false);
  const [formData, setformData] = useState<Form>(formDataInitialState);
  const { user, isLoading, error } = useAppSelectore((state) => state.user);
  const [formErr, setFormErr] = useState<FormErr>(formErrInitialState);
  const dispatch = useAppDispatch();

  const { isValid: registerFormIsValid, errMessage: registerFormErr } =
    useRegisterFormValidator(formData);
  const { isValid: logFormIsValid, errMessage: logFormErr } =
    useLoginFormValidator(formData);

  const changeHandler = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    dispatch(resetUserError());
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  const authTypeHandle = () => setIsRegister(!isRegister);

  const submitFormHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { repeatPassword, ...newFormData } = formData;

    // register-----------------------------------------
    if (isRegister) {
      if (!registerFormIsValid)
        return setFormErr({ isError: true, msg: registerFormErr });
      setFormErr({ isError: false, msg: "" });
      dispatch(registerUser(newFormData));
      setformData(formDataInitialState);
      return;
    }

    // login--------------------------------------------------
    if (!logFormIsValid) return setFormErr({ isError: true, msg: logFormErr });
    setFormErr({ isError: false, msg: "" });
    dispatch(loginUser(newFormData));
    setformData(formDataInitialState);
  };

  useEffect(() => {
    setFormErr(formErrInitialState);
    dispatch(resetUserError());
    setformData(formDataInitialState);
  }, [isRegister, dispatch]);
  // last dispatch

  if (user) return <LogoutFrom />;

  return (
    <form className="authForm" onSubmit={submitFormHandler}>
      <CloseBtn />
      <i
        className={`bx authForm__icon ${
          isRegister ? "bx-user-pin" : "bx-check-shield"
        }`}
      ></i>
      <GoogleLogin
        onSuccess={async (credentialResponse) => {
          // console.log(credentialResponse);
          if (credentialResponse.credential) {
            dispatch(googleAuth({ token: credentialResponse.credential }));
          }
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
      <div className="divider">
        <hr /> <span>or</span> <hr />
      </div>
      {isRegister && (
        <Input
          type="text"
          name="name"
          changeHandler={changeHandler}
          value={formData.name}
        />
      )}
      <Input
        type="email"
        name="email"
        changeHandler={changeHandler}
        value={formData.email}
      />
      <Input
        type="password"
        name="password"
        changeHandler={changeHandler}
        value={formData.password}
      />
      {isRegister && (
        <Input
          type="password"
          name="repeatPassword"
          changeHandler={changeHandler}
          value={formData.repeatPassword}
        />
      )}
      <SubmitBtn
        isLoading={isLoading}
        tag={isRegister ? "register" : "login"}
      />
      {isRegister ? (
        <span className="authForm__textBtn" onClick={authTypeHandle}>
          Have an account already ? <span>Login</span>
        </span>
      ) : (
        <span className="authForm__textBtn" onClick={authTypeHandle}>
          Don't have an account ? <span>Register</span>
        </span>
      )}
      {/* form validation Err */}
      {formErr.isError && <ErrorMessage errMessage={formErr.msg} />}
      {/* api response Err */}
      {error && <ErrorMessage errMessage={error} />}
    </form>
  );
};

export default AuthForm;
