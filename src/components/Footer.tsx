import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram,
  Star,
  ArrowRight
} from "lucide-react";
import vanceLogoWhite from "@/assets/Vance-Logo white.png";

interface FooterProps {
  openForm?: () => void;
}

const Footer = ({ openForm }: FooterProps) => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      "Credit Report Analysis",
      "Score Improvement", 
      "Debt Validation",
      "Credit Monitoring",
      "Identity Protection"
    ],
    resources: [
      "How Credit Works",
      "Credit Tips & Guides",
      "FAQ",
      "Success Stories",
      "Free Credit Analysis"
    ],
    legal: [
      "Privacy Policy",
      "Terms of Service", 
      "Compliance",
      "Sitemap"
    ]
  };

  return (
    <footer className="bg-black text-white">
      {/* CTA Section */}
      <div id="free-analysis" className="bg-black py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-white">
              Ready To Transform <br className="md:hidden" />Your Credit Score?
            </h2>
            <p className="text-xl text-white/95 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied clients who have gotten deletions<br />
              and unlocked better financial opportunities.
            </p>
            <div className="flex justify-center">
              <Button 
                size="lg" 
                className="text-lg px-8 py-6 bg-white text-primary hover:bg-white/90"
                onClick={openForm}
              >
                Get Free Credit Analysis
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
            
            <div className="flex justify-center items-center gap-2 mt-8 text-white/80">
              <div className="flex">
                {[1,2,3,4,5].map((star) => (
                  <Star key={star} className="w-5 h-5 fill-warning text-warning" />
                ))}
              </div>
              <span>Trusted by 2,000+ Happy Clients</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="bg-black py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Company Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="mb-6">
                <img 
                  src={vanceLogoWhite} 
                  alt="Vance The Credit Doctor Logo" 
                  className="h-16 w-auto object-contain"
                />
              </div>
              <p className="text-white/90 mb-6">
                Professional credit repair services helping you achieve financial freedom 
                through deletions and expert guidance.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5" />
                  <a href="mailto:info@vancethecreditdoctor.com" className="hover:underline">
                    <span>info@vancethecreditdoctor.com</span>
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5" />
                  <span>Tulsa, Oklahoma</span>
                </div>
              </div>
            </motion.div>

            {/* Legal & Social */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold mb-6">Legal</h4>
              <ul className="space-y-3 mb-8">
                {footerLinks.legal.map((link, index) => (
                  <li key={index}>
                    <a href="#" className="text-white/85 hover:text-white transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
              
              <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-black/90 py-6 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-center items-center gap-4">
            <p className="text-white/85 text-sm">
              © {currentYear} Vance The Credit Doctor. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
