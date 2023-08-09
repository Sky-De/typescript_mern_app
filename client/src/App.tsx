import { Routes, Route } from "react-router-dom";
import { useAppSelectore } from "./hooks/reduxHooks";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import Header from "./layout/header/Header";
import Footer from "./layout/footer/Footer";
import Model from "./components/models/Model";
import NewPostBtn from "./components/buttons/NewPostBtn";
import ProfileSetting from "./pages/Profile/profileSetting/ProfileSetting";
import Nav from "./layout/nav/Nav";
import Alert from "./components/alert/Alert";
import NotFound from "./components/Error/NotFound";
import "./App.scss";

const App: React.FC = () => {
  const { isDark } = useAppSelectore((state) => state.theme);
  const { isOpen: modelIsOpen } = useAppSelectore((state) => state.model);

  return (
    <div role="application" className={`App ${isDark ? "dark" : ""}`}>
      <Header />
      <Alert />
      <Nav />
      {modelIsOpen && <Model />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/setting" element={<ProfileSetting />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <NewPostBtn />
      <Footer />
    </div>
  );
};

export default App;
