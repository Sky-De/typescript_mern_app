import { closeModel } from "../redux/features/model/modelSlice";
import { resetPostError } from "../redux/features/post/postSlice";
import { resetUserError } from "../redux/features/user/userSlice";
import { useAppDispatch } from "./reduxHooks";

export const useCloseCleanModel = () => {
  const dispatch = useAppDispatch();

  return () => {
    dispatch(closeModel());
    dispatch(resetUserError());
    dispatch(resetPostError());
  };
};
