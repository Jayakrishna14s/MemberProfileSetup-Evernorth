import styles from './Plans.module.css';
import { Link } from 'react-router-dom';

const InsurancePlans = () => {
  return (
    <div className={styles.plansContainer}>
      <h1 className={`${styles.plansH1}`}>Mass Mutual's trusted insurance policies</h1>
      <div className={styles.plans}>
        
        {/* Health Insurance Plan */}
        <div className={`${styles.plan} ${styles.lowPlan}`}>
          <h2>Health Insurance Policy</h2>
          <br />
          <p><strong>IRDAI UIN: HEAL123456789</strong></p>
          <p>Comprehensive coverage for your family's healthcare needs.</p>
          <ul>
            <li>Cashless hospitalization in network hospitals.</li>
            <li>Annual health check-ups included.</li>
            <li>Pre and post-hospitalization expenses covered.</li>
          </ul>
        </div>

        {/* Life Insurance Plan */}
        <div className={`${styles.plan} ${styles.mediumPlan}`}>
          <h2>Life Insurance Policy</h2>
          <br />
          <p><strong>IRDAI UIN: LIFE987654321</strong></p>
          <p>Secure your family's financial future with our life insurance plans.</p>
          <ul>
            <li>Guaranteed payout on death of the insured.</li>
            <li>Flexible premium payment options available.</li>
            <li>Option to add riders for additional coverage.</li>
          </ul>
        </div>

        {/* Vehicle Insurance Plan */}
        <div className={`${styles.plan} ${styles.highPlan}`}>
          <h2>Motor Insurance Policy</h2>
          <br />
          <p><strong>IRDAI UIN: VEHICLE11223344</strong></p>
          <p>Protect your vehicle against damages and theft.</p>
          <ul>
            <li>Comprehensive coverage including third-party liability.</li>
            <li>No claim bonus benefits for claim-free years.</li>
            <li>Quick and easy claim settlement process.</li>
          </ul>
        </div>

        {/* Travel Insurance Plan */}
        <div className={`${styles.plan} ${styles.newPlan}`}>
          <h2>Travel Insurance Policy</h2>
          <br />
          <p><strong>IRDAI UIN: TRAVEL55667788</strong></p>
          <p>Enjoy your journeys with peace of mind, wherever you go.</p>
          <ul>
            <li>Coverage for trip cancellations and delays.</li>
            <li>Emergency medical expenses while abroad.</li>
            <li>Loss of luggage or passport reimbursement.</li>
          </ul>
        </div>

      </div>
    </div>
  );
}

export default InsurancePlans;
