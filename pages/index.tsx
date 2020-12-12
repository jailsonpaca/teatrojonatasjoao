import { useEffect } from 'react';
import Header from '../components/Header';
import HeroHome from '../components/HeroHome';
import FeaturesHome from '../components/Features';
import FeaturesBlocks from '../components/FeaturesBlocks';
import Testimonials from '../components/Testimonials';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';
import { useRouter } from 'next/router';
import AOS from 'aos';
import { focusHandling } from '../components/cruip-js-toolkit';
//import '../css/tailwind.css';

export default function Home() {

  const location = useRouter();

  useEffect(() => {
    AOS.init({
      once: true,
      disable: 'phone',
      duration: 700,
      easing: 'ease-out-cubic',
    });
  });

  useEffect(() => {
    if (document !== null && document.querySelector('html') !== null) {
      document.querySelector('html')!.style.scrollBehavior = 'auto';
      window.scroll({ top: 0 })
      document.querySelector('html')!.style.scrollBehavior = ''
    }
    focusHandling('outline');
  }, [location.pathname]); // triggered on route change
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">

      {/*  Site header */}
      <Header />

      {/*  Page content */}
      <main className="flex-grow">

        {/*  Page sections */}
        <HeroHome />
        <FeaturesHome />
        <FeaturesBlocks />
        <Testimonials />
        <Newsletter />

      </main>

      {/*  Site footer */}
      <Footer />

    </div>
  )
}
