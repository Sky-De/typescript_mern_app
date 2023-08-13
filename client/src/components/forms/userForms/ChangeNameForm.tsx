import { ChangeEvent, FormEvent, useState } from "react";
import Input from "../Input";
import SubmitBtn from "../../buttons/SubmitBtn";
import { useEditNameFormValidator } from "../../../hooks/formValidators";
import { updateUser } from "../../../redux/features/user/userActionCreators";
import { useAppDispatch, useAppSelectore } from "../../../hooks/reduxHooks";
import CloseBtn from "../../buttons/CloseBtn";
import ErrorMessage from "../../Error/Error";

type FormDataState = {
  name: string;
  id: string;
};

const ChangeNameForm: React.FC = () => {
  const {
    user,
    isLoading,
    error: userError,
  } = useAppSelectore((state) => state.user);

  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<FormDataState>({
    name: user ? user.name : "",
    id: user ? user._id : "",
  });

  const { isValid, errMessage } = useEditNameFormValidator(formData);
  const changeHandler = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ): void => setFormData({ ...formData, [e.target.name]: e.target.value });

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateUser(formData));
  };

  return (
    <form className="changePassForm" onSubmit={submitHandler}>
      <CloseBtn />
      <Input
        name="name"
        type="text"
        value={formData.name}
        changeHandler={changeHandler}
        focus
      />
      <SubmitBtn isLoading={isLoading} tag="Change Name" disable={!isValid} />
      {!isValid && <ErrorMessage errMessage={errMessage} />}
      {userError && <ErrorMessage errMessage={userError} />}
    </form>
  );
};

export default ChangeNameForm;
