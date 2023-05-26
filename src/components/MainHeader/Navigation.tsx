import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

import styles from "./Navigation.module.css";

const Navigation: React.FC = () => {
  const authContext = useContext(AuthContext);

  return (
    <nav className={styles.nav}>
      <ul>
        {authContext.isLoggedIn && (
          <li>
            <a href="/">Users</a>
          </li>
        )}
        {authContext.isLoggedIn && (
          <li>
            <a href="/">Admin</a>
          </li>
        )}
        {authContext.isLoggedIn && (
          <li>
            <button onClick={authContext.onLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
