import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, ArrowRight, MapPin } from "lucide-react";

const ContactUs = () => {
    return (
        <div className="min-h-screen bg-background">
            <Navigation />

            {/* Hero Section */}
            <section className="pt-20 pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="text-center max-w-4xl mx-auto">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            <span className="gradient-text">Get in Touch</span>
                            <br />
                            <span className="text-white">Connect with BioClarity AI</span>
                        </h1>

                        <p className="text-xl text-gray-300 leading-relaxed">
                            Whether you're interested in partnerships, collaborations, or have a general inquiry,
                            our team is ready to discuss how we can transform drug discovery together.
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Contact Section */}
            <section className="py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Card className="card-gradient border-electric-blue/30 shadow-2xl">
                        <CardHeader className="text-center border-b border-electric-blue/10 pb-8">
                            <div className="w-20 h-20 bg-electric-blue/20 rounded-full flex items-center justify-center mx-auto mb-6 glow-electric">
                                <Mail className="h-10 w-10 text-electric-blue" />
                            </div>
                            <CardTitle className="text-3xl text-white">Direct Email Inquiry</CardTitle>
                        </CardHeader>

                        <CardContent className="pt-12 pb-12 text-center">
                            <p className="text-lg text-gray-400 mb-8">
                                Click the link below to send an email directly to our team.
                                We typically respond within 24-48 business hours.
                            </p>

                            <a
                                href="mailto:info@bioclarity.ai?subject=BioClarity AI Inquiry"
                                className="inline-flex items-center text-3xl md:text-4xl font-bold text-electric-blue hover:text-electric-blue-glow transition-all border-b-2 border-electric-blue pb-2"
                            >
                                info@bioclarity.ai
                                <ArrowRight className="ml-4 h-8 w-8" />
                            </a>

                            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 text-left border-t border-electric-blue/10 pt-12">
                                <div>
                                    <h3 className="font-semibold text-white text-xl mb-4">Location</h3>
                                    <div className="flex items-start space-x-3 text-gray-300">
                                        <MapPin className="h-6 w-6 text-electric-blue shrink-0" />
                                        <span>Boston, MA<br />United States</span>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white text-xl mb-4">Our Mission</h3>
                                    <p className="text-gray-300 text-sm leading-relaxed">
                                        BioClarity AI is dedicated to accelerating the development of precision medicines
                                        through the seamless integration of generative biology and advanced radiochemistry.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* LinkedIn Follow */}
            <section className="py-16 bg-charcoal-light/30">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                        Stay Updated on Our <span className="gradient-text">Latest Breakthroughs</span>
                    </h2>

                    <p className="text-lg text-gray-300 mb-8">
                        Follow us on LinkedIn for the latest updates on AI-driven drug discovery,
                        research publications, and partnership opportunities.
                    </p>

                    <div className="flex justify-center">
                        <a
                            href="https://www.linkedin.com/company/bioclarity-ai"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-2xl font-bold text-neon-teal hover:text-neon-teal-glow transition-all border-b-2 border-neon-teal pb-1"
                        >
                            BioClarity AI on LinkedIn
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ContactUs;