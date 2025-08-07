import { useEffect, useState } from "react";
import SimpleHeader from "@/components/SimpleHeader";
import Footer from "@/components/Footer";

const Application = () => {
  const [scriptLoaded, setScriptLoaded] = useState(false);

  // Placeholder function for Footer prop
  const openForm = () => {
    // Since this page is already the application form, we could scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    // Fix any potential overflow issues from previous pages
    document.body.style.overflow = 'unset';
    
    // Track page view for analytics
    console.log('Page view: application');

    // Check if script is already loaded
    const existingScript = document.querySelector('script[src="https://link.msgsndr.com/js/form_embed.js"]');
    
    if (!existingScript) {
      // Load the required script for the form
      const script = document.createElement('script');
      script.src = 'https://link.msgsndr.com/js/form_embed.js';
      script.async = false; // Load synchronously to reduce flashing
      script.onload = () => setScriptLoaded(true);
      document.head.appendChild(script);
    } else {
      setScriptLoaded(true);
    }

    // Cleanup script on unmount
    return () => {
      const scriptToRemove = document.querySelector('script[src="https://link.msgsndr.com/js/form_embed.js"]');
      if (scriptToRemove && scriptToRemove.parentNode) {
        scriptToRemove.parentNode.removeChild(scriptToRemove);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white flex flex-col">
      <SimpleHeader />
      
      {/* Main content area - takes up remaining space between header and footer */}
      <main className="flex-1 container mx-auto px-4 pt-32 pb-8">
        <div className="w-full max-w-[100%] md:max-w-[60%] mx-auto h-full min-h-[calc(100vh-12rem)]">
          <iframe
            src="https://api.leadconnectorhq.com/widget/form/V0f4zk5xngMqx9gOQ7hl"
            style={{
              width: "100%",
              height: "100%",
              minHeight: "5816px",
              border: "none",
              borderRadius: "0px"
            }}
            id="inline-V0f4zk5xngMqx9gOQ7hl" 
            data-layout='{"id":"INLINE"}'
            data-trigger-type="alwaysShow"
            data-trigger-value=""
            data-activation-type="alwaysActivated"
            data-activation-value=""
            data-deactivation-type="neverDeactivate"
            data-deactivation-value=""
            data-form-name="Dispute to Sue Contract Form version 2 (Affiliate - $1,000) - "
            data-height="5816"
            data-layout-iframe-id="inline-V0f4zk5xngMqx9gOQ7hl"
            data-form-id="V0f4zk5xngMqx9gOQ7hl"
            title="Dispute to Sue Contract Form version 2 (Affiliate - $1,000) - "
          />
        </div>
      </main>

      <Footer openForm={openForm} />
    </div>
  );
};

export default Application;
