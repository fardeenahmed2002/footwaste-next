import Hero from './pages/home/Hero.jsx'
import Problem from "./pages/home/Problem.jsx";
import AboutUs from "./pages/home/AboutUs.jsx";
import Steps from "./pages/home/Steps.jsx";
import JoinUs from "./pages/home/JoinUs.jsx";
import Tips from "./pages/home/Tips.jsx";
import ContactUs from "./pages/home/ContactUs.jsx";
import Footer from "./components/Footer.jsx";
import StatusStats from './pages/home/StatusStats.jsx';

export default function page() {
  return (
    <div>
      <Hero />
      <Problem/>
      <AboutUs/>
      <Steps/>
      <JoinUs/>
      <Tips/>
      <ContactUs/>
      <StatusStats/>
      <Footer/>
    </div>
  );
}
