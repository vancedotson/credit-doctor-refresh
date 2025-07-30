import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Footer from "@/components/Footer";

const Index = () => {
  const [showForm, setShowForm] = useState(false);

  const openForm = () => {
    setShowForm(true);
    document.body.style.overflow = 'hidden';
  };

  const closeForm = () => {
    setShowForm(false);
    document.body.style.overflow = 'unset';
  };

  return (
    <div className="min-h-screen">
      <Header openForm={openForm} />
      <main>
        <Hero showForm={showForm} openForm={openForm} closeForm={closeForm} />
        <Services />
        <Process />
      </main>
      <Footer openForm={openForm} />
    </div>
  );
};

export default Index;
