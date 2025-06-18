import React from 'react';
import Navbar from './features/navbar/navbar';
import Footer from './features/footer/footer';
import { Outlet } from 'react-router-dom';
import './shared_components/global_styles.scss';

const MainLayout = () => {
  return (
    <div className="page-layout">
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;