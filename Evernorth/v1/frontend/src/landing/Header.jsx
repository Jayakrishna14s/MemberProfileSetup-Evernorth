import Footer from '../login/Footer.jsx';
import FeaturedSection from './FeaturedSection.jsx';
import styles from './Header.module.css';
import Headern from './Headern.jsx';
import HealthServicesSection from './HealthServices.jsx';
import Hero from './Hero.jsx';
import Subscription from './Subscription.jsx'
import Testimonials from './Testimonials.jsx'

const Header = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
    
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    return (
        <>
        <Headern/>
        <div className={styles.testimonials}>
            <Testimonials/>
        </div>
        <FeaturedSection/>
        <HealthServicesSection/>
        <div id="Contact">
        <Subscription/>
        </div>
        <Footer/>
        </>
    );
};

export default Header;
