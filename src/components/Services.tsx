import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  CreditCard, 
  TrendingUp, 
  Shield, 
  FileText, 
  Users, 
  Phone,
  CheckCircle,
  Star
} from "lucide-react";

const services = [
  {
    icon: CreditCard,
    title: "Credit Report Analysis",
    description: "Comprehensive review of all three credit bureaus to identify errors and areas for improvement.",
    features: ["Detailed credit report review", "Error identification", "Personalized improvement plan"]
  },
  {
    icon: TrendingUp,
    title: "Score Improvement",
    description: "Strategic dispute process to remove negative items and boost your credit score quickly.",
    features: ["Negative item removal", "Score optimization", "30-60 day results"]
  },
  {
    icon: Shield,
    title: "Credit Protection",
    description: "Ongoing monitoring and protection to maintain your improved credit score long-term.",
    features: ["Identity theft protection", "Credit monitoring", "Fraud alerts"]
  },
  {
    icon: FileText,
    title: "Debt Validation",
    description: "Challenge questionable debts and ensure all reported items are legitimate and accurate.",
    features: ["Debt verification", "Collection disputes", "Legal compliance checks"]
  },
  {
    icon: Users,
    title: "Personal Consultation",
    description: "One-on-one guidance from experienced credit specialists throughout your journey.",
    features: ["Expert consultation", "Personalized strategy", "Ongoing support"]
  },
  {
    icon: Phone,
    title: "24/7 Support",
    description: "Round-the-clock customer support to answer questions and provide updates on your case.",
    features: ["24/7 availability", "Progress updates", "Expert advice"]
  }
];

const Services = () => {
  return (
    <section id="services" className="py-20 bg-secondary/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Complete Credit <br className="md:hidden" />Repair Solutions
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Our comprehensive approach addresses every aspect of your credit profile
            <br />
            to deliver lasting results and financial freedom.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-elegant transition-all duration-300 group">
                <CardContent className="p-8">
                  <div className="mb-6">
                    <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <service.icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                    <p className="text-slate-400 mb-6">{service.description}</p>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center justify-between">
                    <div className="flex">
                      {[1,2,3,4,5].map((star) => (
                        <Star key={star} className="w-4 h-4 fill-warning text-warning" />
                      ))}
                    </div>
                    <Button variant="outline" size="sm" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      Learn More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="text-lg px-8 py-6 gradient-primary">
              Get Started Today - Free Consultation
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
      </div>
    </section>
  );
};

export default Services;
