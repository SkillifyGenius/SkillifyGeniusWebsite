import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Courses from './pages/Courses';
import Trial from './pages/Trial';
import Resources from './pages/Resources';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import BlogAdmin from './pages/BlogAdmin';
import Admin from './pages/Admin';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppLayout />
    </Router>
  );
}

const AppLayout = () => {
  const { pathname } = useLocation();
  const isAdminRoute = pathname === '/admin' || pathname === '/blogUpdate';

  if (isAdminRoute) {
    return (
      <Routes>
        <Route path="/blogUpdate" element={<BlogAdmin />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    );
  }

  return (
    <div className="app-wrapper">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/trial" element={<Trial />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
