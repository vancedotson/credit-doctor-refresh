import { useEffect, useState, useRef } from "react";
import { X } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useIsMobile } from "@/hooks/use-mobile";

interface ContactFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactFormModal = ({ isOpen, onClose }: ContactFormModalProps) => {
  const isMobile = useIsMobile();
  const [availableHeight, setAvailableHeight] = useState<number>(643);
  const headerRef = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    onClose();
  };

  // Calculate available height for mobile
  const calculateAvailableHeight = () => {
    if (!isMobile || !headerRef.current) return;
    
    const viewportHeight = window.innerHeight;
    const headerHeight = headerRef.current.offsetHeight;
    const safePadding = 20; // Account for safe areas and padding
    
    const calculatedHeight = Math.max(
      viewportHeight - headerHeight - safePadding,
      400 // Minimum height to ensure form is usable
    );
    
    setAvailableHeight(calculatedHeight);
  };

  // Update height when modal opens or window resizes
  useEffect(() => {
    if (!isOpen || !isMobile) return;

    const updateHeight = () => {
      // Small delay to ensure DOM is ready
      setTimeout(calculateAvailableHeight, 100);
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    window.addEventListener('orientationchange', updateHeight);

    return () => {
      window.removeEventListener('resize', updateHeight);
      window.removeEventListener('orientationchange', updateHeight);
    };
  }, [isOpen, isMobile]);

  // Load the LeadConnector form embed script
  useEffect(() => {
    if (isOpen) {
      // Check if script is already loaded
      const existingScript = document.querySelector('script[src="https://link.msgsndr.com/js/form_embed.js"]');
      
      if (!existingScript) {
        const script = document.createElement('script');
        script.src = 'https://link.msgsndr.com/js/form_embed.js';
        script.async = true;
        document.head.appendChild(script);
      }
    }
  }, [isOpen]);

  // Form content component
  const FormContent = () => {
    const dynamicHeight = isMobile ? availableHeight : 643;
    
    return (
      <div 
        className="w-full h-full"
        style={{ 
          minHeight: `${dynamicHeight}px`,
          maxHeight: isMobile ? `${availableHeight}px` : 'none'
        }}
      >
        <iframe
          src="https://api.leadconnectorhq.com/widget/form/kPIRCwjYHeZuE3cdyjuk"
          style={{
            width: '100%',
            height: '100%',
            minHeight: `${dynamicHeight}px`,
            maxHeight: isMobile ? `${availableHeight}px` : 'none',
            border: 'none',
            borderRadius: '3px'
          }}
          id="inline-kPIRCwjYHeZuE3cdyjuk"
          data-layout="{'id':'INLINE'}"
          data-trigger-type="alwaysShow"
          data-trigger-value=""
          data-activation-type="alwaysActivated"
          data-activation-value=""
          data-deactivation-type="neverDeactivate"
          data-deactivation-value=""
          data-form-name="Form 99"
          data-height={dynamicHeight.toString()}
          data-layout-iframe-id="inline-kPIRCwjYHeZuE3cdyjuk"
          data-form-id="kPIRCwjYHeZuE3cdyjuk"
          title="Form 99"
        />
      </div>
    );
  };

  if (isMobile) {
    // Mobile: Use Sheet (bottom drawer)
    return (
      <Sheet open={isOpen} onOpenChange={handleClose}>
        <SheetContent 
          side="bottom" 
          className="h-screen w-full rounded-t-xl p-0 flex flex-col"
        >
          <div ref={headerRef} className="sticky top-0 z-10 flex-shrink-0">
            <SheetHeader className="p-6 border-b bg-white">
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <SheetTitle className="text-xl font-bold text-gray-900 text-center">
                    RECEIVE YOUR <span className="text-blue-600">FREE CREDIT</span> ANALYSIS
                  </SheetTitle>
                </div>
                <button
                  onClick={handleClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </SheetHeader>
          </div>
          <div className="flex-1 overflow-y-auto overflow-x-hidden">
            <FormContent />
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  // Desktop: Use Dialog (centered modal with backdrop blur)
  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl w-full max-h-screen overflow-hidden p-0 flex flex-col">
        <DialogHeader className="p-6 border-b bg-white sticky top-0 z-10 flex-shrink-0">
          <div className="flex justify-between items-center">
            <div className="flex-1">
              <DialogTitle className="text-xl font-bold text-gray-900 text-center">
                RECEIVE YOUR <span className="text-blue-600">FREE CREDIT</span> ANALYSIS
              </DialogTitle>
            </div>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </DialogHeader>
        <div className="flex-1 overflow-hidden">
          <FormContent />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactFormModal;
