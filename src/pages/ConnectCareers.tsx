import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { ArrowRight, Linkedin, Users, Brain, Atom, Code, Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
const ConnectCareers = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
    type: "partnership"
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  return <div className="min-h-screen bg-background">
    <Navigation />

    {/* Hero Section */}
    <section className="pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">Connect & Careers</span>
            <br />
            <span className="text-white">Join the Mission</span>
          </h1>

          <p className="text-xl text-gray-300 leading-relaxed mb-8">
            Small Team, Massive Impact. We don't have departments; we have missions.
            We value high-agency individuals who can speak the languages of both biology and code.
          </p>

          <div className="inline-flex items-center space-x-2 bg-electric-blue/10 border border-electric-blue/30 rounded-full px-6 py-3">
            <Users className="h-5 w-5 text-electric-blue" />
            <span className="text-electric-blue font-semibold">Building the Future of Precision Medicine</span>
          </div>
        </div>
      </div>
    </section>

    {/* Open Roles */}
    <section className="py-16 bg-charcoal-light/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
          <span className="gradient-text">Open Roles</span>
        </h2>

        <div className="max-w-3xl mx-auto mt-8 mb-8 text-center bg-charcoal-light/40 border border-white/5 rounded-2xl p-10 shadow-lg">
          <p className="text-xl text-gray-300 leading-relaxed md:px-8">
            We have no open positions right now, but we keep opening new jobs everyday so come back and check later.
          </p>
        </div>
      </div>
    </section>



    {/* LinkedIn Follow */}
    {/* Contact & Social Section */}
    <section id="contact" className="py-20 bg-charcoal-light/30 border-t border-electric-blue/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Stay Updated on Our <span className="gradient-text">Latest Breakthroughs</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Follow our journey in AI-driven drug discovery and connect with our team directly for partnerships or inquiries.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* LinkedIn Side */}
          <div className="flex flex-col items-center p-8 rounded-2xl bg-charcoal/50 border border-neon-teal/20 hover:border-neon-teal/50 transition-all shadow-lg">
            <div className="w-16 h-16 bg-neon-teal/10 rounded-full flex items-center justify-center mb-6 glow-teal">
              <Linkedin className="h-8 w-8 text-neon-teal" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-4">Social Connect</h3>
            <a
              href="https://www.linkedin.com/company/bioclarity-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl font-bold text-neon-teal hover:text-neon-teal-glow transition-all border-b-2 border-neon-teal pb-1"
            >
              BioClarity AI on LinkedIn
            </a>
          </div>

          {/* Email Side */}
          <div className="flex flex-col items-center p-8 rounded-2xl bg-charcoal/50 border border-electric-blue/20 hover:border-electric-blue/50 transition-all shadow-lg">
            <div className="w-16 h-16 bg-electric-blue/10 rounded-full flex items-center justify-center mb-6 glow-electric">
              <Mail className="h-8 w-8 text-electric-blue" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-4">
              <span className="gradient-text">Contact Us</span>
            </h3>
            <a
              href="mailto:info@bioclarity.ai?subject=BioClarity AI Inquiry"
              className="text-2xl font-bold text-electric-blue hover:text-electric-blue-glow transition-all border-b-2 border-electric-blue pb-1"
            >
              info@bioclarity.ai
            </a>
          </div>
        </div>
      </div>
    </section>


  </div>;
};
export default ConnectCareers;