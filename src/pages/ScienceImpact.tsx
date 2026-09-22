import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Dna, Atom, Zap, Brain, Target, TrendingUp, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
const ScienceImpact = () => {
  return <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="gradient-text">Science & Impact</span>
              <br />
              <span className="text-white">The Evidence Hub</span>
            </h1>
            
            <p className="text-xl text-gray-300 leading-relaxed">
              Proven results across four key scientific pillars. Our AI-driven approach has delivered 
              breakthrough outcomes in gene therapy, small molecule discovery, biologics, and target validation.
            </p>
          </div>
        </div>
      </section>
      
      {/* Scientific Pillars */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Pillar 1: AAV Capsid Design */}
          <div className="mb-20">
            <Card className="card-gradient border-electric-blue/30 overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="p-8">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-16 h-16 bg-electric-blue/20 rounded-lg flex items-center justify-center glow-electric">
                      <Dna className="h-8 w-8 text-electric-blue" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">Pillar 1: AAV Capsid Design</h2>
                      <p className="text-electric-blue font-semibold">Gene Therapy Precision</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2 flex items-center">
                        <Target className="h-5 w-5 text-red-400 mr-2" />
                        The Problem
                      </h3>
                      <p className="text-gray-300">
                        Natural AAVs lack tissue specificity, leading to liver toxicity and poor therapeutic outcomes.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2 flex items-center">
                        <Brain className="h-5 w-5 text-electric-blue mr-2" />
                        The Approach
                      </h3>
                      <p className="text-gray-300">
                        Screened 1.28 billion variants via in silico evolution using AlphaFoldMultimer and LSTM models.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2 flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                        Result
                      </h3>
                      <p className="text-gray-300">
                        Identified 3 novel CNS-specific candidates with a 40% lower predicted immunogenicity risk.
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center p-4 bg-electric-blue/10 rounded-lg border border-electric-blue/20">
                      <div className="text-2xl font-bold text-electric-blue">1.28B</div>
                      <div className="text-sm text-gray-400">Variants Screened</div>
                    </div>
                    <div className="text-center p-4 bg-electric-blue/10 rounded-lg border border-electric-blue/20">
                      <div className="text-2xl font-bold text-electric-blue">40%</div>
                      <div className="text-sm text-gray-400">Immunogenicity Reduction</div>
                    </div>
                  </div>
                </div>
                
                <div className="p-8 flex items-center justify-center">
                  <img src="./images/aav_capsid_structure_20251222_233146.png" alt="AAV Capsid Structure" className="w-full max-w-md rounded-lg shadow-lg" />
                </div>
              </div>
            </Card>
          </div>
          
          {/* Pillar 2: Small Molecule Discovery */}
          <div className="mb-20">
            <Card className="card-gradient border-neon-teal/30 overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="p-8 lg:order-2">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-16 h-16 bg-neon-teal/20 rounded-lg flex items-center justify-center glow-teal">
                      <Atom className="h-8 w-8 text-neon-teal" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">Pillar 2: Small Molecule Discovery</h2>
                      <p className="text-neon-teal font-semibold">MSH3 Pilot for Huntington's Disease</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2 flex items-center">
                        <Target className="h-5 w-5 text-red-400 mr-2" />
                        The Problem
                      </h3>
                      <p className="text-gray-300">
                        The Blood-Brain Barrier (BBB) excludes 98% of neuro-therapeutic candidates.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2 flex items-center">
                        <Brain className="h-5 w-5 text-neon-teal mr-2" />
                        The Approach
                      </h3>
                      <p className="text-gray-300">
                        Virtual screening of 120 million compounds targeting MSH3 (Huntington's Disease).
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2 flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                        Result
                      </h3>
                      <p className="text-gray-300">
                        Compressed discovery timelines from months to days, achieving sub-10 nM potency.
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center p-4 bg-neon-teal/10 rounded-lg border border-neon-teal/20">
                      <div className="text-2xl font-bold text-neon-teal">Days</div>
                      <div className="text-sm text-gray-400">vs. Months Timeline</div>
                    </div>
                    <div className="text-center p-4 bg-neon-teal/10 rounded-lg border border-neon-teal/20">
                      <div className="text-2xl font-bold text-neon-teal">&lt;10 nM</div>
                      <div className="text-sm text-gray-400">Potency Achieved</div>
                    </div>
                  </div>
                </div>
                
                <div className="p-8 lg:order-1 flex items-center justify-center">
                  <img src="./images/drug_discovery_scatter_20251222_233146.png" alt="Drug Discovery Results" className="w-full max-w-md rounded-lg shadow-lg" />
                </div>
              </div>
            </Card>
          </div>
          
          {/* Pillar 3: Bispecific Antibody Discovery */}
          <div className="mb-20">
            <Card className="card-gradient border-electric-blue/30 overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="p-8">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-16 h-16 bg-electric-blue/20 rounded-lg flex items-center justify-center glow-electric">
                      <Zap className="h-8 w-8 text-electric-blue" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">Pillar 3: Bispecific Antibody Discovery</h2>
                      <p className="text-electric-blue font-semibold">Multi-Target Biologics</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2 flex items-center">
                        <Target className="h-5 w-5 text-red-400 mr-2" />
                        The Problem
                      </h3>
                      <p className="text-gray-300">
                        High risk of aggregation and instability in multi-target biologics.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2 flex items-center">
                        <Brain className="h-5 w-5 text-electric-blue mr-2" />
                        The Approach
                      </h3>
                      <p className="text-gray-300">
                        Generative Design Loop utilizing Graph Neural Networks and LLMs.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2 flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                        Result
                      </h3>
                      <p className="text-gray-300">
                        Achieved 95% binding efficiency and a 3x reduction in development time for Osteogenesis Imperfecta targets.
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center p-4 bg-electric-blue/10 rounded-lg border border-electric-blue/20">
                      <div className="text-2xl font-bold text-electric-blue">95%</div>
                      <div className="text-sm text-gray-400">Binding Efficiency</div>
                    </div>
                    <div className="text-center p-4 bg-electric-blue/10 rounded-lg border border-electric-blue/20">
                      <div className="text-2xl font-bold text-electric-blue">3x</div>
                      <div className="text-sm text-gray-400">Faster Development</div>
                    </div>
                  </div>
                </div>
                
                <div className="p-8 flex items-center justify-center">
                <img src="./images/bispecific_antibody_precision_20251223011615.png" alt="Bispecific Antibody Precision Engineering" className="w-full max-w-md rounded-lg shadow-lg" />
                </div>
              </div>
            </Card>
          </div>
          
          {/* Pillar 4: Virtual Cell Perturbation */}
          <div className="mb-20">
            <Card className="card-gradient border-neon-teal/30 overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="p-8 lg:order-2">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-16 h-16 bg-neon-teal/20 rounded-lg flex items-center justify-center glow-teal">
                      <Brain className="h-8 w-8 text-neon-teal" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">Pillar 4: Virtual Cell Perturbation</h2>
                      <p className="text-neon-teal font-semibold">Target Validation Revolution</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2 flex items-center">
                        <Target className="h-5 w-5 text-red-400 mr-2" />
                        The Problem
                      </h3>
                      <p className="text-gray-300">
                        Wet-lab target validation is slow and often fails to predict off-target effects.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2 flex items-center">
                        <Brain className="h-5 w-5 text-neon-teal mr-2" />
                        The Approach
                      </h3>
                      <p className="text-gray-300">
                        In silico knockout simulations using the seCPT foundation model.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2 flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                        Result
                      </h3>
                      <p className="text-gray-300">
                        Achieved R² = 0.95 transcriptomic accuracy, enabling "Go/No-Go" decisions before entering the lab.
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center p-4 bg-neon-teal/10 rounded-lg border border-neon-teal/20">
                      <div className="text-2xl font-bold text-neon-teal">R² = 0.95</div>
                      <div className="text-sm text-gray-400">Transcriptomic Accuracy</div>
                    </div>
                    <div className="text-center p-4 bg-neon-teal/10 rounded-lg border border-neon-teal/20">
                      <div className="text-2xl font-bold text-neon-teal">Pre-Lab</div>
                      <div className="text-sm text-gray-400">Go/No-Go Decisions</div>
                    </div>
                  </div>
                </div>
                
                <div className="p-8 lg:order-1 flex items-center justify-center">
                  <img src="./images/genomic_heatmap_20251222_233146.png" alt="Genomic Heatmap" className="w-full max-w-md rounded-lg shadow-lg" />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Impact Summary */}
      <section className="py-16 bg-charcoal-light/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
            <span className="gradient-text">Transforming</span> Drug Discovery Across Modalities
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-electric-blue/20 rounded-full flex items-center justify-center mx-auto mb-4 glow-electric">
                <TrendingUp className="h-8 w-8 text-electric-blue" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Speed</h3>
              <p className="text-gray-400">
                Rapid identification of therapeutic candidates for urgent unmet medical needs
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-neon-teal/20 rounded-full flex items-center justify-center mx-auto mb-4 glow-teal">
                <Target className="h-8 w-8 text-neon-teal" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">De-Risked Pipelines</h3>
              <p className="text-gray-400">
                Early-stage filtering significantly reduces late-stage clinical attrition
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-electric-blue/20 rounded-full flex items-center justify-center mx-auto mb-4 glow-electric">
                <Zap className="h-8 w-8 text-electric-blue" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Scalability</h3>
              <p className="text-gray-400">
                Scale across multiple disease programs simultaneously with proven AI frameworks
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Apply Our <span className="gradient-text">Proven Science?</span>
          </h2>
          
          <p className="text-lg text-gray-300 mb-8">
            Our validated AI platforms are ready to accelerate your therapeutic development programs. 
            Let's discuss how we can apply these breakthrough approaches to your specific challenges.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-electric-blue hover:bg-electric-blue-glow text-white px-8 py-4 text-lg glow-electric transition-smooth" asChild>
              <Link to="/connect-careers">
                Start a Collaboration
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            
            <Button size="lg" variant="outline" className="border-neon-teal text-neon-teal hover:bg-neon-teal hover:text-charcoal px-8 py-4 text-lg transition-smooth" asChild>
              <Link to="/the-future">
                Explore The Future
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>;
};
export default ScienceImpact;