import { ReactNode } from "react";

import styles from "./Card.module.css";

interface CardProps {
  className: string;
  children: ReactNode;
}

const Card: React.FC<CardProps> = (props) => {
  return (
    <div className={`${styles.card} ${props.className}`}>{props.children}</div>
  );
};

export default Card;
