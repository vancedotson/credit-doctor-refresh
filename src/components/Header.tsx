import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Phone, Mail } from "lucide-react";
import vanceLogo from "@/assets/Vance-Logo-3 (2).png";

interface HeaderProps {
  openForm: () => void;
}

const Header = ({ openForm }: HeaderProps) => {
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
              <Mail className="w-4 h-4" />
              <a href="mailto:info@vancethecreditdoctor.com" className="hover:underline">
                <span>info@vancethecreditdoctor.com</span>
              </a>
            </div>
          </div>
          <div>
            <span>🏆 5-Star Rated Credit Repair Service</span>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="container mx-auto px-6 md:px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="focus:outline-none"
            >
              <img 
                src={vanceLogo} 
                alt="Vance The Credit Doctor Logo" 
                className="h-10 md:h-12 w-auto object-contain hover:opacity-80 transition-opacity cursor-pointer"
              />
            </button>
          </div>


          {/* CTA Buttons */}
          <div className="flex items-center justify-center">
            {/* Mobile: Get Started button that opens form */}
            <Button 
              size="sm"
              className="md:hidden bg-green-600 hover:bg-green-700 text-white px-3 py-2 text-sm"
              onClick={openForm}
            >
              Get Started
            </Button>
            
            {/* Desktop: Free Credit Analysis button that opens form */}
            <Button 
              size="sm"
              className="hidden md:flex bg-green-600 hover:bg-green-700 text-white px-6 py-3 text-base"
              onClick={openForm}
            >
              Free Credit Analysis
            </Button>
          </div>
        </div>
      </nav>
    </motion.header>
  );
};

export default Header;
