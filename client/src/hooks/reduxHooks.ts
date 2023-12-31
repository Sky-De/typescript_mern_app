import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store/store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelectore: TypedUseSelectorHook<RootState> = useSelector;
