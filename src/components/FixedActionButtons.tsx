import { Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FixedActionButtonsProps {
  onFormOpen: () => void;
}

const FixedActionButtons = ({ onFormOpen }: FixedActionButtonsProps) => {
  const handlePhoneCall = () => {
    window.location.href = 'tel:4054067323';
  };

  return (
    <div className="fixed-action-navbar bg-white border-t border-gray-200 shadow-lg">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Free Credit Analysis Button */}
        <Button
          onClick={onFormOpen}
          className="flex-1 mr-2 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-medium"
          size="sm"
        >
          Free Credit Analysis
        </Button>

        {/* Phone Icon Button */}
        <Button
          onClick={handlePhoneCall}
          variant="outline"
          size="sm"
          className="mx-1 p-3 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
        >
          <Phone className="w-5 h-5" />
        </Button>

        {/* Message Icon Button */}
        <Button
          onClick={onFormOpen}
          variant="outline"
          size="sm"
          className="ml-1 p-3 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
        >
          <MessageCircle className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};

export default FixedActionButtons;
