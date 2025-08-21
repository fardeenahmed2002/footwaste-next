import DonationPage from './components/DonationPage.jsx';
import Footer from "./components/Footer.jsx";
import AboutUs from "./pages/home/AboutUs.jsx";
import ContactUs from "./pages/home/ContactUs.jsx";
import FreeFoodDonation from './pages/home/FreeFoodDonation.jsx';
import Hero from './pages/home/Hero.jsx';
import JoinUs from "./pages/home/JoinUs.jsx";
import Problem from "./pages/home/Problem.jsx";
import StatusStats from './pages/home/StatusStats.jsx';
import Steps from "./pages/home/Steps.jsx";
import Tips from "./pages/home/Tips.jsx";
export default function page() {
  return (
    <div>

      <Hero />
      <DonationPage />
      <FreeFoodDonation /> <br />
      <Problem />
      <AboutUs />
      <Steps />
      <JoinUs />
      <Tips />
      <ContactUs />
      <StatusStats />
      <Footer />
    </div>
  )
}
