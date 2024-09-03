import { Provider } from "react-redux";
import { FC, ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";
import { store } from "../redux/store/store";
import ErrorBoundary from "./ErrorBoundry";
import { GoogleOAuthProvider } from "@react-oauth/google";

type Props = {
  children: ReactNode;
};
// FIX--- replace with .env
export const AppProviders: FC<Props> = ({ children }: Props) => {
  return (
    <GoogleOAuthProvider clientId="118589316191-sibtenu9196le9sq2vareqdj21vjdsdo.apps.googleusercontent.com">
      <ErrorBoundary>
        <Provider store={store}>
          <BrowserRouter>{children}</BrowserRouter>
        </Provider>
      </ErrorBoundary>
    </GoogleOAuthProvider>
  );
};

export default AppProviders;
