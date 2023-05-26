import Card from "../../UI/Card/Card";

import styles from "./Home.module.css";

const Home: React.FC = () => {
  return (
    <Card className={styles.home}>
      <h1>Welcome back!</h1>
    </Card>
  );
};

export default Home;
