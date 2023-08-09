import { ChangeEvent, FormEvent, useState } from "react";
import Input from "../Input";
import SubmitBtn from "../../buttons/SubmitBtn";
import { useEditPassFormValidator } from "../../../hooks/formValidators";
import { useAppDispatch, useAppSelectore } from "../../../hooks/reduxHooks";
import { updateUserPass } from "../../../redux/features/user/userActionCreators";
import CloseBtn from "../../buttons/CloseBtn";
import ErrorMessage from "../../Error/Error";

type FormDataState = {
  currentPassword: string;
  newPassword: string;
  repeatNewPassword: string;
};

const ChangePassForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    isLoading,
    error: userError,
    user,
  } = useAppSelectore((state) => state.user);
  const [formData, setFormData] = useState<FormDataState>({
    currentPassword: "",
    newPassword: "",
    repeatNewPassword: "",
  });
  const { isValid, errMessage } = useEditPassFormValidator(formData);
  const changeHandler = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ): void => setFormData({ ...formData, [e.target.name]: e.target.value });

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log(isValid);
    dispatch(
      updateUserPass({
        password: formData.currentPassword,
        newPassword: formData.newPassword,
        id: user ? user?._id : "",
      })
    );
  };

  return (
    <>
      <form className="changePassForm" onSubmit={submitHandler}>
        <CloseBtn />
        <Input
          name="currentPassword"
          type="password"
          value={formData.currentPassword}
          changeHandler={changeHandler}
          focus
        />
        <Input
          name="newPassword"
          type="password"
          value={formData.newPassword}
          changeHandler={changeHandler}
        />
        <Input
          name="repeatNewPassword"
          type="password"
          value={formData.repeatNewPassword}
          changeHandler={changeHandler}
        />

        <SubmitBtn
          isLoading={isLoading}
          tag="Change Password"
          disable={!isValid}
        />
        {!isValid && <ErrorMessage errMessage={errMessage} />}
        {userError && <ErrorMessage errMessage={userError} />}
      </form>
    </>
  );
};

export default ChangePassForm;
