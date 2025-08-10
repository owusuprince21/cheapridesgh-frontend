import Hero from '@/components/Hero';
import CarCarousel from '@/components/CarCarousel';
import RecentCars from '@/components/RecentCars';
import Footer from '@/components/Footer';
import Testimonials from '@/components/Testimonials';

export default function Home() {
  return (
    <div>
      <Hero />
      <CarCarousel />
      <RecentCars />
      <Testimonials />
      <Footer />
    </div>
  );
}