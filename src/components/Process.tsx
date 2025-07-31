import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  FileSearch, 
  Target, 
  Send, 
  TrendingUp,
  ArrowRight,
  CheckCircle,
  Phone
} from "lucide-react";
import creditImage from "@/assets/credit-improvement.jpg";

const steps = [
  {
    icon: FileSearch,
    title: "Free Credit Analysis",
    description: "We review your credit reports from all three bureaus to identify errors and negative items.",
    duration: "24-48 hours"
  },
  {
    icon: Target,
    title: "Personalized Strategy",
    description: "Our experts create a custom action plan targeting the most impactful improvements.",
    duration: "1-2 days"
  },
  {
    icon: Send,
    title: "Challenge & Dispute",
    description: "We send professional dispute letters to credit bureaus and creditors on your behalf.",
    duration: "Ongoing"
  },
  {
    icon: TrendingUp,
    title: "Score Improvement",
    description: "Watch your credit score improve as negative items are removed and errors corrected.",
    duration: "30-60 days"
  }
];

const Process = () => {
  return (
    <section id="how-it-works" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative z-10">
              <img 
                src={creditImage} 
                alt="Credit Score Improvement" 
                className="rounded-2xl shadow-elegant"
              />
              <div className="absolute -bottom-6 -right-6 bg-success text-success-foreground p-6 rounded-2xl shadow-lg">
                <div className="text-3xl font-bold">100%</div>
                <div className="text-sm">Success Rate</div>
              </div>
            </div>
            <div className="absolute top-6 -left-6 bg-primary text-primary-foreground p-4 rounded-xl shadow-lg">
              <div className="text-2xl font-bold">850+</div>
              <div className="text-xs">Score Boost</div>
            </div>
          </motion.div>

          {/* Right Column - Process Steps */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="mb-12">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                How We Fix Your Credit
              </h2>
              <p className="text-xl text-slate-600">
                Our proven 4-step process has helped thousands of clients 
                achieve their credit goals faster than they thought possible.
              </p>
            </div>

            <div className="space-y-6">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <Card className="group hover:shadow-elegant transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                          <step.icon className="w-8 h-8 text-primary-foreground" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-xl font-bold">
                              Step {index + 1}: {step.title}
                            </h3>
                            <span className="text-sm bg-secondary text-secondary-foreground px-3 py-1 rounded-full">
                              {step.duration}
                            </span>
                          </div>
                          <p className="text-slate-400 mb-4">{step.description}</p>
                          <div className="flex items-center gap-2 text-success">
                            <CheckCircle className="w-4 h-4" />
                            <span className="text-sm font-medium">Guaranteed Results</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Arrow connector */}
                  {index < steps.length - 1 && (
                    <div className="flex justify-center my-4">
                      <motion.div
                        animate={{ y: [0, 5, 0] }}
                        transition={{ repeat: Infinity, duration: 2, delay: index * 0.2 }}
                      >
                        <ArrowRight className="w-6 h-6 text-slate-400 rotate-90" />
                      </motion.div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
              className="mt-12"
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-lg px-8 py-6 gradient-success">
                  Start Your Credit Repair Journey
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-lg px-8 py-6"
                  onClick={() => window.location.href = 'tel:4054067323'}
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call (405) 406-7323
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Process;
