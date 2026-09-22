import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Zap, Target, TrendingUp, Atom, Brain, Shield, Activity, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-28 pb-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-charcoal-light to-charcoal opacity-90" />
        <div className="absolute inset-0 overflow-hidden flex items-center justify-center">
          <img
            src="./images/hero_molecular_structure_20251222_233146.png"
            alt="Molecular Structure"
            className="w-[150%] h-[150%] max-w-none object-cover opacity-[0.06] animate-[spin_180s_linear_infinite]"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
          <div className="text-center max-w-4xl mx-auto z-10 relative">
            <h1 className="text-3xl md:text-5xl font-extrabold mb-6">
              <span className="gradient-text">Precision Oncology,</span> <span className="text-white">Orchestrated.</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-300 mb-10 leading-relaxed max-w-3xl mx-auto font-light">
              Replacing trial-and-error with computational certainty. BioClarity AI provides a proprietary Computational Model Orchestrator to solve the structural and manufacturing complexities of Radioconjugates.
            </p>

            <div className="flex justify-center mb-4">
              <Button
                size="lg"
                className="bg-electric-blue hover:bg-electric-blue-glow text-white px-8 py-4 text-lg glow-electric transition-smooth"
                asChild
              >
                <Link to="/connect-careers#contact">
                  Partner with Us
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>


          </div>
        </div>
      </section>

      {/* The BioClarity Engine (Core Capabilities) */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              The <span className="gradient-text">BioClarity Engine</span>
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Our core capabilities powering the computational orchestration of precision therapeutics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16 md:divide-x divide-white/5">
            <div className="flex flex-col items-center text-center md:px-6 transition-transform hover:-translate-y-1 duration-300">
              <div className="w-20 h-20 bg-electric-blue/5 rounded-2xl flex items-center justify-center mb-6 border border-electric-blue/10 glow-electric shadow-[0_0_20px_rgba(0,229,255,0.1)]">
                <Atom className="h-10 w-10 text-electric-blue" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Molecular Design & Lead Optimization</h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                Engineering high-affinity Vectors with <span className="text-electric-blue font-bold">96% stability prediction accuracy</span> for Linker and Chelator architectures.
              </p>
              <div className="mt-auto">
                <Link to="/what-we-do#molecular-design" className="text-electric-blue hover:text-electric-blue-glow font-semibold inline-flex items-center transition-colors">
                  Learn More <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="flex flex-col items-center text-center md:px-6 transition-transform hover:-translate-y-1 duration-300">
              <div className="w-20 h-20 bg-neon-teal/5 rounded-2xl flex items-center justify-center mb-6 border border-neon-teal/10 glow-teal shadow-[0_0_20px_rgba(29,233,182,0.1)]">
                <Shield className="h-10 w-10 text-neon-teal" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Manufacturing Intelligence (CMC)</h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                De-risking the supply chain with <span className="text-neon-teal font-bold">90% accuracy</span> in predicting batch purity and success from production to delivery.
              </p>
              <div className="mt-auto">
                <Link to="/what-we-do#manufacturing-intelligence" className="text-neon-teal hover:text-white font-semibold inline-flex items-center transition-colors">
                  Learn More <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="flex flex-col items-center text-center md:px-6 transition-transform hover:-translate-y-1 duration-300">
              <div className="w-20 h-20 bg-electric-blue/5 rounded-2xl flex items-center justify-center mb-6 border border-electric-blue/10 glow-electric shadow-[0_0_20px_rgba(0,229,255,0.1)]">
                <Brain className="h-10 w-10 text-electric-blue" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Biological Modeling & Simulation</h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                Eliminating the "Species Gap" through high-fidelity human simulations that predict Clinical Biodistribution and off-target risks.
              </p>
              <div className="mt-auto">
                <Link to="/what-we-do#biological-modeling" className="text-electric-blue hover:text-electric-blue-glow font-semibold inline-flex items-center transition-colors">
                  Learn More <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Advantages */}
      <section className="py-16 bg-charcoal-light/30 border-t border-white/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          <h2 className="text-3xl md:text-5xl font-bold text-center text-white mb-16">
            Technological <span className="gradient-text">Advantages</span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-16 w-full max-w-5xl">
            <div className="flex flex-col group">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-electric-blue/5 border border-electric-blue/10 rounded-xl mr-4 group-hover:bg-electric-blue/10 transition-colors shadow-[0_0_15px_rgba(0,229,255,0.05)]">
                  <Zap className="h-6 w-6 text-electric-blue" />
                </div>
                <h3 className="text-xl font-bold text-white">AI-Driven Linker Design</h3>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed pl-16">
                Our proprietary algorithms optimize linker stability, selectivity, and release kinetics
                for maximum therapeutic window.
              </p>
              <ul className="space-y-2 text-sm text-gray-400 pl-16">
                <li className="flex items-center"><div className="h-1 w-1 rounded-full bg-electric-blue mr-3 shrink-0"></div> Plasma stability prediction models</li>
                <li className="flex items-center"><div className="h-1 w-1 rounded-full bg-electric-blue mr-3 shrink-0"></div> Tumor microenvironment activation</li>
                <li className="flex items-center"><div className="h-1 w-1 rounded-full bg-electric-blue mr-3 shrink-0"></div> Payload release optimization</li>
                <li className="flex items-center"><div className="h-1 w-1 rounded-full bg-electric-blue mr-3 shrink-0"></div> Manufacturing scalability assessment</li>
              </ul>
            </div>

            <div className="flex flex-col group">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-neon-teal/5 border border-neon-teal/10 rounded-xl mr-4 group-hover:bg-neon-teal/10 transition-colors shadow-[0_0_15px_rgba(29,233,182,0.05)]">
                  <Atom className="h-6 w-6 text-neon-teal" />
                </div>
                <h3 className="text-xl font-bold text-white">Chelator Innovation</h3>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed pl-16">
                Next-generation chelators designed for optimal isotope binding, stability,
                and in vivo performance across multiple radioisotopes.
              </p>
              <ul className="space-y-2 text-sm text-gray-400 pl-16">
                <li className="flex items-center"><div className="h-1 w-1 rounded-full bg-neon-teal mr-3 shrink-0"></div> Multi-isotope compatibility</li>
                <li className="flex items-center"><div className="h-1 w-1 rounded-full bg-neon-teal mr-3 shrink-0"></div> Enhanced binding kinetics</li>
                <li className="flex items-center"><div className="h-1 w-1 rounded-full bg-neon-teal mr-3 shrink-0"></div> Reduced immunogenicity</li>
                <li className="flex items-center"><div className="h-1 w-1 rounded-full bg-neon-teal mr-3 shrink-0"></div> Simplified synthesis routes</li>
              </ul>
            </div>

            <div className="flex flex-col group">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-electric-blue/5 border border-electric-blue/10 rounded-xl mr-4 group-hover:bg-electric-blue/10 transition-colors shadow-[0_0_15px_rgba(0,229,255,0.05)]">
                  <Activity className="h-6 w-6 text-electric-blue" />
                </div>
                <h3 className="text-xl font-bold text-white">Manufacturing Optimization</h3>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed pl-16">
                AI-guided manufacturing processes ensure consistent quality, yield, and scalability
                for clinical and commercial production.
              </p>
              <ul className="space-y-2 text-sm text-gray-400 pl-16">
                <li className="flex items-center"><div className="h-1 w-1 rounded-full bg-electric-blue mr-3 shrink-0"></div> Process parameter optimization</li>
                <li className="flex items-center"><div className="h-1 w-1 rounded-full bg-electric-blue mr-3 shrink-0"></div> Quality control prediction</li>
                <li className="flex items-center"><div className="h-1 w-1 rounded-full bg-electric-blue mr-3 shrink-0"></div> Yield maximization algorithms</li>
                <li className="flex items-center"><div className="h-1 w-1 rounded-full bg-electric-blue mr-3 shrink-0"></div> Cost-effective scale-up</li>
              </ul>
            </div>

            <div className="flex flex-col group">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-neon-teal/5 border border-neon-teal/10 rounded-xl mr-4 group-hover:bg-neon-teal/10 transition-colors shadow-[0_0_15px_rgba(29,233,182,0.05)]">
                  <Target className="h-6 w-6 text-neon-teal" />
                </div>
                <h3 className="text-xl font-bold text-white">Clinical Trial Intelligence</h3>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed pl-16">
                Real-time clinical trial monitoring and outcome prediction enable proactive
                decision-making and protocol optimization.
              </p>
              <ul className="space-y-2 text-sm text-gray-400 pl-16">
                <li className="flex items-center"><div className="h-1 w-1 rounded-full bg-neon-teal mr-3 shrink-0"></div> Patient response prediction</li>
                <li className="flex items-center"><div className="h-1 w-1 rounded-full bg-neon-teal mr-3 shrink-0"></div> Dosing optimization models</li>
                <li className="flex items-center"><div className="h-1 w-1 rounded-full bg-neon-teal mr-3 shrink-0"></div> Safety signal detection</li>
                <li className="flex items-center"><div className="h-1 w-1 rounded-full bg-neon-teal mr-3 shrink-0"></div> Adaptive trial design</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-electric-blue/10 via-transparent to-transparent rounded-3xl p-12 border border-white/5 shadow-2xl">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your <span className="gradient-text">Drug Discovery?</span>
          </h2>

          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Join the precision medicine revolution. Discover how our AI platforms can accelerate
            your therapeutic development pipeline.
          </p>

          <div className="flex justify-center">
            <Button
              size="lg"
              className="bg-electric-blue hover:bg-electric-blue-glow text-white px-10 py-6 text-xl glow-electric transition-smooth font-semibold rounded-full shadow-[0_0_20px_rgba(0,229,255,0.4)]"
              asChild
            >
              <Link to="/connect-careers#contact">
                Start a Partnership
                <ArrowRight className="ml-3 h-6 w-6" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
