import { FC, useEffect } from "react";
import { useAppDispatch, useAppSelectore } from "../../hooks/reduxHooks";
import { deactiveAlert } from "../../redux/features/alert/alertSlice";

import "./style.scss";
const Alert: FC = () => {
  const { isActive, message, type, duration } = useAppSelectore(
    (store) => store.alert
  );
  const disaptch = useAppDispatch();
  const deactiveMessageHandler = () => disaptch(deactiveAlert());

  useEffect(() => {
    if (isActive) {
      // FIX, must remove after not active
      setTimeout(() => {
        deactiveMessageHandler();
      }, duration);
    }
  }, [isActive]);

  return (
    <div className={`alert ${isActive ? "active" : ""} ${type}`}>
      <div className="alert__content">
        {type === "INFO" && <i className="bx bx-info-circle INFO"></i>}
        {type === "SUCCESS" && (
          <i className="bx bx-select-multiple SUCCESS"></i>
        )}
        {type === "FAILD" && <i className="bx bx-shield-minus FAILD"></i>}
        {type === "WARNING" && <i className="bx bx-error WARNING"></i>}
        <h6>{message}</h6>
      </div>
      <div onClick={deactiveMessageHandler} className="alert__action">
        x
      </div>
    </div>
  );
};

export default Alert;
