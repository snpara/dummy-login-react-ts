import styles from "./Navigation.module.css";

interface NavigationProps {
  isLoggedIn: boolean;
  onLogout: () => void;
}

const Navigation: React.FC<NavigationProps> = (props) => {
  return (
    <nav className={styles.nav}>
      <ul>
        {props.isLoggedIn && (
          <li>
            <a href="/">Users</a>
          </li>
        )}
        {props.isLoggedIn && (
          <li>
            <a href="/">Admin</a>
          </li>
        )}
        {props.isLoggedIn && (
          <li>
            <button onClick={props.onLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
