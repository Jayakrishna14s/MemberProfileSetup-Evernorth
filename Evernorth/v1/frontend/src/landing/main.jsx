import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Header from './Header.jsx'
import Hero from './Hero.jsx'
import WhyChoose from './WhyChoose.jsx'
import FAQ from './FAQ.jsx'
import Plans from './Plans.jsx'
import Subscription from './Subscription.jsx'
import Testimonials from './Testimonials.jsx'
import Footer from './Footer.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Hero/>
    <WhyChoose/>
    <FAQ/>
    <Plans/>
    <Subscription/>
    <Testimonials/>
    </StrictMode>,
)
