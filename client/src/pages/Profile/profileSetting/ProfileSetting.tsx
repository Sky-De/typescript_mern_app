import { useNavigate } from "react-router-dom";
import "./style.scss";
import UserEditBtn from "../../../components/buttons/UserEditBtn";
import { useAppDispatch, useAppSelectore } from "../../../hooks/reduxHooks";
import { openModel } from "../../../redux/features/model/modelSlice";
import { useEffect } from "react";
import VerifyUser from "../../../components/verifyUser/verifyUser";
import Avatar from "../../../assets/icons/avatar.png";
import { activeAlert } from "../../../redux/features/alert/alertSlice";
import BackBtn from "../../../components/buttons/BackBtn";

const ProfileSetting: React.FC = () => {
  const { user } = useAppSelectore((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const changePassStartHandler = () => {
    if (user?.isVerified) return dispatch(openModel("USER_PASS_EDIT"));
    else
      return dispatch(
        activeAlert({
          type: "FAILD",
          message: "You need to verify your email address first!!",
        })
      );
  };

  const changeNameStartHandler = () => {
    if (user?.isVerified) return dispatch(openModel("USER_NAME_EDIT"));
    else
      return dispatch(
        activeAlert({
          type: "FAILD",
          message: "You need to verify your email address first!!",
        })
      );
  };

  const changeImgStartHandler = () => {
    if (user?.isVerified) return dispatch(openModel("USER_IMG_EDIT"));
    else
      return dispatch(
        activeAlert({
          type: "FAILD",
          message: "You need to verify your email address first!!",
        })
      );
  };

  const deleteAccountStartHandler = () => {
    if (user?.isVerified) return dispatch(openModel("USER_ACCOUNT_DELETE"));
    else
      return dispatch(
        activeAlert({
          type: "FAILD",
          message: "You need to verify your email address first!!",
        })
      );
  };

  useEffect(() => {
    if (!user) navigate("/");
  }, [user, user?.isVerified, navigate]);
  // last navigate

  return (
    <main className="profileSetting">
      <h2>ProfileSetting</h2>
      <div className="profileSetting__content">
        <BackBtn path="/profile" />

        {!user?.isVerified && <VerifyUser />}

        <div className="profileSetting__actions">
          <div className="profileSetting__actions--joinedAt profileSettingItem">
            <span>joined at</span>
            <p>{user?.createdAt?.toString().slice(0, 16)}</p>
          </div>

          <div className="profileSetting__actions--email profileSettingItem">
            <span>email</span>
            <p>{user?.email}</p>
          </div>

          <div className="profileSetting__actions--avatar profileSettingItem">
            <span>image</span>
            <UserEditBtn
              name="Change Image"
              clickHandler={changeImgStartHandler}
            />
            <img src={user?.imgUrl ? user?.imgUrl : Avatar} alt="user avatar" />
          </div>

          <div className="profileSetting__actions--name profileSettingItem">
            <span>name</span>
            <UserEditBtn
              name="Change Name"
              clickHandler={changeNameStartHandler}
            />
            <p>{user?.name}</p>
          </div>

          <div className="profileSetting__actions--pass profileSettingItem">
            <span>pass</span>
            <UserEditBtn
              name="Change Pass"
              clickHandler={changePassStartHandler}
            />
            <p>* * * * * *</p>
          </div>

          <div className="profileSetting__actions--verified profileSettingItem">
            <span>verified</span>
            <i
              className={`bx ${
                user?.isVerified ? "bxs-user-check" : "bxs-user-x"
              }`}
            ></i>
          </div>

          <div className="profileSetting__actions--delete profileSettingItem">
            <span>delete account</span>
            <UserEditBtn
              name="Delete User"
              clickHandler={deleteAccountStartHandler}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProfileSetting;
