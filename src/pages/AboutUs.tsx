import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { ChevronDown, ChevronUp, Target, Activity, Zap, ExternalLink, FileText, BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';



const AboutUs = () => {
    return (
        <div className="min-h-screen bg-background relative selection:bg-neon-teal/30 selection:text-white">
            <Navigation />

            {/* Hero Section */}
            <section className="pt-28 pb-12 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-electric-blue/10 via-background to-background"></div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-neon-teal/5 rounded-full blur-[120px] pointer-events-none"></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-10">
                    <h1 className="text-4xl md:text-6xl font-bold mb-12">
                        About <span className="gradient-text">BioClarity AI</span>
                    </h1>

                    <div className="max-w-4xl mx-auto space-y-12 text-left">
                        <div className="border-l-4 border-neon-teal/50 pl-6 fade-in" style={{ animationDelay: '0.1s' }}>
                            <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                                <Target className="w-5 h-5 text-neon-teal" /> Mission
                            </h2>
                            <p className="text-lg md:text-xl font-light text-gray-300 leading-relaxed italic">
                                "To replace trial-and-error with computational certainty. We orchestrate the future of radiopharmaceuticals through autonomous AI, bridging the gap between molecular design and clinical success."
                            </p>
                        </div>

                        <div className="border-l-4 border-electric-blue/50 pl-6 fade-in" style={{ animationDelay: '0.2s' }}>
                            <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                                <Zap className="w-5 h-5 text-electric-blue" /> Vision
                            </h2>
                            <p className="text-lg md:text-xl font-light text-gray-300 leading-relaxed italic">
                                "To be the foundational engine for agentic AI in drug discovery, where every complex biological challenge is solved through autonomous, intelligent orchestration."
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Journey */}
            <section className="py-16 relative border-t border-white/5 bg-charcoal-light/30">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neon-teal/5 via-transparent to-transparent pointer-events-none"></div>
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-10">
                        Our <span className="gradient-text">Journey</span>
                    </h2>

                    <div className="border-l-4 border-neon-teal/50 pl-6 fade-in">
                        <p className="text-lg md:text-xl font-light text-gray-300 leading-relaxed max-w-4xl italic">
                            Born from Dr. Ayan Chatterjee’s research at Northeastern, BioClarity AI evolved from mastering high-fidelity protein engineering to setting the standard for Radioconjugate discovery. We apply the rigorous stability and clinical standards of established biologics to the frontier of Radioligand Therapy. We don't just design molecules; we orchestrate their clinical success.
                        </p>
                    </div>
                </div>
            </section>

            {/* Interactive Core Focus */}
            <section className="py-16 relative z-10">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 w-full">
                        <div className="flex flex-col group">
                            <div className="flex items-center mb-4">
                                <div className="p-3 bg-electric-blue/5 border border-electric-blue/10 rounded-xl mr-4 group-hover:bg-electric-blue/10 transition-colors">
                                    <Target className="h-6 w-6 text-electric-blue" />
                                </div>
                                <h3 className="text-2xl font-bold text-white">The Problem</h3>
                            </div>
                            <div className="text-gray-300 space-y-4 leading-relaxed font-light pl-16">
                                <p>Modern drug development faces an enormous challenge: many promising therapies fail during preclinical or clinical stages due to unexpected toxicity, poor pharmacokinetics, or manufacturing constraints. These failures often occur because key aspects of development are evaluated in isolation.</p>
                                <p>BioClarity AI is focused on addressing this gap by building integrated computational systems that allow researchers to explore these interconnected factors together.</p>
                            </div>
                        </div>

                        <div className="flex flex-col group">
                            <div className="flex items-center mb-4">
                                <div className="p-3 bg-neon-teal/5 border border-neon-teal/10 rounded-xl mr-4 group-hover:bg-neon-teal/10 transition-colors">
                                    <Activity className="h-6 w-6 text-neon-teal" />
                                </div>
                                <h3 className="text-2xl font-bold text-white">Scientific Focus</h3>
                            </div>
                            <div className="text-gray-300 space-y-4 leading-relaxed font-light pl-16">
                                <p>BioClarity AI focuses on applying computational modeling and artificial intelligence to complex therapeutic systems such as radioconjugates, predictive ADMET modeling, and pharmacokinetic simulations.</p>
                                <ul className="space-y-2 mt-4 text-sm text-gray-400 font-normal">
                                    <li className="flex items-center"><div className="h-1 w-1 rounded-full bg-neon-teal mr-3 shrink-0"></div> Radioconjugate therapies</li>
                                    <li className="flex items-center"><div className="h-1 w-1 rounded-full bg-neon-teal mr-3 shrink-0"></div> Targeted molecular delivery systems</li>
                                    <li className="flex items-center"><div className="h-1 w-1 rounded-full bg-neon-teal mr-3 shrink-0"></div> Predictive ADMET & simulations</li>
                                    <li className="flex items-center"><div className="h-1 w-1 rounded-full bg-neon-teal mr-3 shrink-0"></div> AI-assisted molecular design</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>



            {/* Leadership & Advisory Team */}
            <section className="py-16 bg-charcoal-light/30 relative border-t border-white/5">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-electric-blue/30 to-transparent"></div>

                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-4">Leadership <span className="gradient-text">Team</span></h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">BioClarity AI is led by scientists and technology leaders with experience in computational biology, artificial intelligence, and translational medicine.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
                        {/* CEO Profile */}
                        <div className="flex flex-col items-center text-center group">
                            <div className="w-40 h-40 rounded-full bg-gradient-to-br from-electric-blue/30 to-neon-teal/10 border-2 border-electric-blue/50 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(0,229,255,0.15)] group-hover:scale-105 transition-transform duration-500 overflow-hidden relative">
                                {/* Placeholder for Photo */}
                                <img
                                    src="/images/Ayan.jpg"
                                    alt="Dr. Ayan Chatterjee"
                                    className="w-full h-full object-cover rounded-full filter"
                                />
                                <div className="absolute inset-0 bg-electric-blue/10 mix-blend-overlay"></div>
                            </div>
                            <h3 className="text-2xl font-bold text-white">Dr. Ayan Chatterjee</h3>
                            <p className="text-electric-blue font-semibold mb-4 text-lg">Chief Executive Officer</p>
                            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                                Dr. Ayan Chatterjee bridges biological complexity with machine learning to solve the cold start problem in drug discovery. A specialist in molecular modeling and pharmacology, he develops AI frameworks to predict interactions for novel proteins and ligands while optimizing PK/PD profiles to reduce toxicity. His expertise is instrumental in the computational design of next generation theranostics and radioconjugates, advancing evidence based methods for high precision therapeutics. By architecting agentic AI systems that orchestrate complex biological models, Dr. Chatterjee transforms fragmented research into automated high velocity workflows that accelerate the path to clinical application.
                            </p>
                        </div>

                        {/* COO Profile */}
                        <div className="flex flex-col items-center text-center group">
                            <div className="w-40 h-40 rounded-full bg-gradient-to-br from-neon-teal/30 to-electric-blue/10 border-2 border-neon-teal/50 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(29,233,182,0.15)] group-hover:scale-105 transition-transform duration-500 overflow-hidden relative">
                                {/* Placeholder for Photo */}
                                <img
                                    src="/images/Smitha.jpg"
                                    alt="Smitha Narendra"
                                    className="w-full h-full object-cover rounded-full filter border-4 border-white bg-white"
                                />
                                <div className="absolute inset-0 bg-neon-teal/10 mix-blend-overlay"></div>
                            </div>
                            <h3 className="text-2xl font-bold text-white">Smitha Narendra</h3>
                            <p className="text-neon-teal font-semibold mb-4 text-lg">Chief Operating Officer</p>
                            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                                Smitha Narendra is a cross functional operations leader with over 15 years of experience driving digital transformation and systems thinking across the technology, healthcare, and manufacturing sectors. At BioClarity AI, she orchestrates operational strategy and program execution, building the scalable infrastructure and governance frameworks necessary to support complex biological research. With a technical background in information technology and a track record of streamlining enterprise level workflows, Smitha aligns engineering and scientific teams to ensure high velocity delivery and operational excellence.
                            </p>
                        </div>
                    </div>

                    {/* Advisory Board (Integrated) */}
                    <div className="text-center pt-12 border-t border-white/5">
                        <h2 className="text-2xl font-bold text-white mb-2">Advisory <span className="gradient-text">Board</span></h2>
                        <p className="text-gray-400 max-w-2xl mx-auto mb-8 text-sm">BioClarity AI is guided by a distinguished board of advisors bringing decades of expertise across business strategy and academia.</p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-16">
                            <div className="text-center">
                                <h3 className="text-lg font-bold text-white">Don DeLoach</h3>
                                <p className="text-neon-teal text-sm font-medium">Business Advisor</p>
                            </div>
                            <div className="hidden sm:block w-1 h-8 bg-white/10 rounded-full"></div>
                            <div className="text-center">
                                <h3 className="text-lg font-bold text-white">Maryam Saleh</h3>
                                <p className="text-electric-blue text-sm font-medium">Business Advisor</p>
                            </div>
                            <div className="hidden sm:block w-1 h-8 bg-white/10 rounded-full"></div>
                            <div className="text-center">
                                <h3 className="text-lg font-bold text-white">Tina Eliassi-Rad</h3>
                                <p className="text-neon-teal text-sm font-medium">Academic Advisor</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Scientific Publications Footer */}
            <section className="py-16 relative overflow-hidden bg-background">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-electric-blue/5 via-transparent to-transparent pointer-events-none"></div>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="mb-10 text-center">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Scientific <span className="gradient-text">Publications</span></h2>
                        <p className="text-lg text-gray-300 max-w-3xl mx-auto font-light">
                            Dr. Ayan Chatterjee’s research in artificial intelligence, network science, and computational modeling has garnered <span className="text-electric-blue font-bold">300+ citations</span>, contributing to advancements in AI-driven biomedical discovery.
                        </p>
                    </div>

                    <div className="space-y-0 divide-y divide-white/5 border-y border-white/5 mb-12">
                        {/* Publication 1 */}
                        <a href="https://www.nature.com/articles/s41467-023-37572-z" target="_blank" rel="noopener noreferrer" className="group flex items-start sm:items-center justify-between py-5 hover:bg-white/5 transition-colors px-4 -mx-4 rounded-lg">
                            <div className="pr-4 flex items-center gap-4">
                                <FileText className="w-5 h-5 text-electric-blue/70 group-hover:text-electric-blue shrink-0" />
                                <div>
                                    <h4 className="text-base text-white font-semibold group-hover:text-electric-blue transition-colors leading-tight">Improving the generalizability of protein-ligand binding predictions with AI-Bind</h4>
                                    <p className="text-gray-400 font-medium text-xs mt-1">Nature Communications</p>
                                </div>
                            </div>
                            <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-electric-blue shrink-0 ml-4" />
                        </a>

                        {/* Publication 2 */}
                        <a href="https://arxiv.org/abs/2112.13168" target="_blank" rel="noopener noreferrer" className="group flex items-start sm:items-center justify-between py-5 hover:bg-white/5 transition-colors px-4 -mx-4 rounded-lg">
                            <div className="pr-4 flex items-center gap-4">
                                <BookOpen className="w-5 h-5 text-neon-teal/70 group-hover:text-neon-teal shrink-0" />
                                <div>
                                    <h4 className="text-base text-white font-semibold group-hover:text-neon-teal transition-colors leading-tight">AI-Bind: Improving Binding Predictions for Novel Protein Targets and Ligands</h4>
                                    <p className="text-gray-400 font-medium text-xs mt-1">arXiv Preprints</p>
                                </div>
                            </div>
                            <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-neon-teal shrink-0 ml-4" />
                        </a>

                        {/* Publication 3 */}
                        <a href="https://academic.oup.com/bioinformatics/article/41/5/btaf148/8107765?guestAccessKey=" target="_blank" rel="noopener noreferrer" className="group flex items-start sm:items-center justify-between py-5 hover:bg-white/5 transition-colors px-4 -mx-4 rounded-lg">
                            <div className="pr-4 flex items-center gap-4">
                                <FileText className="w-5 h-5 text-neon-teal/70 group-hover:text-neon-teal shrink-0" />
                                <div>
                                    <h4 className="text-base text-white font-semibold group-hover:text-neon-teal transition-colors leading-tight">Topology-driven negative sampling enhances generalizability in protein–protein interaction prediction</h4>
                                    <p className="text-gray-400 font-medium text-xs mt-1">Bioinformatics (Oxford Academic)</p>
                                </div>
                            </div>
                            <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-neon-teal shrink-0 ml-4" />
                        </a>

                        {/* Publication 4 */}
                        <a href="https://ieeexplore.ieee.org/abstract/document/11228624" target="_blank" rel="noopener noreferrer" className="group flex items-start sm:items-center justify-between py-5 hover:bg-white/5 transition-colors px-4 -mx-4 rounded-lg">
                            <div className="pr-4 flex items-center gap-4">
                                <BookOpen className="w-5 h-5 text-electric-blue/70 group-hover:text-electric-blue shrink-0" />
                                <div>
                                    <h4 className="text-base text-white font-semibold group-hover:text-electric-blue transition-colors leading-tight">Transfer Learning for Temporal Link Prediction</h4>
                                    <p className="text-gray-400 font-medium text-xs mt-1">IEEE Xplore</p>
                                </div>
                            </div>
                            <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-electric-blue shrink-0 ml-4" />
                        </a>
                    </div>

                    <div className="bg-charcoal-light/30 border border-white/5 rounded-xl p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                        <div>
                            <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Are you interested in exploring more?</h3>
                            <p className="text-gray-400 text-lg">View the full breadth of Dr. Chatterjee's scientific impact and ongoing research.</p>
                        </div>
                        <a
                            href="https://scholar.google.com/citations?view_op=list_works&hl=en&hl=en&user=jQWO9kgAAAAJ"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-shrink-0 inline-flex items-center space-x-2 bg-charcoal border border-neon-teal/50 hover:bg-neon-teal hover:text-charcoal text-neon-teal font-bold py-3 px-6 rounded-lg transition-all duration-300"
                        >
                            <span>Google Scholar Profile</span>
                            <ExternalLink className="w-5 h-5 ml-2" />
                        </a>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default AboutUs;
