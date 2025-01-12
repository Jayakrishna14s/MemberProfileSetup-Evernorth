import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap styles are available
import { BACKEND_URL } from "../config";

const Testimonials = () => {
  return (
    <div style={styles.container}>
      <div style={styles.textContainer}>
        <h1 style={styles.heading}>
          Innovation in health care means nothing if no one can afford it.
        </h1>
        <p style={styles.description}>
          Evernorth brings the power of wonder and relentless innovation to
          create world-class pharmacy, care, and benefit solutions. Our
          connected health services make the treatment, prediction, and
          prevention of health care’s most complex conditions easier and more
          accessible as we drive organizations and people forward.
        </p>
        <a href="#" style={styles.link}>
          See the Evernorth difference
        </a>
      </div>
      <div style={styles.imageContainer}>
        <img
          src="https://res.cloudinary.com/dmdiia2yv/image/upload/v1731490878/family_together_u6w70h.avif" // Replace with the actual image URL or import statement
          alt="Family smiling together"
          style={styles.image}
        />
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    padding: "50px",
    fontFamily: "Arial, sans-serif",
  },
  textContainer: {
    flex: 1,
    paddingRight: "20px",
  },
  heading: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    color: "#333",
  },
  description: {
    fontSize: "1rem",
    color: "#555",
    lineHeight: "1.5",
    margin: "20px 0",
  },
  link: {
    color: "#0073e6",
    textDecoration: "none",
    fontWeight: "bold",
  },
  imageContainer: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    borderRadius: "10px",
  },
};

export default Testimonials;
