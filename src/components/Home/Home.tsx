import Card from "../../UI/Card/Card";

import styles from "./Home.module.css";

interface HomeProps {
  onLogout: () => void;
}

const Home: React.FC<HomeProps> = (props) => {
  return (
    <Card className={styles.home}>
      <h1>Welcome back!</h1>
    </Card>
  );
};

export default Home;
