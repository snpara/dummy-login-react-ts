import { Fragment, useState, useEffect } from "react";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import MainHeader from "./components/MainHeader/MainHeader";

function App() {
  const [isLoggedin, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem("isLoggedIn");
    if (storedUserLoggedInInformation === "TRUE") {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = (email: string, password: string) => {
    localStorage.setItem("isLoggedIn", "TRUE");
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
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
