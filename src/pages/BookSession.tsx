import { useEffect } from "react";
import { motion } from "framer-motion";
import { HeroVideoDialog } from "@/components/ui/hero-video-dialog";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
const VanceTutorialVideo = "/Vancetutorial.mp4";
import HeroImage from "@/assets/hero-vance.jpg";

const BookSession = () => {
  // Placeholder function for Footer prop - could redirect to booking calendar
  const openForm = () => {
    // Scroll to calendar section since this page is already for booking
    const calendarSection = document.querySelector('.calendar-container');
    if (calendarSection) {
      calendarSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    // Fix any potential overflow issues from previous pages
    document.body.style.overflow = 'unset';
    
    // Track page view
    console.log('Page view: book_session');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white">
      <Header openForm={openForm} />
      
      <main className="container mx-auto px-4 pt-32">
        {/* Hero Section - Clean and Focused */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Book Your
            <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-green-400 bg-clip-text text-transparent">
              {" "}Free Credit Analysis
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Get a comprehensive 30-minute consultation where we'll analyze your credit report, 
            identify deletion opportunities, and create a personalized action plan.
          </p>
        </motion.div>

        {/* Video Section with HeroVideoDialog */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-2xl mx-auto mb-8"
        >
          <HeroVideoDialog
            animationStyle="from-center"
            videoSrc={VanceTutorialVideo}
            thumbnailSrc={HeroImage}
            thumbnailAlt="Vance Credit Repair Training Video"
            className="rounded-lg shadow-2xl border border-gray-600"
          />
        </motion.div>
      </main>

      <Footer openForm={openForm} />
    </div>
  );
};

export default BookSession;
