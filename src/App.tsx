import { Fragment, useState } from "react";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import MainHeader from "./components/MainHeader/MainHeader";

function App() {
  const [isLoggedin, setIsLoggedIn] = useState<boolean>(false);

  const loginHandler = (email: string, password: string) => {
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    setIsLoggedIn(false);
  };

  return (
    <Fragment>
      <MainHeader isAuthenticated={isLoggedin} onLogout={logoutHandler} />
      <main>
        {!isLoggedin && <Login onLogin={loginHandler} />}
        {isLoggedin && <Home onLogout={logoutHandler} />}
      </main>
    </Fragment>
  );
}

export default App;
