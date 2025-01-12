import styles from "./Footer.module.css";
import { BACKEND_URL } from "../config";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>&copy; 2024 EverNorth. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
