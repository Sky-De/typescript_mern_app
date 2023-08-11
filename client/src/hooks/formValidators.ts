import { useEffect, useState } from "react";

// ----------------------------------------------------------------------------AUTH FORM VALIDATOR---

type Validation = {
  isValid: boolean;
  errMessage: string;
};
const initialValidationState: Validation = {
  isValid: false,
  errMessage: "",
};

// ------------------------------------------------------------------------------------registerValidator
type RegisterFormProps = {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
};
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const isEmail = (str: string) => emailRegex.test(str);

export const useRegisterFormValidator = (formData: RegisterFormProps) => {
  const [validation, setValidation] = useState<Validation>(
    initialValidationState
  );
  const minPassLength = 6;

  useEffect(() => {
    if (formData.password !== formData.repeatPassword)
      return setValidation({
        isValid: false,
        errMessage: "Passwords do not match!",
      });
    if (formData.password.length < minPassLength)
      return setValidation({
        isValid: false,
        errMessage: `Password must be at least ${minPassLength} chatacter.`,
      });
    if (
      formData.name === "" ||
      formData.email === "" ||
      formData.password === ""
    )
      return setValidation({
        isValid: false,
        errMessage: "You must fill all feilds",
      });
    if (!isEmail(formData.email))
      return setValidation({
        isValid: false,
        errMessage: "Email address is not valid.",
      });

    setValidation({ errMessage: "", isValid: true });
  }, [formData]);

  return validation;
};
// ------------------------------------------------------------------------------------loginValidator
type LoginFormProps = {
  email: string;
  password: string;
};

export const useLoginFormValidator = (formData: LoginFormProps) => {
  const [validation, setValidation] = useState<Validation>(
    initialValidationState
  );
  const minPassLength = 3;

  useEffect(() => {
    if (formData.password.length < minPassLength)
      return setValidation({
        isValid: false,
        errMessage: `Password must be at least ${minPassLength} chatacter.`,
      });
    if (formData.email === "" || formData.password === "")
      return setValidation({
        isValid: false,
        errMessage: "You must fill all feilds",
      });
    if (!isEmail(formData.email))
      return setValidation({
        isValid: false,
        errMessage: "Email address is not valid.",
      });

    setValidation({ errMessage: "", isValid: true });
  }, [formData]);

  return validation;
};

// ----------------------------------------------------------------------------USER pass EDIT FORM VALIDATOR---
type EditPassForm = {
  currentPassword: string;
  newPassword: string;
  repeatNewPassword: string;
};

export const useEditPassFormValidator = (formData: EditPassForm) => {
  const [validation, setValidation] = useState<Validation>(
    initialValidationState
  );
  const minPassLength = 3;

  useEffect(() => {
    if (formData.newPassword !== formData.repeatNewPassword)
      return setValidation({
        isValid: false,
        errMessage: "Passwords do not match!",
      });
    if (
      formData.currentPassword === "" ||
      formData.newPassword === "" ||
      formData.repeatNewPassword === ""
    )
      return setValidation({
        isValid: false,
        errMessage: "You must fill all feilds",
      });
    if (formData.currentPassword.length < minPassLength)
      return setValidation({
        isValid: false,
        errMessage: `Password must be at least ${minPassLength} chatacter.`,
      });
    if (formData.newPassword.length < minPassLength)
      return setValidation({
        isValid: false,
        errMessage: `Password must be at least ${minPassLength} chatacter.`,
      });

    setValidation({ errMessage: "", isValid: true });
  }, [formData]);

  return validation;
};

// ----------------------------------------------------------------------------USER name EDIT FORM VALIDATOR---
type EditNameForm = {
  name: string;
  id?: string;
};

export const useEditNameFormValidator = (formData: EditNameForm) => {
  const [validation, setValidation] = useState<Validation>(
    initialValidationState
  );

  useEffect(() => {
    if (formData.name === "")
      return setValidation({
        isValid: false,
        errMessage: "Name field can not be empty",
      });

    setValidation({ errMessage: "", isValid: true });
  }, [formData]);

  return validation;
};

// ----------------------------------------------------------------------------USER name EDIT FORM VALIDATOR---

type PostFormStateProps = {
  title: string;
  bookAuthor: string;
  desc: string;
  coverUrl: string;
};

export const usePostFormValidator = (formData: PostFormStateProps) => {
  const [validation, setValidation] = useState<Validation>(
    initialValidationState
  );
  const minDescription = 40;

  useEffect(() => {
    if (formData.desc.length < minDescription)
      return setValidation({
        isValid: false,
        errMessage: `Description at least must be ${minDescription} letter!`,
      });

    setValidation({ errMessage: "", isValid: true });
  }, [formData]);

  return validation;
};
