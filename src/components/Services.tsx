import {Search, UserCheck, Shield, Mic2, Building2, HeartPulse, Factory} from 'lucide-react';

const Services = () => {
    const services = [
        {
            icon: <Search size={40}/>,
            title: "Job Placement",
            description: "Connecting candidates with suitable job opportunities and employers for successful placements."
        },
        {
            icon: <UserCheck size={40}/>,
            title: "CV Shortlisting",
            description: "Thoroughly reviewing and shortlisting CVs to match the best candidates with job requirements."
        },
        {
            icon: <Shield size={40}/>,
            title: "Document Verification",
            description: "Ensuring authenticity and accuracy of candidate documents for a reliable hiring process."
        }
    ];

    const interviewGuidance = {
        icon: <Mic2 size={56} className="text-blue-600" />,
        title: "Interview Guidance",
        description: "Ace your interviews with expert tips, personalized coaching, and proven strategies to help you stand out and succeed.",
        highlight: "Main Focus Service"
    };

    const statutoryServices = [
        {
            icon: <Building2 size={40}/>,
            title: "EPFO",
            description: "• Effective - Inspection & Hearing with PF commissioner of 7-A, 14B, 7Q cases\n" +
                "• Submission of regular challans and maintaining all records\n" +
                "• PF Registration of new unit"
        },
        {
            icon: <HeartPulse size={40}/>,
            title: "ESIC",
            description: "• Effective - Inspection & Hearing with ESI Commissioner\n" +
                "• Submission of regular challans and maintaining all records.\n" +
                "• ESIC Registration of new unit."
        },
        {
            icon: <Factory size={40}/>,
            title: "DISH (Factory Inspector)",
            description: "• Registration of new unit & Licence.\n" +
                "• Renewal of Factory Licence.\n" +
                "• Submission of yearly return.\n"
        }
    ];

    const ServiceCard = ({ service }: { service: typeof services[0] }) => (
        <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="text-blue-600 mb-4">
                {service.icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {service.title}
            </h3>
            <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                {service.description}
            </p>
        </div>
    );

    const InterviewGuidanceCard = ({ service }: { service: typeof interviewGuidance }) => (
        <div className="bg-emerald-100 p-12 shadow-[0_12px_48px_rgba(0,0,0,0.25)] flex flex-col items-center justify-center mb-16 mx-auto max-w-2xl animate-[breathe_3s_ease-in-out_infinite]">
            <div className="mb-4 opacity-100">
                {service.icon}
            </div>
            <h3 className="text-3xl font-extrabold text-gray-900 mb-3 drop-shadow-lg opacity-100">
                {service.title}
            </h3>
            <p className="text-lg text-gray-700 mb-2 text-center opacity-100">
                {service.description}
            </p>
        </div>
    );

    return (
        <section id="services" className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Placement Services */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        We offer comprehensive placement solutions to help you advance your career
                        and help companies find the perfect talent.
                    </p>
                </div>

                {/* Interview Guidance Main Focus Card */}
                <InterviewGuidanceCard service={interviewGuidance} />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
                    {services.map((service, index) => (
                        <ServiceCard key={index} service={service} />
                    ))}
                </div>

                {/* Statutory Services */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Statutory Compliances</h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Comprehensive assistance with legal and regulatory requirements to ensure your business
                        stays compliant with all necessary regulations.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {statutoryServices.map((service, index) => (
                        <ServiceCard key={index} service={service} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;

