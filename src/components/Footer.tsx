import vanceLogoWhite from "@/assets/Vance-Logo white.png";

interface FooterProps {
  openForm?: () => void;
}

const Footer = ({ openForm }: FooterProps) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-6">
          <img 
            src={vanceLogoWhite} 
            alt="Vance The Credit Doctor Logo" 
            className="h-16 w-auto object-contain"
          />
          <p className="text-white/85 text-sm text-center">
            © {currentYear} Vance The Credit Doctor. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
