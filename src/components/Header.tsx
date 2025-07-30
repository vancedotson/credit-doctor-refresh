import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, Mail } from "lucide-react";
import vanceLogo from "@/assets/Vance-Logo-3 (2).png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: "Services", href: "#services" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "Free Analysis", href: "#free-analysis" }
  ];

  const handleScrollTo = (href: string) => {
    const element = document.querySelector(href) as HTMLElement;
    if (element) {
      const headerHeight = 120; // Account for fixed header height (top bar + nav)
      const elementPosition = element.offsetTop - headerHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-border"
    >
      {/* Top contact bar */}
      <div className="bg-primary text-primary-foreground py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <a href="tel:4054067323" className="hover:underline">
                <span>(405) 406-7323</span>
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <a href="mailto:info@vancethecreditdoctor.com" className="hover:underline">
                <span>info@vancethecreditdoctor.com</span>
              </a>
            </div>
          </div>
          <div className="hidden md:block">
            <span>🏆 5-Star Rated Credit Repair Service</span>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="container mx-auto px-4 py-4">
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
                className="h-12 w-auto object-contain hover:opacity-80 transition-opacity cursor-pointer"
              />
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => handleScrollTo(item.href)}
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => window.location.href = 'tel:4054067323'}
            >
              <Phone className="w-4 h-4 mr-2" />
              Call Now
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden mt-4 pb-4 border-t border-border"
          >
            <div className="flex flex-col gap-4 mt-4">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleScrollTo(item.href)}
                  className="text-foreground hover:text-primary transition-colors font-medium py-2 text-left"
                >
                  {item.name}
                </button>
              ))}
              <div className="flex flex-col gap-3 mt-4">
                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => window.location.href = 'tel:4054067323'}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  (405) 406-7323
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </nav>
    </motion.header>
  );
};

export default Header;
