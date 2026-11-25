import Hero from '../components/home/Hero.jsx';
import AboutSection from '../components/home/AboutSection.jsx';
import FeaturedProperties from '../components/home/FeaturedProperties.jsx';
import ServicesSection from '../components/home/ServicesSection.jsx';
import WhyHorizon from '../components/home/WhyHorizon.jsx';
import TeamSection from '../components/home/TeamSection.jsx';
import CtaBanner from '../components/home/CtaBanner.jsx';

export default function Home() {
  return (
    <>
      <Hero />
      <AboutSection />
      <FeaturedProperties />
      <ServicesSection />
      <WhyHorizon />
      <TeamSection />
      <CtaBanner />
    </>
  );
}
