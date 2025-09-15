import {Users, Award, Globe} from 'lucide-react';

const About = () => {

    return (
        <section id="about" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-16 items-center">
                    <div className="max-w-none">
                        <h2 className="text-4xl font-bold text-gray-900 mb-6">
                            About Mauli Placements & Consultancy Services
                        </h2>
                        <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                            Our consultant, Mr. Pandit Bobade, has 29+ years of experience in HR departments across
                            various industries.
                            He spent the maximum period working with Savera Groups of Industries at Chh. Sambhajinagar
                            as HR Head,
                            gaining vast experience in recruitment (from trainee to managerial level) and handling all
                            government
                            official statutory compliances such as Factory Inspector, PF Commissioner, ESIC
                            Commissioner, Labour Office,
                            MPCB & Labour Welfare Department.
                        </p>
                        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                            We are a professionally managed consultancy with a long-term vision, dedicated to
                            identifying lucrative job
                            opportunities for Indian professionals globally.
                        </p>

                    </div>
                </div>

                <div className="mt-20">
                    <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
                        What Sets Us Apart
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center p-6">
                            <div
                                className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Users className="text-blue-600" size={32}/>
                            </div>
                            <h4 className="text-xl font-semibold text-gray-900 mb-3">Personalized Approach</h4>
                            <p className="text-gray-600">
                                We take time to understand each candidate's unique skills, career goals, and
                                preferences.
                            </p>
                        </div>
                        <div className="text-center p-6">
                            <div
                                className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Award className="text-emerald-600" size={32}/>
                            </div>
                            <h4 className="text-xl font-semibold text-gray-900 mb-3">Industry Expertise</h4>
                            <p className="text-gray-600">
                                We have deep knowledge across multiple industries and job functions.
                            </p>
                        </div>
                        <div className="text-center p-6">
                            <div
                                className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Globe className="text-orange-600" size={32}/>
                            </div>
                            <h4 className="text-xl font-semibold text-gray-900 mb-3">Extensive Network</h4>
                            <p className="text-gray-600">
                                Strong relationships with companies across various sectors.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;