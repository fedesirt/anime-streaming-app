import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.tsx';
import Navbar from './components/Navbar.tsx';
import Home from './pages/Home.tsx';
import AnimeDetail from './pages/AnimeDetail.tsx';
import CartoonDetail from './pages/CartoonDetail.tsx';
import Login from './pages/Login.tsx';
import Register from './pages/Register.tsx';
import Favorites from './pages/Favorites.tsx';
import Search from './pages/Search.tsx';
import Donations from './pages/Donations.tsx';
import EpisodePlayer from './pages/EpisodePlayer.tsx';
import FreeContentSection from './components/FreeContentSection.tsx';
import MonetizationDashboard from './pages/MonetizationDashboard.tsx';
import Terms from './pages/Terms.tsx';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-dark-900">
          <Navbar />
          <main className="pt-16">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/anime/:id" element={<AnimeDetail />} />
              <Route path="/cartoon/:id" element={<CartoonDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/search" element={<Search />} />
              <Route path="/donations" element={<Donations />} />
              <Route path="/episode/:episodeId" element={<EpisodePlayer />} />
              <Route path="/free-content" element={<FreeContentSection />} />
              <Route path="/monetization" element={<MonetizationDashboard />} />
              <Route path="/terms" element={<Terms />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App; 