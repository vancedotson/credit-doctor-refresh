import { useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import SimpleHeader from "@/components/SimpleHeader";
import Footer from "@/components/Footer";

const ThankYou = () => {
  // Placeholder function for Footer prop - could redirect back to home page
  const openForm = () => {
    // Navigate to home page where the form is available
    window.location.href = '/';
  };

  useEffect(() => {
    // Track page view
    console.log('Page view: thank_you');
    
    // Check for booking success parameter
    const urlParams = new URLSearchParams(window.location.search);
    const bookingSuccess = urlParams.get('booked') === 'success';
    
    if (bookingSuccess) {
      console.log('Booking confirmed via URL parameter');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white">
      <SimpleHeader />
      
      <main className="container mx-auto px-4 py-12">
        {/* Confirmation Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 mt-16"
        >
          <div className="mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-24 h-24 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle2 className="w-12 h-12 text-white" />
            </motion.div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-green-400 via-blue-500 to-green-400 bg-clip-text text-transparent">
              Congratulations!
            </span>
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
            Your Free Credit Analysis is Booked
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            You've taken the first step toward financial freedom. We're excited to help you transform your credit score and unlock new opportunities.
          </p>
        </motion.div>

        {/* Booking Confirmation Alert */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <Alert className="bg-green-500/10 border-green-500/30 text-green-400">
            <CheckCircle2 className="h-4 w-4" />
            <AlertDescription className="text-lg">
              <strong>Booking Confirmed!</strong> Check your email for appointment details and a calendar invite. 
              If you don't see it in your inbox, please check your spam folder.
            </AlertDescription>
          </Alert>
        </motion.div>
      </main>

      <Footer openForm={openForm} />
    </div>
  );
};

export default ThankYou;
