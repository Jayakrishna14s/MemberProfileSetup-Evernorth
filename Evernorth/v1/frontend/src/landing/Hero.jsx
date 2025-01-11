import React from 'react';
import styles from './Hero.module.css';

const Hero = () => {
  return (
    <div className={styles.hero}>
      <h1>Welcome to Evernorth Health Services</h1>
      <p>Transforming health services to improve quality of life.</p>
      <p>
        Evernorth uses innovative technology to make healthcare more accessible and effective. Our services simplify diagnosis, treatment, and prevention of complex conditions, empowering individuals and organizations to drive progress and improve lives.
      </p>
    </div>
  );
};

export default Hero;
