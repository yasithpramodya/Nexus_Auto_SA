import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import WhatWeOffer from './pages/WhatWeOffer.jsx';
import VehicleDetails from './pages/VehicleDetails.jsx';
import About from './pages/About.jsx';
import RequestCar from './pages/RequestCar.jsx';
import Contact from './pages/Contact.jsx';
import Admin from './pages/Admin.jsx';
import NotFound from './pages/NotFound.jsx';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vehicles" element={<WhatWeOffer />} />
          <Route path="/stock" element={<WhatWeOffer />} />
          <Route path="/vehicles/:id" element={<VehicleDetails />} />
          <Route path="/what-we-offer" element={<WhatWeOffer />} />
          <Route path="/about" element={<About />} />
          <Route path="/request-a-car" element={<RequestCar />} />
          <Route path="/request" element={<RequestCar />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />

        </Routes>
      </main>
      <Footer />
    </>
  );
}
