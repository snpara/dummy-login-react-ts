import Navigation from "./Navigation";

import styles from "./MainHeader.module.css";

const MainHeader: React.FC = () => {
  return (
    <header className={styles["main-header"]}>
      <h1>A Typical Page</h1>
      <Navigation />
    </header>
  );
};

export default MainHeader;
