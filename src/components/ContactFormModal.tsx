import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useIsMobile } from "@/hooks/use-mobile";

// Form validation schema
const contactFormSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  streetAddress: z.string().min(1, 'Street address is required'),
  addressLine2: z.string().optional(),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  zip: z.string().min(5, 'Valid zip code is required'),
  message: z.string().optional(),
  newsletterSignup: z.boolean().default(false),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

interface ContactFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactFormModal = ({ isOpen, onClose }: ContactFormModalProps) => {
  const isMobile = useIsMobile();
  const handleClose = () => {
    onClose();
  };
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      newsletterSignup: false
    }
  });

  const onFormSubmit = async (data: ContactFormData) => {
    setSubmitStatus('submitting');
    try {
      // TODO: Replace with actual API endpoint
      console.log('Form data:', data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSubmitStatus('success');
      reset();
      setTimeout(() => {
        handleClose();
        setSubmitStatus('idle');
      }, 2000);
    } catch (error) {
      setSubmitStatus('error');
      console.error('Form submission error:', error);
    }
  };

  // Form content component to avoid duplication
  const FormContent = () => (
    <>
      {submitStatus === 'success' && (
        <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
          Thank you! Your submission has been received!
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          Oh, dear. Something's gone wrong. Please try refreshing the page & giving it another go.
        </div>
      )}

      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
        {/* Row 1: Name Fields (2 columns - 50/50 split) */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <input 
              type="text" 
              placeholder="First Name" 
              className="w-full px-3 py-3 bg-gray-100 border-none rounded text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-colors"
              {...register('firstName')}
            />
            {errors.firstName && (
              <p className="text-red-600 text-sm mt-1">{errors.firstName.message}</p>
            )}
          </div>
          <div>
            <input 
              type="text" 
              placeholder="Last Name" 
              className="w-full px-3 py-3 bg-gray-100 border-none rounded text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-colors"
              {...register('lastName')}
            />
            {errors.lastName && (
              <p className="text-red-600 text-sm mt-1">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        {/* Row 2: Contact Fields (2 columns - 50/50 split) */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <input 
              type="email" 
              placeholder="Email" 
              className="w-full px-3 py-3 bg-gray-100 border-none rounded text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-colors"
              {...register('email')}
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>
          <div>
            <input 
              type="tel" 
              placeholder="Phone" 
              className="w-full px-3 py-3 bg-gray-100 border-none rounded text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-colors"
              {...register('phone')}
            />
            {errors.phone && (
              <p className="text-red-600 text-sm mt-1">{errors.phone.message}</p>
            )}
          </div>
        </div>

        {/* Row 3: Address Field (1 column - full width) */}
        <div>
          <input 
            type="text" 
            placeholder="Street Address" 
            className="w-full px-3 py-3 bg-gray-100 border-none rounded text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-colors"
            {...register('streetAddress')}
          />
          {errors.streetAddress && (
            <p className="text-red-600 text-sm mt-1">{errors.streetAddress.message}</p>
          )}
        </div>

        {/* Row 4: Address Line 2 (1 column - full width) */}
        <div>
          <input 
            type="text" 
            placeholder="Address Line 2 (optional)" 
            className="w-full px-3 py-3 bg-gray-100 border-none rounded text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-colors"
            {...register('addressLine2')}
          />
        </div>

        {/* Row 5: Location Fields (3 columns - 33/33/33 split) */}
        <div className="grid grid-cols-3 gap-2">
          <div>
            <input 
              type="text" 
              placeholder="City" 
              className="w-full px-3 py-3 bg-gray-100 border-none rounded text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-colors"
              {...register('city')}
            />
            {errors.city && (
              <p className="text-red-600 text-sm mt-1">{errors.city.message}</p>
            )}
          </div>
          <div>
            <input 
              type="text" 
              placeholder="State" 
              className="w-full px-3 py-3 bg-gray-100 border-none rounded text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-colors"
              {...register('state')}
            />
            {errors.state && (
              <p className="text-red-600 text-sm mt-1">{errors.state.message}</p>
            )}
          </div>
          <div>
            <input 
              type="text" 
              placeholder="Zip" 
              className="w-full px-3 py-3 bg-gray-100 border-none rounded text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-colors"
              {...register('zip')}
            />
            {errors.zip && (
              <p className="text-red-600 text-sm mt-1">{errors.zip.message}</p>
            )}
          </div>
        </div>

        {/* Row 6: Message Field (1 column - full width) */}
        <div>
          <textarea 
            placeholder="Your message..." 
            rows={4}
            className="w-full px-3 py-3 bg-gray-100 border-none rounded text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-colors resize-none"
            {...register('message')}
          />
        </div>

        {/* Newsletter Checkbox */}
        <div>
          <label className="flex items-start gap-3">
            <input 
              type="checkbox" 
              {...register('newsletterSignup')}
              className="mt-1 text-blue-600"
            />
            <span className="text-sm text-gray-700">
              Sign up for newsletters and special promotions
            </span>
          </label>
        </div>

        {/* Submit Button */}
        <div>
          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-bold py-4 px-6 text-base uppercase tracking-wide transition-all duration-200"
            disabled={isSubmitting || submitStatus === 'submitting'}
          >
            {submitStatus === 'submitting' ? 'SUBMITTING...' : 'SUBMIT'}
          </Button>
        </div>
      </form>
    </>
  );

  if (isMobile) {
    // Mobile: Use Sheet (bottom drawer)
    return (
      <Sheet open={isOpen} onOpenChange={handleClose}>
        <SheetContent 
          side="bottom" 
          className="h-[95vh] w-full rounded-t-xl p-0 overflow-y-auto flex flex-col"
        >
          <SheetHeader className="p-6 border-b bg-white sticky top-0 z-10">
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
          <div className="p-6 pb-8 flex-1 overflow-y-auto">
            <FormContent />
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  // Desktop: Use Dialog (centered modal with backdrop blur)
  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl w-full max-h-[95vh] overflow-y-auto p-0">
        <DialogHeader className="p-6 border-b bg-white sticky top-0 z-10">
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
        <div className="p-6 pb-8">
          <FormContent />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactFormModal;
