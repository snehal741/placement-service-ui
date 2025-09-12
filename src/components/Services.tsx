import { Search, UserCheck, Shield } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: <Search size={40} />,
      title: "Job Placement",
      description: "Connecting candidates with suitable job opportunities and employers for successful placements."
    },
    {
      icon: <UserCheck size={40} />,
      title: "CV Shortlisting",
      description: "Thoroughly reviewing and shortlisting CVs to match the best candidates with job requirements."
    },
    {
      icon: <Shield size={40} />,
      title: "Document Verification",
      description: "Ensuring authenticity and accuracy of candidate documents for a reliable hiring process."
    }
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We offer comprehensive placement solutions to help you advance your career 
            and help companies find the perfect talent.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="text-blue-600 mb-4">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;