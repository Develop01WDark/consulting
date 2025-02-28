import './App.css'
import './styles/index.scss'
import Header from './components/layout/header'
import BannerSlider from './components/banner/banner-slider'
import AboutUsServices from './components/about-us-services'
import Certifications from './components/certifications'
import ContactUsCourses from './components/contact-us-courses'
import BannerDisruptivo from './components/banner-disruptivo'
import HowItWork from './components/how-it-works'
import ContactUs from './components/contact-us'
import Allies from './components/allies'
import Footer from './components/layout/footer'

function App() {
  return (
    <>
      <Header/>
      <main>
        <BannerSlider/> 
        <AboutUsServices/>
        <Certifications/>
        <ContactUsCourses/>
        <BannerDisruptivo/>
        <HowItWork/>
        <ContactUs/>
        <Allies/>
      </main>
        <Footer/>
    </>
  )
}

export default App
