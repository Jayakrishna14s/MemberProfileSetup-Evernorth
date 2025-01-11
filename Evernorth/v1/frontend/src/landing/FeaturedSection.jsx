import React from 'react';

const FeaturedSection = () => {
  return (
    <div style={styles.container}>
      <div style={styles.textContainer}>
        <p style={styles.featuredText}>FEATURED</p>
        <h2 style={styles.heading}>
          Transforming oncology care through a holistic, patient-centric, and consultative approach
        </h2>
        <p style={styles.description}>
          Evernorth Health Services has introduced Evernorth Oncology Benefit Services, which will be 
          available to eligible commercial plan sponsors in 2025, with plans to expand over time.
        </p>
        <a href="#" style={styles.link}>Read more</a>
      </div>
      <div style={styles.imageContainer}>
        <img 
          src="https://res.cloudinary.com/dmdiia2yv/image/upload/v1731491046/oncology_care_pg506x.webp" // Replace with the actual image URL or path
          alt="Oncology Care"
          style={styles.image}
        />
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: '40px',
    fontFamily: 'Arial, sans-serif',
  },
  textContainer: {
    flex: 1,
    paddingRight: '20px',
  },
  featuredText: {
    fontSize: '0.9rem',
    fontWeight: 'bold',
    color: '#888',
    letterSpacing: '0.05em',
  },
  heading: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#333',
    lineHeight: '1.2',
    margin: '10px 0',
  },
  description: {
    fontSize: '1rem',
    color: '#555',
    lineHeight: '1.5',
    margin: '20px 0',
  },
  link: {
    color: '#0073e6',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    width: '100%',
    borderRadius: '8px',
  },
};

export default FeaturedSection;
