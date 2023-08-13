import { useAppSelectore } from "../../hooks/reduxHooks";
import PostForm from "../forms/postForm/PostForm";
import AuthForm from "../forms/userForms/AuthForm";
import BookDetails from "../bookDetails/BookDetails";
import "./style.scss";
import DeleteAlert from "../forms/postForm/DeleteAlert";
import ChangePassForm from "../forms/userForms/ChangePassForm";
import ChangeNameForm from "../forms/userForms/ChangeNameForm";
import ChangeImgForm from "../forms/userForms/ChangeImgForm";
import DeleteAccountForm from "../forms/userForms/DeleteAccountForm";
import { useCloseCleanModel } from "../../hooks/useCloseCleanModel";

const AuthModel = () => {
  const { type } = useAppSelectore((state) => state.model);
  const closeModelHandler = useCloseCleanModel();

  const onClick = (e: React.MouseEvent): void => e.stopPropagation();

  return (
    <div className="model" onClick={closeModelHandler}>
      <div className="model__contentCon" onClick={onClick}>
        {type === "AUTH" && <AuthForm />}
        {type === "POST_CREATE" && <PostForm isUpdate={false} />}
        {type === "POST_EDIT" && <PostForm isUpdate={true} />}
        {type === "SHOW" && <BookDetails />}
        {type === "POST_DELETE" && <DeleteAlert />}
        {type === "USER_PASS_EDIT" && <ChangePassForm />}
        {type === "USER_NAME_EDIT" && <ChangeNameForm />}
        {type === "USER_IMG_EDIT" && <ChangeImgForm />}
        {type === "USER_ACCOUNT_DELETE" && <DeleteAccountForm />}
      </div>
    </div>
  );
};

export default AuthModel;
