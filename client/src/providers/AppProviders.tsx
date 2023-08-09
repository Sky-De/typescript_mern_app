import { Provider } from "react-redux";
import { FC, ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";
import { store } from "../redux/store/store";
import ErrorBoundary from "./ErrorBoundry";

type Props = {
  children: ReactNode;
};

export const AppProviders: FC<Props> = ({ children }: Props) => {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <BrowserRouter>{children}</BrowserRouter>
      </Provider>
    </ErrorBoundary>
  );
};

export default AppProviders;
