import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Shield, Users, Star, CheckCircle2, Phone, Play, Pause, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const BookSession = () => {
  const [isCalendarLoaded, setIsCalendarLoaded] = useState(false);
  const [calendarError, setCalendarError] = useState<string | null>(null);
  const [showVSL, setShowVSL] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [leadData, setLeadData] = useState<any>(null);
  const location = useLocation();

  // Placeholder function for Footer prop - could redirect to booking calendar
  const openForm = () => {
    // Scroll to calendar section since this page is already for booking
    const calendarSection = document.querySelector('.calendar-container');
    if (calendarSection) {
      calendarSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    // Fix any potential overflow issues from previous pages
    document.body.style.overflow = 'unset';
    
    // Track page view
    console.log('Page view: book_session');
    
    // Load GoHighLevel script
    const script = document.createElement('script');
    script.src = 'https://link.msgsndr.com/js/form_embed.js';
    script.async = true;
    script.onload = () => {
      setIsCalendarLoaded(true);
      console.log('GoHighLevel script loaded successfully');
    };
    script.onerror = () => {
      setCalendarError('Failed to load booking calendar');
      console.error('GoHighLevel script failed to load');
    };
    document.body.appendChild(script);

    return () => {
      // Cleanup script on unmount
      const existingScript = document.querySelector('script[src="https://link.msgsndr.com/js/form_embed.js"]');
      if (existingScript && document.body.contains(existingScript)) {
        document.body.removeChild(existingScript);
      }
    };
  }, []);

  const trustSignals = [
    {
      icon: Shield,
      title: "100% Secure",
      description: "Your information is protected with bank-level security"
    },
    {
      icon: Clock,
      title: "30-Minute Call",
      description: "Free comprehensive credit analysis and strategy session"
    },
    {
      icon: Users,
      title: "Trusted by 1000+",
      description: "Successfully helped over 1,000 clients get deletions"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      score: "740",
      text: "Vance helped me increase my credit score by 180 points in just 6 months!",
      rating: 5
    },
    {
      name: "Mike Rodriguez", 
      score: "720",
      text: "Professional, knowledgeable, and results-driven. Highly recommend!",
      rating: 5
    },
    {
      name: "Jennifer Smith",
      score: "680",
      text: "Finally got approved for my dream home thanks to Vance's expertise.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white">
      <Header openForm={openForm} />
      
      <main className="container mx-auto px-4 pt-32">
        {/* Hero Section - Clean and Focused */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Book Your
            <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-green-400 bg-clip-text text-transparent">
              {" "}Free Credit Analysis
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Get a comprehensive 30-minute consultation where we'll analyze your credit report, 
            identify deletion opportunities, and create a personalized action plan.
          </p>
        </motion.div>

        {/* VSL Section - Moved to top */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-600">
            <CardHeader>
              <CardTitle className="text-2xl lg:text-3xl text-white text-center mb-2 max-w-4xl mx-auto leading-tight">
                Watch: The Credit Repair Secret <br />
                That Banks Don't Want You to Know
              </CardTitle>
              <p className="text-gray-200 text-center text-lg max-w-3xl mx-auto">
                Discover the proven 3-step system that has helped <br />
                over 1,000 clients increase their credit scores by 100+ points
              </p>
            </CardHeader>
            <CardContent className="p-8">
              {showVSL ? (
                <div className="space-y-6">
                  <div className="relative w-full h-96 bg-black rounded-lg flex items-center justify-center border border-gray-600">
                    {!isVideoPlaying && (
                      <button
                        onClick={() => setIsVideoPlaying(true)}
                        className="absolute inset-0 z-10 flex items-center justify-center group cursor-pointer"
                      >
                        <div className="bg-black/70 hover:bg-black/80 rounded-full p-6 transition-all duration-300 group-hover:scale-110 shadow-2xl">
                          <Play className="w-16 h-16 text-white fill-white" />
                        </div>
                      </button>
                    )}
                    <div className="text-center text-gray-400">
                      <Volume2 className="w-16 h-16 mx-auto mb-4 text-blue-400" />
                      <h3 className="text-xl font-semibold text-white mb-2">Exclusive Credit Repair Training</h3>
                      <p className="text-gray-400 mb-4">Learn the insider strategies that credit repair companies charge thousands for</p>
                      <p className="text-sm text-gray-500">(Video player integration needed)</p>
                    </div>
                  </div>
                  
                  {isVideoPlaying && (
                    <div className="flex justify-center space-x-4">
                      <Button 
                        onClick={() => setIsVideoPlaying(false)}
                        className="bg-blue-600 hover:bg-blue-700 text-white border-0 px-6 py-3"
                      >
                        <Pause className="w-4 h-4 mr-2" />
                        Pause Video
                      </Button>
                    </div>
                  )}
                  
                  {/* Step Progress Badges - Moved inside video section */}
                  <div className="flex items-center justify-center space-x-4 py-4 bg-gray-800/30 rounded-lg">
                    <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
                      <CheckCircle2 className="w-4 h-4 mr-1" />
                      Step 1: Learn About Our Services
                    </Badge>
                    <Separator orientation="vertical" className="h-6 bg-blue-500" />
                    <Badge className="bg-blue-500 text-white">
                      Step 2: Book Your Free Analysis
                    </Badge>
                    <Separator orientation="vertical" className="h-6 bg-gray-600" />
                    <Badge variant="outline" className="border-gray-600 text-gray-400">
                      Step 3: Get Your Results
                    </Badge>
                  </div>
                  
                  <Alert className="bg-blue-500/10 border-blue-500/30 text-blue-400">
                    <Play className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Important:</strong> This video contains sensitive information about credit repair tactics. 
                      Please watch the entire presentation before booking your consultation.
                    </AlertDescription>
                  </Alert>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="relative">
                    <div className="w-full h-80 bg-gradient-to-br from-blue-500/20 to-green-500/20 rounded-lg border border-gray-600 overflow-hidden">
                      {/* Video thumbnail content */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                        <div className="mb-8">
                          <Volume2 className="w-16 h-16 mx-auto mb-4 text-blue-400" />
                          <h3 className="text-2xl font-semibold text-white mb-2">Ready to Watch?</h3>
                          <p className="text-gray-400">Click the play button to start the exclusive training video</p>
                        </div>
                        
                        {/* Play button positioned below text */}
                        <button
                          onClick={() => setShowVSL(true)}
                          className="group cursor-pointer transition-all duration-300"
                        >
                          <div className="bg-blue-600 hover:bg-blue-700 rounded-full p-6 transition-all duration-300 group-hover:scale-110 shadow-2xl">
                            <Play className="w-16 h-16 text-white fill-white ml-1" />
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Step Progress Badges - Also shown in initial state */}
                  <div className="flex items-center justify-center space-x-4 py-4 bg-gray-800/30 rounded-lg">
                    <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
                      <CheckCircle2 className="w-4 h-4 mr-1" />
                      Step 1: Learn About Our Services
                    </Badge>
                    <Separator orientation="vertical" className="h-6 bg-blue-500" />
                    <Badge className="bg-blue-500 text-white">
                      Step 2: Book Your Free Analysis
                    </Badge>
                    <Separator orientation="vertical" className="h-6 bg-gray-600" />
                    <Badge variant="outline" className="border-gray-600 text-gray-400">
                      Step 3: Get Your Results
                    </Badge>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Value Proposition - Moved after VSL */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mb-12"
        >
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {trustSignals.map((signal, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-600 hover:border-blue-500/50 transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <signal.icon className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                    <CardTitle className="text-lg font-semibold text-white mb-2">{signal.title}</CardTitle>
                    <p className="text-gray-200 text-sm">{signal.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Calendar Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-600">
            <CardHeader>
              <CardTitle className="flex items-center justify-center text-2xl text-white">
                <Calendar className="w-8 h-8 text-blue-400 mr-3" />
                Select Your Appointment Time
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              {calendarError ? (
                <div className="text-center py-12">
                  <Card className="bg-red-500/10 border-red-500/20">
                    <CardContent className="p-6">
                      <CardTitle className="text-lg font-semibold text-red-400 mb-2">
                        Unable to Load Calendar
                      </CardTitle>
                      <p className="text-gray-300 mb-4">{calendarError}</p>
                      <p className="text-gray-400 text-sm mb-4">
                        Don't worry! You can still book your free consultation by calling us directly.
                      </p>
                      <Button 
                        onClick={() => window.location.href = 'tel:4054067323'}
                        size="lg"
                        className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        Call (405) 406-7323
                      </Button>
                    </CardContent>
                  </Card>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setCalendarError(null);
                      window.location.reload();
                    }}
                    className="mt-4 border-gray-600 text-gray-200 hover:bg-gray-800 hover:text-white"
                  >
                    Try Again
                  </Button>
                </div>
              ) : (
                <div className="calendar-container">
                  {!isCalendarLoaded && (
                    <div className="text-center py-12">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                      <p className="text-gray-400">Loading calendar...</p>
                    </div>
                  )}
                  
                  <div className="w-full overflow-auto">
                    <iframe
                      src="https://api.leadconnectorhq.com/widget/booking/wIj3efrLkHV48JTqc2Rs"
                      style={{ 
                        width: '100%', 
                        height: '700px',
                        border: 'none', 
                        borderRadius: '8px'
                      }}
                      scrolling="yes"
                      id={`calendar_${Date.now()}`}
                      onLoad={() => setIsCalendarLoaded(true)}
                      className={isCalendarLoaded ? 'opacity-100' : 'opacity-0'}
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Social Proof Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-6xl mx-auto"
        >
          <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-600">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center text-white mb-2">
                What Our Clients Say
              </CardTitle>
              <p className="text-gray-200 text-center">
                Real results from real people who transformed their credit with our help
              </p>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid md:grid-cols-3 gap-6">
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  >
                    <Card className="bg-gradient-to-br from-gray-700 to-gray-800 border-gray-500 h-full">
                      <CardContent className="p-6">
                        <div className="flex items-center mb-4">
                          <div className="flex text-yellow-400">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-current" />
                            ))}
                          </div>
                          <Badge variant="secondary" className="ml-auto bg-green-500/20 text-green-400 border-green-500/30">
                            Score: {testimonial.score}
                          </Badge>
                        </div>
                        <p className="text-gray-100 mb-4 italic">"{testimonial.text}"</p>
                        <p className="text-blue-400 font-semibold">- {testimonial.name}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Additional Trust Signals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="flex justify-center items-center space-x-8 text-gray-400">
            <div className="flex items-center">
              <Shield className="w-5 h-5 mr-2 text-green-400" />
              <span className="text-sm">Secure & Confidential</span>
            </div>
            <Separator orientation="vertical" className="h-6" />
            <div className="flex items-center">
              <Clock className="w-5 h-5 mr-2 text-blue-400" />
              <span className="text-sm">30-Minute Session</span>
            </div>
            <Separator orientation="vertical" className="h-6" />
            <div className="flex items-center">
              <CheckCircle2 className="w-5 h-5 mr-2 text-green-400" />
              <span className="text-sm">100% Free</span>
            </div>
          </div>
        </motion.div>
      </main>

      <Footer openForm={openForm} />
    </div>
  );
};

export default BookSession;
