import { ArrowRight } from 'lucide-react';

const Hero = () => {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="pt-20 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Your Dream Job
              <span className="text-emerald-400 block">Awaits You</span>
            </h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              Connect with top employers and find the perfect career opportunity. 
              We specialize in matching talented professionals with leading companies 
              across various industries.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={scrollToContact}
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-all transform hover:scale-105"
              >
                <span>Submit Your Resume</span>
                <ArrowRight size={20} />
              </button>
              <button 
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                className="border-2 border-white text-white hover:bg-white hover:text-blue-800 px-8 py-4 rounded-lg font-semibold transition-all"
              >
                Our Services
              </button>
            </div>
          </div>
          
          <div className="relative">
            <img 
              src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800" 
              alt="Professional team meeting"
              className="rounded-lg shadow-2xl"
            />
          </div>
        </div>

        {/* Stats Section */}
        {/*<div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">*/}
        {/*  <div className="text-center p-6">*/}
        {/*    <Users size={48} className="mx-auto text-emerald-400 mb-4" />*/}
        {/*    <h3 className="text-2xl font-bold">Expert Team</h3>*/}
        {/*    <p className="text-blue-100 mt-2">Professional recruitment specialists with years of experience</p>*/}
        {/*  </div>*/}
        {/*  <div className="text-center p-6">*/}
        {/*    <Briefcase size={48} className="mx-auto text-emerald-400 mb-4" />*/}
        {/*    <h3 className="text-2xl font-bold">Quality Jobs</h3>*/}
        {/*    <p className="text-blue-100 mt-2">Curated opportunities from top-tier companies across industries</p>*/}
        {/*  </div>*/}
        {/*  <div className="text-center p-6">*/}
        {/*    <TrendingUp size={48} className="mx-auto text-emerald-400 mb-4" />*/}
        {/*    <h3 className="text-2xl font-bold">Career Growth</h3>*/}
        {/*    <p className="text-blue-100 mt-2">Focus on long-term career advancement and professional development</p>*/}
        {/*  </div>*/}
        {/*</div>*/}
      </div>
    </section>
  );
};

export default Hero;