import styles from "./WhyChoose.module.css";
import { BACKEND_URL } from "../config";

const WhyChoose = () => {
  return (
    <section className={styles.whyChoose}>
      <h2>Why Choose MassMutual Insurance?</h2>
      <div className={styles.boxContainer}>
        <div className={styles.box}>
          <img src="src\landing\assets\Realiablity1.jpg" alt="Feature 1" />
          <p className={styles.cardTitle}>Reliable Protection</p>
          <span className={styles.cardInfo}>
            Count on us to safeguard what matters most, always
          </span>
        </div>
        <div className={styles.box}>
          <img src="src\landing\assets\afford.jpg" alt="Feature 2" />
          <p className={styles.cardTitle}>Affordable Plans</p>
          <span className={styles.cardInfo}>
            Smart coverage options that fit your budget effortlessly
          </span>
        </div>
        <div className={styles.box}>
          <img src="src\landing\assets\247jpg.jpg" alt="Feature 3" />
          <p className={styles.cardTitle}>24/7 Support</p>
          <span className={styles.cardInfo}>
            We’re here for you anytime, anywhere, no exceptions
          </span>
        </div>
        <div className={styles.box}>
          <img src="src\landing\assets\flexibility1.jpg" alt="Feature 4" />
          <p className={styles.cardTitle}>Flexible Coverage</p>
          <span className={styles.cardInfo}>
            Tailor-made policies that adapt to your unique needs.
          </span>
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
