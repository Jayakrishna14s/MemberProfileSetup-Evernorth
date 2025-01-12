import styles from "./Header.module.css";
import logo from "./assets/mmlogo.png"; // Import your logo image
import { BACKEND_URL } from "../config";

const Header = () => {
  return (
    <header className={styles.header}>
      <img src={logo} alt="MassMutual Logo" className={styles.logo} />{" "}
      {/* Logo Image */}
      <nav className={styles.nav}>
        <ul className={styles.navLinks}>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">About Us</a>
          </li>
          <li>
            <a href="#">Plans</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
