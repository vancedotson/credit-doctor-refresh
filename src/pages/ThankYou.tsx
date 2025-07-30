import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Calendar, Clock, Phone, Mail, Play, Pause, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ThankYou = () => {
  const [showVSL, setShowVSL] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // Placeholder function for Footer prop - could redirect back to home page
  const openForm = () => {
    // Navigate to home page where the form is available
    window.location.href = '/';
  };

  useEffect(() => {
    // Track page view
    console.log('Page view: thank_you');
    
    // Check for booking success parameter
    const urlParams = new URLSearchParams(window.location.search);
    const bookingSuccess = urlParams.get('booked') === 'success';
    
    if (bookingSuccess) {
      console.log('Booking confirmed via URL parameter');
    }
  }, []);

  const nextSteps = [
    {
      step: 1,
      title: "Check Your Email",
      description: "You'll receive a confirmation email with your appointment details and a calendar invite.",
      icon: Mail
    },
    {
      step: 2,
      title: "Gather Your Documents",
      description: "Have your recent credit reports ready (we'll help you get them if needed).",
      icon: CheckCircle2
    },
    {
      step: 3,
      title: "Join the Call",
      description: "Use the Zoom link in your confirmation email or call the number provided.",
      icon: Phone
    }
  ];

  const preparationItems = [
    "Recent credit reports from all three bureaus (optional - we can help you get these)",
    "List of any credit cards, loans, or accounts you have questions about",
    "Your financial goals (home purchase, car loan, business funding, etc.)",
    "Notepad and pen to write down our recommendations"
  ];

  const bonusResources = [
    {
      title: "Free Credit Monitoring Guide",
      description: "Learn how to monitor your credit score changes in real-time",
      type: "PDF Guide"
    },
    {
      title: "Credit Dispute Letter Templates",
      description: "Professional templates for disputing incorrect information",
      type: "Template Pack"
    },
    {
      title: "Credit Building Strategies",
      description: "Advanced techniques for building credit quickly and safely",
      type: "Video Training"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white">
      <Header openForm={openForm} />
      
      {/* Progress Indicator */}
      <div className="w-full bg-gray-800/30 py-4 border-b border-gray-700">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-4">
            <div className="flex items-center">
              <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
                <CheckCircle2 className="w-4 h-4 mr-1" />
                Step 1: Learn About Our Services
              </Badge>
            </div>
            <Separator orientation="vertical" className="h-6 bg-green-500" />
            <div className="flex items-center">
              <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
                <CheckCircle2 className="w-4 h-4 mr-1" />
                Step 2: Book Your Free Analysis
              </Badge>
            </div>
            <Separator orientation="vertical" className="h-6 bg-blue-500" />
            <div className="flex items-center">
              <Badge className="bg-blue-500 text-white">
                <CheckCircle2 className="w-4 h-4 mr-1" />
                Step 3: Get Your Results
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12">
        {/* Confirmation Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-24 h-24 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle2 className="w-12 h-12 text-white" />
            </motion.div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-green-400 via-blue-500 to-green-400 bg-clip-text text-transparent">
              Congratulations!
            </span>
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
            Your Free Credit Analysis is Booked
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            You've taken the first step toward financial freedom. We're excited to help you transform your credit score and unlock new opportunities.
          </p>
        </motion.div>

        {/* Booking Confirmation Alert */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <Alert className="bg-green-500/10 border-green-500/30 text-green-400">
            <CheckCircle2 className="h-4 w-4" />
            <AlertDescription className="text-lg">
              <strong>Booking Confirmed!</strong> Check your email for appointment details and a calendar invite. 
              If you don't see it in your inbox, please check your spam folder.
            </AlertDescription>
          </Alert>
        </motion.div>

        {/* Main Content Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-6xl mx-auto mb-16"
        >
          <Tabs defaultValue="next-steps" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-gray-800/50 mb-8">
              <TabsTrigger value="next-steps" className="data-[state=active]:bg-blue-500">
                Next Steps
              </TabsTrigger>
              <TabsTrigger value="preparation" className="data-[state=active]:bg-blue-500">
                How to Prepare
              </TabsTrigger>
              <TabsTrigger value="bonus" className="data-[state=active]:bg-blue-500">
                Bonus Resources
              </TabsTrigger>
            </TabsList>

            <TabsContent value="next-steps">
              <Card className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-2xl text-white flex items-center">
                    <Calendar className="w-6 h-6 text-blue-400 mr-3" />
                    What Happens Next
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-8">
                    {nextSteps.map((step, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                        className="flex items-start space-x-4"
                      >
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                            {step.step}
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-white mb-2 flex items-center">
                            <step.icon className="w-5 h-5 text-blue-400 mr-2" />
                            {step.title}
                          </h3>
                          <p className="text-gray-300">{step.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="preparation">
              <Card className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-2xl text-white flex items-center">
                    <CheckCircle2 className="w-6 h-6 text-blue-400 mr-3" />
                    How to Prepare for Your Call
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <p className="text-gray-300 mb-6 text-lg">
                    To make the most of your 30-minute consultation, here's what you can prepare:
                  </p>
                  <div className="space-y-4">
                    {preparationItems.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                        className="flex items-start space-x-3"
                      >
                        <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                        <p className="text-gray-300">{item}</p>
                      </motion.div>
                    ))}
                  </div>
                  <Alert className="mt-8 bg-blue-500/10 border-blue-500/30 text-blue-400">
                    <Clock className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Don't worry if you don't have everything!</strong> We can help you get your credit reports during our call and guide you through the entire process.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="bonus">
              <Card className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-2xl text-white flex items-center">
                    <CheckCircle2 className="w-6 h-6 text-blue-400 mr-3" />
                    Exclusive Bonus Resources
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <p className="text-gray-300 mb-8 text-lg">
                    As a thank you for booking your consultation, here are some valuable resources to get you started:
                  </p>
                  <div className="grid md:grid-cols-3 gap-6">
                    {bonusResources.map((resource, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                      >
                        <Card className="bg-gradient-to-br from-gray-700/30 to-gray-800/30 border-gray-600 h-full hover:border-blue-500/50 transition-all duration-300">
                          <CardContent className="p-6">
                            <Badge variant="secondary" className="mb-4 bg-blue-500/20 text-blue-400 border-blue-500/30">
                              {resource.type}
                            </Badge>
                            <h3 className="text-lg font-semibold text-white mb-2">{resource.title}</h3>
                            <p className="text-gray-400 text-sm mb-4">{resource.description}</p>
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="w-full border-gray-600 text-gray-300 hover:bg-gray-800"
                            >
                              Download Now
                            </Button>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* VSL Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <Card className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 border-gray-700">
            <CardHeader>
              <CardTitle className="text-2xl text-white text-center">
                Watch: The #1 Credit Repair Secret
              </CardTitle>
              <p className="text-gray-400 text-center">
                Learn the insider strategy that helped our clients increase their scores by 100+ points
              </p>
            </CardHeader>
            <CardContent className="p-8">
              {!showVSL ? (
                <div className="text-center">
                  <div className="relative mb-6">
                    <div className="w-full h-64 bg-gradient-to-br from-blue-500/20 to-green-500/20 rounded-lg flex items-center justify-center border border-gray-600">
                      <div className="text-center">
                        <Play className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-white mb-2">Exclusive Video Training</h3>
                        <p className="text-gray-400">15-minute masterclass on credit optimization</p>
                      </div>
                    </div>
                  </div>
                  <Button 
                    onClick={() => setShowVSL(true)}
                    size="lg"
                    className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Watch Now (15 min)
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="relative w-full h-96 bg-black rounded-lg flex items-center justify-center">
                    <div className="text-center text-gray-400">
                      <Volume2 className="w-12 h-12 mx-auto mb-4" />
                      <p>VSL Video Player</p>
                      <p className="text-sm">(Integration with video platform needed)</p>
                    </div>
                  </div>
                  <div className="flex justify-center space-x-4">
                    <Button 
                      variant="outline" 
                      onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                      className="border-gray-600 text-gray-300"
                    >
                      {isVideoPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                      {isVideoPlaying ? 'Pause' : 'Play'}
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center"
        >
          <Card className="bg-gradient-to-br from-gray-800/20 to-gray-900/20 border-gray-700 max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold text-white mb-4">Questions About Your Appointment?</h3>
              <p className="text-gray-300 mb-6">
                Our team is here to help! Reach out if you need to reschedule or have any questions.
              </p>
              <div className="flex justify-center space-x-6">
                <Button 
                  variant="outline"
                  onClick={() => window.location.href = 'tel:4054067323'}
                  className="border-gray-600 text-gray-300 hover:bg-gray-800"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  (405) 406-7323
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => window.location.href = 'mailto:info@vancethecreditdoctor.com'}
                  className="border-gray-600 text-gray-300 hover:bg-gray-800"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Email Us
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>

      <Footer openForm={openForm} />
    </div>
  );
};

export default ThankYou;
