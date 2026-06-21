import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import Features from '@/components/Features';
import CustomScrollbar from '@/components/CustomScrollbar';
import Technologies from '@/components/Technologies';
import Publications from '@/components/Publications';
import ChatWithMe from '@/components/ChatWithMe';
import DeveloperStats from '@/components/DeveloperStats';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <CustomScrollbar />
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <DeveloperStats />
        <Technologies />
        <About />
        <Features />
        <Projects />
        <Publications />
        <Contact />
      </main>
      <Footer />
      <ChatWithMe />
    </div>
  );
};

export default Index;
