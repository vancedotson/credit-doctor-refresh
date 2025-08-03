import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import vanceLogo from "@/assets/Vance-Logo-3 (2).png";

const SimpleHeader = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-border w-full"
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        transform: 'none'
      }}
    >
      {/* Top contact bar - Desktop only */}
      <div className="hidden md:block bg-primary text-primary-foreground py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <a href="tel:+14054067323" className="hover:underline">
                <span>(405) 406-7323</span>
              </a>
            </div>
          </div>
          <div>
            <span>🏆 5-Star Rated Credit Repair Service</span>
          </div>
        </div>
      </div>

      {/* Main navigation - Centered Logo */}
      <nav className="container mx-auto px-6 md:px-4 py-4">
        <div className="flex items-center justify-center">
          {/* Centered Logo */}
          <div className="flex items-center">
            <button
              onClick={() => window.location.href = '/'}
              className="focus:outline-none"
            >
              <img 
                src={vanceLogo} 
                alt="Vance The Credit Doctor Logo" 
                className="h-10 md:h-12 w-auto object-contain hover:opacity-80 transition-opacity cursor-pointer"
              />
            </button>
          </div>
        </div>
      </nav>
    </motion.header>
  );
};

export default SimpleHeader;
