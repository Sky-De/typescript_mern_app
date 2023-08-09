import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";

import "./style.scss";

type InputProps = {
  type: "password" | "text" | "email" | "text-field";
  name: string;
  changeHandler: (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => void;
  value: string;
  focus?: boolean;
};

const Input: React.FC<InputProps> = (props) => {
  const { type, name, changeHandler, value, focus } = props;
  const [showPass, setShowPass] = useState<boolean>(false);

  return (
    <div className="input">
      <label htmlFor={name}>{name}</label>
      <div className="input__control">
        {type === "text-field" ? (
          // textarea minLength FIX
          <textarea
            autoFocus={focus}
            value={value}
            name={name}
            id={name}
            onChange={changeHandler}
            required
            className="input__item"
          ></textarea>
        ) : (
          <input
            autoFocus={focus}
            value={value}
            type={showPass ? "text" : type}
            name={name}
            id={name}
            onChange={changeHandler}
            required
            className="input__item"
          />
        )}

        {type === "password" && (
          <ShowPassBtn setShowPass={setShowPass} showPass={showPass} />
        )}
      </div>
    </div>
  );
};

type ShowPassIconProps = {
  showPass: boolean;
  setShowPass: Dispatch<SetStateAction<boolean>>;
};
const ShowPassBtn = ({ setShowPass, showPass }: ShowPassIconProps) => {
  const passShowHandler = () => setShowPass(!showPass);
  return (
    <div onClick={passShowHandler} className="showPassIcon">
      <i className="bx bx-low-vision"></i>
    </div>
  );
};

export default Input;
