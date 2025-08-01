import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Footer from "@/components/Footer";
import FixedActionButtons from "@/components/FixedActionButtons";
import ContactFormModal from "@/components/ContactFormModal";

const Index = () => {
  const [showForm, setShowForm] = useState(false);

  const openForm = () => {
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
  };

  return (
    <div className="min-h-screen">
      <Header openForm={openForm} />
      <main>
        <Hero showForm={showForm} openForm={openForm} closeForm={closeForm} />
        <Services openForm={openForm} />
      </main>
      <Footer openForm={openForm} />
      
      {/* Fixed Action Buttons - Mobile Only */}
      {!showForm && <FixedActionButtons onFormOpen={openForm} />}
      
      {/* Contact Form Modal */}
      <ContactFormModal isOpen={showForm} onClose={closeForm} />
    </div>
  );
};

export default Index;
