import React, { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ArrowRight, Dna, Atom, Zap, Brain, ChevronDown, ChevronUp, Target, CheckCircle, TrendingUp, Clock, Shield, Activity, Beaker } from "lucide-react";
import { Link } from "react-router-dom";
import BiologicalPhysics from "@/components/BiologicalPhysics";

const ExpandablePillarCard = ({
  title,
  icon: Icon,
  color,
  summary,
  imageSrc,
  imageAlt,
  problem,
  approach,
  result,
  stat1Value,
  stat1Label,
  stat2Value,
  stat2Label
}: {
  title: string;
  icon: any;
  color: 'electric-blue' | 'neon-teal';
  summary: string;
  imageSrc: string;
  imageAlt: string;
  problem: string;
  approach: string;
  result: string;
  stat1Value: string;
  stat1Label: string;
  stat2Value: string;
  stat2Label: string;
}) => {
  const [expanded, setExpanded] = useState(false);

  const borderColor = color === 'electric-blue' ? 'border-electric-blue/30 hover:border-electric-blue/50' : 'border-neon-teal/30 hover:border-neon-teal/50';
  const iconBgColor = color === 'electric-blue' ? 'bg-electric-blue/20 glow-electric' : 'bg-neon-teal/20 glow-teal';
  const iconColor = color === 'electric-blue' ? 'text-electric-blue' : 'text-neon-teal';
  const buttonColor = color === 'electric-blue'
    ? 'border-electric-blue text-electric-blue hover:bg-electric-blue hover:text-white'
    : 'border-neon-teal text-neon-teal hover:bg-neon-teal hover:text-charcoal';
  const statBg = color === 'electric-blue' ? 'bg-electric-blue/10 border-electric-blue/20' : 'bg-neon-teal/10 border-neon-teal/20';

  return (
    <Card className={`card-gradient ${borderColor} transition-smooth group flex flex-col h-fit`}>
      <CardHeader className="pb-4">
        <div className="flex items-center space-x-3 mb-3">
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${iconBgColor}`}>
            <Icon className={`h-6 w-6 ${iconColor}`} />
          </div>
          <CardTitle className="text-white text-xl">{title}</CardTitle>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col">
        <p className="text-gray-300 mb-4 h-12 sm:h-auto min-h-[3rem]">
          {summary}
        </p>

        <div className="mb-6 overflow-hidden rounded-lg bg-black/40 border border-white/5 flex items-center justify-center">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="w-full h-auto max-h-96 object-contain opacity-80 group-hover:opacity-100 transition-transform duration-700 hover:scale-105"
          />
        </div>

        {/* The Expandable Details Section */}
        <div className={`grid transition-all duration-500 ease-in-out ${expanded ? 'grid-rows-[1fr] opacity-100 mb-6' : 'grid-rows-[0fr] opacity-0 mb-0'}`}>
          <div className="overflow-hidden">
            <div className="pt-4 mt-2 border-t border-white/5 space-y-4">

              <div>
                <h3 className="text-sm font-semibold text-white mb-1 flex items-center">
                  <Target className="h-4 w-4 text-red-400 mr-2" />
                  The Problem
                </h3>
                <p className="text-sm text-gray-300 pl-6 border-l border-red-400/30">
                  {problem}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-white mb-1 flex items-center">
                  <Brain className={`h-4 w-4 ${iconColor} mr-2`} />
                  The Approach
                </h3>
                <p className={`text-sm text-gray-300 pl-6 border-l border-${color}/30`}>
                  {approach}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-white mb-1 flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                  Result
                </h3>
                <p className="text-sm text-gray-300 pl-6 border-l border-green-400/30">
                  {result}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-6">
                <div className={`text-center p-3 rounded-lg border ${statBg}`}>
                  <div className={`text-lg font-bold ${iconColor}`}>{stat1Value}</div>
                  <div className="text-xs text-gray-400">{stat1Label}</div>
                </div>
                <div className={`text-center p-3 rounded-lg border ${statBg}`}>
                  <div className={`text-lg font-bold ${iconColor}`}>{stat2Value}</div>
                  <div className="text-xs text-gray-400">{stat2Label}</div>
                </div>
              </div>

            </div>
          </div>
        </div>

        <div className="mt-auto pt-2">
          <Button
            variant="outline"
            size="sm"
            className={`${buttonColor} transition-smooth w-full flex items-center justify-center gap-2`}
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? (
              <>Show Less <ChevronUp className="h-4 w-4" /></>
            ) : (
              <>Learn More <ChevronDown className="h-4 w-4" /></>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const WhatWeDo = () => {
  const [showBroaderExperience, setShowBroaderExperience] = useState(false);
  const [isModelUp, setIsModelUp] = useState(true);
  const [accessCode, setAccessCode] = useState("");
  const [error, setError] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const checkModelStatus = async () => {
      try {
        await fetch("https://rad-explorer-1058801483977.us-east1.run.app/", {
          method: "GET",
          mode: "no-cors"
        });
        setIsModelUp(true);
      } catch (err) {
        setIsModelUp(false);
      }
    };
    checkModelStatus();
  }, []);

  const handleAccessSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (accessCode.trim().toUpperCase() === "ADMET2026") {
      window.open("https://rad-explorer-1058801483977.us-east1.run.app/", "_blank", "noopener,noreferrer");
      setIsDialogOpen(false);
      setAccessCode("");
      setError("");
    } else {
      setError("Invalid access code. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <BiologicalPhysics />

      <div className="inline-block relative z-20">
        <Navigation />
      </div>

      {/* Hero Section */}
      <section className="pt-20 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-charcoal-light to-charcoal opacity-90" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center max-w-4xl mx-auto mb-16 flex flex-col items-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="gradient-text">Radioconjugate</span> <span className="text-white">Theranostics</span>
            </h1>

            <p className="text-xl text-gray-300 leading-relaxed mb-8 max-w-2xl">
              Bridging the gap between atomic simulation and clinical success. BioClarity AI utilizes high-fidelity generative models to solve the most complex delivery, dosimetry, and manufacturing challenges in Radioconjugates.
            </p>


          </div>
        </div>
      </section>

      {/* Strategic Focus */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 flex flex-col items-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Our <span className="gradient-text">Strategic Vision</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              We are translating our AI expertise into proprietary Linker and Chelator IP,
              revolutionizing how radiopharmaceuticals are designed, manufactured, and deployed.
            </p>
          </div>

          <div className="max-w-5xl mx-auto items-center mb-16">
            <div className="flex flex-col items-center text-center">
              <h3 className="text-2xl font-bold text-white mb-6 text-center w-full">
                Philosophy: <span className="gradient-text">Surgical Precision</span>
              </h3>
              <p className="text-xl text-gray-300 mb-12 text-center w-full max-w-3xl">
                Stability in the bloodstream, surgical precision at the tumor. We optimize for the
                "Short Half-Life" reality of isotopes, ensuring maximum therapeutic impact with minimal off-target effects.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                <div className="flex flex-col items-center text-center p-6 bg-charcoal-light/30 rounded-xl border border-white/5 transition-smooth hover:border-electric-blue/30">
                  <Shield className="h-10 w-10 text-electric-blue mb-4" />
                  <div>
                    <h4 className="font-semibold text-white mb-2 text-lg">Bloodstream Stability</h4>
                    <p className="text-gray-400">AI-optimized linkers maintain integrity during circulation</p>
                  </div>
                </div>

                <div className="flex flex-col items-center text-center p-6 bg-charcoal-light/30 rounded-xl border border-white/5 transition-smooth hover:border-neon-teal/30">
                  <Target className="h-10 w-10 text-neon-teal mb-4" />
                  <div>
                    <h4 className="font-semibold text-white mb-2 text-lg">Tumor Precision</h4>
                    <p className="text-gray-400">Selective release mechanisms activated at target sites</p>
                  </div>
                </div>

                <div className="flex flex-col items-center text-center p-6 bg-charcoal-light/30 rounded-xl border border-white/5 transition-smooth hover:border-electric-blue/30">
                  <Clock className="h-10 w-10 text-electric-blue mb-4" />
                  <div>
                    <h4 className="font-semibold text-white mb-2 text-lg">Isotope Optimization</h4>
                    <p className="text-gray-400">Designed for short half-life isotope characteristics</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Capability Bento Grid - Now Combined with Science & Impact */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-electric-blue/5 via-background to-background pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Radioconjugate <span className="gradient-text">Platforms</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Three core AI platforms engineered to tackle the most challenging aspects of radiopharmaceutical development.
              Click <span className="text-electric-blue font-bold">Learn More</span> to explore the evidence behind each platform.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start mb-24">
            <div id="biological-modeling">
              <ExpandablePillarCard
                title="Biological Modeling & Simulation"
                icon={Brain}
                color="electric-blue"
                summary="Eliminating the Kidney Toxicity Bottleneck via Human-Centric Modeling and Virtual Dosimetry."
                imageSrc="./images/radiopharmaceutical_diagram_20251222_233147.png"
                imageAlt="Predictive ADMET"
                problem="Eliminating the Kidney Toxicity Bottleneck and ensuring radioactive payloads spare healthy renal tissue."
                approach="Human-Centric Modeling: Moving beyond the 'Species Gap' of animal testing with human Kidney Digital Twins informed by Organ-on-a-Chip data."
                result="Virtual Dosimetry & Risk Mitigation: Simulating over 1,000 radiation scenarios per candidate in silico to predict human biodistribution."
                stat1Value="1,000+"
                stat1Label="Radiation Scenarios"
                stat2Value="In Silico"
                stat2Label="Risk Mitigation"
              />
            </div>

            <div id="molecular-design">
              <ExpandablePillarCard
                title="Molecular Design & Lead Optimization"
                icon={Zap}
                color="neon-teal"
                summary="Engineering Molecular Stability with Physics-Informed Architecture."
                imageSrc="./images/RC3.png"
                imageAlt="Lead Optimization"
                problem="Ensuring the radioactive isotope remains securely locked to the 'Smart Missile' until it docks at the cancer site."
                approach="Physics-Informed Architecture combining machine learning with radioactive decay kinetics."
                result="Atomic Precision: Predicting the 'Goldilocks' bond between ligand and isotope for near-perfect stability."
                stat1Value="R² = 0.96"
                stat1Label="Stability Forecasts"
                stat2Value="Atomic"
                stat2Label="Precision Optimization"
              />
            </div>

            <div id="manufacturing-intelligence">
              <ExpandablePillarCard
                title="Manufacturing Intelligence (CMC)"
                icon={Target}
                color="electric-blue"
                summary="90% Success from T-Zero to T-Seven ensuring global supply chain intelligence."
                imageSrc="./images/ai_biodata_network_20251222_233147.png"
                imageAlt="CMC & Manufacturing"
                problem="De-risking the supply chain and predicting batch success at the exact moment of production."
                approach="Real-Time QC monitoring microscopic pH fluctuations and trace impurities at T=0."
                result="Supply Chain Intelligence: Normalizing quality across radioisotopes."
                stat1Value="90%"
                stat1Label="T=7 Stability Accuracy"
                stat2Value="T=0"
                stat2Label="Batch Success Prediction"
              />
            </div>
          </div>


        </div>
      </section>

      {/* Projected Clinical Outcomes */}
      <section className="py-16 bg-charcoal-light/30 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-white">
              Projected <span className="gradient-text">Clinical Outcomes</span>
            </h2>
          </div>

          <div className="relative bg-charcoal-light/20 backdrop-blur-sm rounded-3xl border border-white/5 p-8 md:p-12 overflow-hidden shadow-2xl">
            {/* Subtle glow background */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-electric-blue/5 blur-3xl pointer-events-none"></div>

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0 md:divide-x divide-white/10">

              <div className="flex flex-col items-center text-center md:px-8 transition-transform hover:-translate-y-1 duration-300">
                <div className="w-16 h-16 bg-electric-blue/10 rounded-2xl flex items-center justify-center mb-6 glow-electric">
                  <TrendingUp className="h-8 w-8 text-electric-blue" />
                </div>
                <div className="text-5xl font-bold text-white mb-3">
                  35<span className="text-electric-blue text-4xl">%</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Radiolabeling Yields</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Increased yield via AI-optimized chelator design and highly-efficient isotope incorporation.
                </p>
              </div>

              <div className="flex flex-col items-center text-center md:px-8 transition-transform hover:-translate-y-1 duration-300">
                <div className="w-16 h-16 bg-neon-teal/10 rounded-2xl flex items-center justify-center mb-6 glow-teal">
                  <Activity className="h-8 w-8 text-neon-teal" />
                </div>
                <div className="text-5xl font-bold text-white mb-3">
                  40<span className="text-neon-teal text-4xl">%</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Protocol Amendments</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Reduction in clinical amendments through predictive trial modeling and proactive design.
                </p>
              </div>

              <div className="flex flex-col items-center text-center md:px-8 transition-transform hover:-translate-y-1 duration-300">
                <div className="w-16 h-16 bg-electric-blue/10 rounded-2xl flex items-center justify-center mb-6 glow-electric">
                  <Target className="h-8 w-8 text-electric-blue" />
                </div>
                <div className="text-5xl font-bold text-white mb-3">
                  85<span className="text-electric-blue text-4xl">%</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Outcome Forecasting</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Unprecedented accuracy in real-time prognostic modeling for autonomous trial management.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>



      {/* Vision Statement */}
      <section className="py-16 bg-charcoal-light/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
            <span className="gradient-text">Transforming</span> Precision Oncology
          </h2>

          <p className="text-lg text-gray-300 leading-relaxed mb-8 max-w-4xl mx-auto">
            The future of cancer treatment lies in the precise delivery of Radioligand Therapy.
            Our AI-driven approach to radioconjugate design represents a paradigm shift from
            empirical development to rational, data-driven therapeutic engineering.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
            <div className="text-left">
              <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                <Shield className="h-6 w-6 text-electric-blue mr-2" />
                Patient Safety First
              </h3>
              <p className="text-gray-400">
                Every design decision prioritizes patient safety through predictive modeling
                of toxicity, biodistribution, and therapeutic window optimization.
              </p>
            </div>

            <div className="text-left">
              <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                <TrendingUp className="h-6 w-6 text-neon-teal mr-2" />
                Accelerated Development
              </h3>
              <p className="text-gray-400">
                AI-guided development reduces time-to-clinic while increasing the probability
                of clinical success through rational design principles.
              </p>
            </div>
          </div>

          {isModelUp && (
            <div className="mt-8 flex justify-center relative z-20">
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    size="lg"
                    className="bg-neon-teal/20 text-neon-teal border border-neon-teal/50 hover:bg-neon-teal/30 hover:text-white px-8 py-4 text-lg transition-smooth"
                  >
                    <Beaker className="mr-2 h-5 w-5" />
                    Try ADMET Explorer
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md bg-charcoal border border-electric-blue/30 text-white">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-center mb-2">
                      <span className="gradient-text">ADMET Explorer</span> Access
                    </DialogTitle>
                  </DialogHeader>
                  <div className="px-4 py-6">
                    <p className="text-gray-300 text-center mb-6">
                      This model is currently in closed beta. Please enter your access code to proceed.
                    </p>
                    <form onSubmit={handleAccessSubmit} className="space-y-4">
                      <div>
                        <Input
                          type="text"
                          placeholder="Enter Access Code"
                          value={accessCode}
                          onChange={(e) => setAccessCode(e.target.value)}
                          className="w-full bg-white/5 border-white/10 text-white focus:border-electric-blue/50 focus:ring-1 focus:ring-electric-blue mb-2"
                        />
                        {error && <p className="text-red-400 text-sm">{error}</p>}
                      </div>
                      <Button
                        type="submit"
                        className="w-full bg-electric-blue hover:bg-electric-blue-glow text-white font-semibold transition-smooth"
                      >
                        Access Model
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full border-neon-teal text-neon-teal hover:bg-neon-teal hover:text-charcoal transition-smooth"
                        onClick={() => window.location.href = 'mailto:info@bioclarity.ai'}
                      >
                        Request Code
                      </Button>
                    </form>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          )}
        </div>
      </section>

      {/* Broader Therapeutics Experience */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neon-teal/5 via-background to-background pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Broader <span className="gradient-text">Therapeutics Experience</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
              Our expansive experience extends beyond radioconjugates, tackling complex challenges across various therapeutic modalities.
            </p>
            <Button
              variant="outline"
              onClick={() => setShowBroaderExperience(!showBroaderExperience)}
              className="border-neon-teal text-neon-teal hover:bg-neon-teal hover:text-charcoal transition-smooth flex items-center gap-2 mx-auto"
            >
              {showBroaderExperience ? (
                <>Hide Experience <ChevronUp className="h-4 w-4" /></>
              ) : (
                <>Explore Broader Experience <ChevronDown className="h-4 w-4" /></>
              )}
            </Button>
          </div>

          <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-start transition-all duration-700 ease-in-out ${showBroaderExperience ? 'opacity-100 max-h-[3000px] mb-16' : 'opacity-0 max-h-0 overflow-hidden mb-0'}`}>

            <ExpandablePillarCard
              title="AAV Capsid Engineering"
              icon={Dna}
              color="electric-blue"
              summary="High-throughput design of CNS-specific 'GPS' for precision gene therapy."
              imageSrc="./images/aav_capsid_structure_20251222_233146.png"
              imageAlt="AAV Capsid Structure"
              problem="Natural AAVs lack tissue specificity, leading to liver toxicity and poor therapeutic outcomes."
              approach="Screened 1.28 billion variants via in silico evolution using AlphaFoldMultimer and LSTM models."
              result="Identified 3 novel CNS-specific candidates with a 40% lower predicted immunogenicity risk."
              stat1Value="1.28B"
              stat1Label="Variants Screened"
              stat2Value="40%"
              stat2Label="Immunogenicity Reduction"
            />

            <ExpandablePillarCard
              title="Small Molecule CNS Discovery"
              icon={Atom}
              color="neon-teal"
              summary="Rapid screening of vast chemical spaces for BBB-penetrant compounds."
              imageSrc="./images/drug_discovery_scatter_20251222_233146.png"
              imageAlt="Drug Discovery Visualization"
              problem="The Blood-Brain Barrier (BBB) excludes 98% of neuro-therapeutic candidates."
              approach="Virtual screening of 120 million compounds targeting MSH3 (Huntington's Disease)."
              result="Compressed discovery timelines from months to days, achieving sub-10 nM potency."
              stat1Value="Days"
              stat1Label="vs. Months Timeline"
              stat2Value="<10 nM"
              stat2Label="Potency Achieved"
            />

            <ExpandablePillarCard
              title="Bispecific Antibody Design"
              icon={Zap}
              color="electric-blue"
              summary="Multi-parameter optimization for affinity, stability, and manufacturability."
              imageSrc="./images/bispecific_antibody_precision_20251223011615.png"
              imageAlt="Protein Network"
              problem="High risk of aggregation and instability in multi-target biologics."
              approach="Generative Design Loop utilizing Graph Neural Networks and LLMs."
              result="Achieved 95% binding efficiency and a 3x reduction in development time."
              stat1Value="95%"
              stat1Label="Binding Efficiency"
              stat2Value="3x"
              stat2Label="Faster Development"
            />

            <ExpandablePillarCard
              title="Virtual Cell Perturbation"
              icon={Brain}
              color="neon-teal"
              summary="Our disease-representation foundation model for target identification and repurposing."
              imageSrc="./images/genomic_heatmap_20251222_233146.png"
              imageAlt="AI Network / Genomic Heatmap"
              problem="Wet-lab target validation is slow and often fails to predict off-target effects."
              approach="In silico knockout simulations using the seCPT foundation model."
              result="Achieved R² = 0.95 transcriptomic accuracy, enabling Go/No-Go decisions before the lab."
              stat1Value="R² = 0.95"
              stat1Label="Transcriptomic Accuracy"
              stat2Value="Pre-Lab"
              stat2Label="Go/No-Go Decisions"
            />

          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Join the <span className="gradient-text">Theranostics Revolution</span>
          </h2>

          <p className="text-lg text-gray-300 mb-8">
            Partner with us to develop the next generation of precision radiopharmaceuticals.
            Together, we can transform cancer treatment through AI-driven innovation.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-20">
            <Button
              size="lg"
              className="bg-electric-blue hover:bg-electric-blue-glow text-white px-8 py-4 text-lg glow-electric transition-smooth"
              asChild
            >
              <Link to="/connect-careers#contact">
                Explore Partnership
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default WhatWeDo;