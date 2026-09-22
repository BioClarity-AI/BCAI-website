import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    ArrowLeft,
    ArrowRight,
    Brain,
    Code,
    Cpu,
    Database,
    Globe,
    ShieldCheck,
    Zap,
    Layers,
    Network,
    FlaskConical,
    Cloud,
    Github,
    CheckCircle2,
    CalendarDays,
    Target
} from "lucide-react";
import { Link } from "react-router-dom";

const AgenticAIEngineer = () => {
    const responsibilities = [
        {
            title: "MCP Engineering (Context + Tooling Integration)",
            icon: <Layers className="h-6 w-6 text-electric-blue" />,
            items: [
                "Design, build, and operate MCP servers exposing internal capabilities as standardized tools.",
                "Define MCP tooling patterns: tool schemas, input validation, and error taxonomy.",
                "Implement secure access patterns: OAuth/SSO integration, service identities, and auditing.",
                "Develop a repeatable 'MCP toolkit' including templates, dev harnesses, and deployment pipelines."
            ]
        },
        {
            title: "Agent Runtime & Tool Execution",
            icon: <Cpu className="h-6 w-6 text-neon-teal" />,
            items: [
                "Build and maintain the agent runtime for tool calling, sandboxing, and result persistence.",
                "Create a tool registry and policy layer: allowlists/denylists and permission gating.",
                "Implement end-to-end observability: tracing agent steps and tool invocations for scientific reproducibility."
            ]
        },
        {
            title: "Orchestration & Multi-Agent Systems",
            icon: <Network className="h-6 w-6 text-electric-blue" />,
            items: [
                "Design orchestration graphs/state machines for complex scientific workflows.",
                "Build specialized agents for literature synthesis, omics interpretation, and pathway analysis.",
                "Implement agent evaluation and regression testing using golden tasks and tool-mocking."
            ]
        },
        {
            title: "Agent2Agent (A2A) / Federated Collaboration",
            icon: <Globe className="h-6 w-6 text-neon-teal" />,
            items: [
                "Implement Agent2Agent-style interoperability for secure coordination with external specialists.",
                "Build 'federation' primitives: agent discovery, routing rules, and secure message exchange.",
                "Establish governance: provenance, audit trails, and human-in-the-loop escalation."
            ]
        }
    ];

    const focusAreas = [
        {
            title: "Bioinformatics & R&D Enablement",
            icon: <FlaskConical className="h-5 w-5 text-electric-blue" />,
            description: "Partner with AI scientists to translate R&D needs into agent tools (omics, annotations, knowledge mining)."
        },
        {
            title: "GCP Platform Ownership",
            icon: <Cloud className="h-5 w-5 text-neon-teal" />,
            description: "Maintain and scale GCP environment: compute, storage, networking, IAM, and cost controls."
        },
        {
            title: "GitHub & Engineering Operations",
            icon: <Github className="h-5 w-5 text-electric-blue" />,
            description: "Own CI/CD, branching strategies, secure SDLC practices, and supply-chain controls."
        }
    ];

    const milestones = [
        "Production-ready foundations: GCP IAM/secrets/observability and secure runtime environments.",
        "Working agent runtime with tracing, tool policies, and robust execution primitives.",
        "2–4 high-impact MCP servers exposing key R&D tooling and data catalogs.",
        "Multi-agent orchestration live for at least one end-to-end R&D workflow.",
        "Initial Agent2Agent interoperability path defined and piloted for federated collaboration."
    ];


    return (
        <div className="min-h-screen bg-background text-white font-sans selection:bg-electric-blue/30">
            <Navigation />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-charcoal to-background z-0" />
                <div className="absolute top-0 right-0 w-1/2 h-full bg-electric-blue/5 blur-[120px] rounded-full z-0 translate-x-1/4 -translate-y-1/4" />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
                    <Link to="/connect-careers" className="inline-flex items-center text-gray-400 hover:text-electric-blue mb-12 transition-all group">
                        <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Careers
                    </Link>

                    <div className="max-w-4xl">
                        <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-electric-blue/10 border border-electric-blue/20 text-electric-blue text-sm font-semibold tracking-wide">
                            PLATFORM ENGINEERING
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold mb-8">
                            IT Agentic AI <br />
                            <span className="gradient-text">Engineer</span>
                        </h1>

                        <p className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-10 max-w-3xl">
                            Engineering the <span className="text-white font-semibold italic">"operating system"</span> for AI-driven drug discovery. Build secure, reliable, and auditable agentic capabilities that solve complex modalities.
                        </p>

                        <div className="flex flex-wrap gap-5">
                            <a href="mailto:info@bioclarity.ai">
                                <Button size="lg" className="bg-electric-blue hover:bg-electric-blue-glow text-white px-10 py-6 text-lg glow-electric transition-smooth rounded-xl">
                                    Apply: Email info@bioclarity.ai
                                    <ArrowRight className="ml-2 h-6 w-6" />
                                </Button>
                            </a>
                            <div className="flex items-center space-x-3 bg-charcoal-light/50 backdrop-blur-sm rounded-xl px-6 py-4 border border-white/10 shadow-xl">
                                <Globe className="h-5 w-5 text-neon-teal" />
                                <span className="text-gray-200 font-medium">Remote Friendly / Hybrid</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Role Narrative Section */}
            <section className="py-20 border-y border-white/5 bg-charcoal/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl font-bold mb-8 flex items-center">
                                <Brain className="mr-4 h-8 w-8 text-electric-blue" />
                                The Narrative
                            </h2>
                            <div className="space-y-6 text-lg text-gray-400 leading-relaxed">
                                <p>
                                    At BioClarity AI, we aren't just using LLMs—we are building an <strong>agentic capability</strong>. This role owns the engineering of a production-grade <strong>agent runtime</strong> and <strong>multi-agent orchestration layer</strong>.
                                </p>
                                <p>
                                    You will standardize tool/context integrations via the <strong>Model Context Protocol (MCP)</strong> and enable federated collaboration via <strong>Agent-to-Agent (A2A)</strong> patterns. You'll bridge the gap between AI scientists and hard engineering, ensuring scientific reproducibility at scale.
                                </p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Card className="bg-charcoal/40 border-white/10 p-6 hover:border-electric-blue/30 transition-all">
                                <div className="text-3xl font-bold text-electric-blue mb-2">A2A</div>
                                <div className="text-sm text-gray-400 uppercase tracking-widest">Federation</div>
                            </Card>
                            <Card className="bg-charcoal/40 border-white/10 p-6 hover:border-electric-blue/30 transition-all">
                                <div className="text-3xl font-bold text-neon-teal mb-2">MCP</div>
                                <div className="text-sm text-gray-400 uppercase tracking-widest">Protocol Standard</div>
                            </Card>
                            <Card className="bg-charcoal/40 border-white/10 p-6 hover:border-electric-blue/30 transition-all">
                                <div className="text-3xl font-bold text-electric-blue mb-2">GCP</div>
                                <div className="text-sm text-gray-400 uppercase tracking-widest">Cloud Runtime</div>
                            </Card>
                            <Card className="bg-charcoal/40 border-white/10 p-6 hover:border-electric-blue/30 transition-all">
                                <div className="text-3xl font-bold text-neon-teal mb-2">SDLC</div>
                                <div className="text-sm text-gray-400 uppercase tracking-widest">Automation</div>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* Deep Dive Responsibilities */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">Core Strategic Pillars</h2>
                        <p className="text-gray-400 text-lg">Detailed responsibilities and technical ownership</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {responsibilities.map((resp, idx) => (
                            <Card key={idx} className="bg-charcoal-light/20 border-white/5 hover:border-electric-blue/20 transition-all overflow-hidden group">
                                <CardContent className="p-8">
                                    <div className="flex items-center mb-6">
                                        <div className="mr-4 p-3 rounded-xl bg-charcoal/80 border border-white/5 group-hover:scale-110 transition-transform">
                                            {resp.icon}
                                        </div>
                                        <h3 className="text-xl font-bold">{resp.title}</h3>
                                    </div>
                                    <ul className="space-y-4">
                                        {resp.items.map((item, i) => (
                                            <li key={i} className="flex gap-3 text-gray-400 text-sm leading-relaxed">
                                                <CheckCircle2 className="h-5 w-5 text-neon-teal shrink-0 mt-0.5" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Technical Foundations & Ops */}
            <section className="py-24 bg-charcoal-light/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
                    <h2 className="text-3xl font-bold mb-4">Engineering Foundations</h2>
                    <p className="text-gray-400">Platform and operations ownership to support agency at scale</p>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {focusAreas.map((area, idx) => (
                            <div key={idx} className="flex flex-col items-center text-center p-8 rounded-2xl bg-charcoal/50 border border-white/5 hover:border-neon-teal/20 transition-all">
                                <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center mb-6">
                                    {area.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-4">{area.title}</h3>
                                <p className="text-gray-400 leading-relaxed text-sm">{area.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Requirements & Milestones Grid */}
            <section className="py-24 overflow-hidden relative">
                <div className="absolute top-1/2 left-0 w-64 h-64 bg-neon-teal/5 blur-[100px] rounded-full z-0 translate-y-full" />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                        {/* Qualifications Card */}
                        <div className="lg:col-span-8 space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <Card className="bg-charcoal/30 border-electric-blue/20 p-8 h-full">
                                    <h3 className="text-2xl font-bold mb-6 flex items-center">
                                        <ShieldCheck className="mr-3 h-6 w-6 text-electric-blue" />
                                        Required Qualifications
                                    </h3>
                                    <ul className="space-y-4">
                                        {[
                                            "5+ years building/operating production software.",
                                            "Exemplary experience with GCP (IAM, networking, containers).",
                                            "Strong GitHub Ops and CI/CD foundations.",
                                            "Hands-on with LLM toolcalling & agentic workflows.",
                                            "Strong Python skills (API design & distributed systems).",
                                            "Ability to work effectively with Research/Bioinformatics teams."
                                        ].map((req, i) => (
                                            <li key={i} className="flex gap-3 text-gray-400 text-sm leading-relaxed">
                                                <div className="h-1.5 w-1.5 rounded-full bg-electric-blue shrink-0 mt-1.5" />
                                                {req}
                                            </li>
                                        ))}
                                    </ul>
                                </Card>

                                <Card className="bg-charcoal/30 border-neon-teal/20 p-8 h-full">
                                    <h3 className="text-2xl font-bold mb-6 flex items-center">
                                        <CheckCircle2 className="mr-3 h-6 w-6 text-neon-teal" />
                                        Preferred Experience
                                    </h3>
                                    <ul className="space-y-4">
                                        {[
                                            "Direct experience with Model Context Protocol (MCP).",
                                            "Multi-agent orchestration (graphs/state-machines).",
                                            "Federated agent patterns (Agent2Agent/A2A).",
                                            "Scientific provenance, lineage, and reproducibility systems.",
                                            "Familiarity with workflow engines (Airflow/Dagster/Nextflow).",
                                            "Experience with Kubernetes (GKE) or Cloud Run."
                                        ].map((pref, i) => (
                                            <li key={i} className="flex gap-3 text-gray-400 text-sm leading-relaxed">
                                                <div className="h-1.5 w-1.5 rounded-full bg-neon-teal shrink-0 mt-1.5" />
                                                {pref}
                                            </li>
                                        ))}
                                    </ul>
                                </Card>
                            </div>

                            {/* Success Milestones Card */}
                            <Card className="card-gradient border-white/10 p-10 overflow-hidden relative">
                                <div className="absolute top-0 right-0 p-4">
                                    <CalendarDays className="h-32 w-32 text-white/5 -mr-8 -mt-8" />
                                </div>
                                <div className="relative z-10">
                                    <h3 className="text-3xl font-bold mb-8 flex items-center">
                                        <Target className="mr-4 h-8 w-8 text-electric-blue" />
                                        What Success Looks Like (First 90 Days)
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {milestones.map((milestone, i) => (
                                            <div key={i} className="flex gap-4 p-5 rounded-xl bg-background/40 border border-white/5">
                                                <span className="text-electric-blue font-mono font-bold">0{i + 1}</span>
                                                <p className="text-sm text-gray-300 leading-relaxed">{milestone}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </Card>
                        </div>

                        {/* Sticky Action Card */}
                        <div className="lg:col-span-4 mt-12 lg:mt-0">
                            <Card className="bg-charcoal-light/30 border-white/10 p-8 text-center sticky top-24 backdrop-blur-md">
                                <div className="w-20 h-20 rounded-2xl bg-electric-blue/10 flex items-center justify-center mx-auto mb-6 glow-electric">
                                    <RocketIcon />
                                </div>
                                <h3 className="text-2xl font-bold mb-4">Start Your Mission</h3>
                                <p className="text-gray-400 mb-8 text-sm">Join the team accelerating the next generation of precision medicine.</p>
                                <div className="space-y-4">
                                    <a href="mailto:info@bioclarity.ai">
                                        <Button className="w-full bg-electric-blue hover:bg-electric-blue-glow h-14 text-white font-bold rounded-xl glow-electric flex items-center justify-center">
                                            Apply: Email info@bioclarity.ai
                                        </Button>
                                    </a>
                                    <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em]">BioClarity AI Inc. is an equal opportunity employer</p>
                                </div>
                            </Card>
                        </div>

                    </div>
                </div>
            </section>

            {/* Footer / CTA Footer */}
            <section className="py-24 border-t border-white/5 bg-charcoal/30">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-8">Why This Role Matters</h2>
                    <p className="text-xl text-gray-300 italic mb-12">
                        "You’ll build the operating system for how R&D teams interact with tools, data, and AI—turning agentic AI into a secure, reliable, auditable capability that accelerates discovery."
                    </p>
                    <Link to="/connect-careers">
                        <Button variant="ghost" className="text-electric-blue hover:text-electric-blue-glow hover:bg-transparent text-lg group">
                            Explore other open missions
                            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform" />
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    );
};

const RocketIcon = () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.5 16.5C4.5 16.5 4.5 20.5 2.5 21.5C4.5 21.5 8.5 21.5 8.5 21.5C8.5 21.5 9.5 20.5 10.5 19.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M15 9L5.5 18.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 15L18.5 5.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M11 7L13.5 4.5C14.5 3.5 16.5 3.5 17.5 4.5C18.5 5.5 18.5 7.5 17.5 8.5L15 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7 11L4.5 13.5C3.5 14.5 3.5 16.5 4.5 17.5C5.5 18.5 7.5 18.5 8.5 17.5L11 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M20 7.5L20.5 8C21.5 9 21.5 11 20.5 12L19.5 13L16 9.5L17 8.5C18 7.5 20 7.5 20 7.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export default AgenticAIEngineer;
