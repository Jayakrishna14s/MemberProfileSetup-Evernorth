

import styles from './InfoScroll.module.css';

const statements = [
    "We are a financial planning and life insurance company dedicated to helping you secure your future.",
    "Our team of experts will guide you through every step of your financial journey.",
    "With personalized plans and a commitment to your success, we ensure you have the support you need to achieve your financial goals.",
    "We focus on building long-term relationships with our clients to ensure their financial stability and success.",
];

const InfoScroll = () => {
    return (
        <div className={styles.infoScroll}>
            <h2>About Us</h2>
            <div className={styles.scrollContainer}>
                {statements.map((statement, index) => (
                    <div key={index} className={styles.statementBox}>
                        {statement}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InfoScroll;

