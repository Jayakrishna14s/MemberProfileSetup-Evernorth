import { useState } from "react";
import styles from "./FAQ.module.css";
import { BACKEND_URL } from "../config";

const faqs = [
  {
    question: "What types of insurance do you offer?",
    answer:
      "We offer a variety of insurance products including life insurance, health insurance, and retirement plans.",
  },
  {
    question: "How can I file a claim?",
    answer:
      "Claims can be filed through our website or by contacting our customer service directly.",
  },
  {
    question: "What is the process for getting a quote?",
    answer:
      "You can get a quote by filling out our online form or by contacting one of our agents.",
  },
  {
    question: "Are there any discounts available?",
    answer:
      "Yes, we offer various discounts depending on the policy and circumstances.",
  },
  {
    question: "How do I update my policy?",
    answer:
      "You can update your policy by logging into your account or by contacting our customer service.",
  },
];

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    if (openIndex === index) {
      setOpenIndex(null); // Collapse if it's already open
    } else {
      setOpenIndex(index); // Open the selected FAQ
    }
  };

  return (
    <div className={styles.faqSection}>
      <h2>Frequently Asked Questions</h2>
      {faqs.map((faq, index) => (
        <div key={index} className={styles.faqItem}>
          <div className={styles.faqQuestion} onClick={() => toggleFAQ(index)}>
            {faq.question}
          </div>
          {openIndex === index && (
            <div className={styles.faqAnswer}>{faq.answer}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQs;
