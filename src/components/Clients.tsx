import { useEffect, useRef } from 'react';

const Clients = () => {
    const scrollRef = useRef<HTMLDivElement>(null);

    const clients = [
        {
            name: "Lupin Limited",
            website: "www.lupin.com"
        },
        {
            name: "Mylan laboratories",
            website: "www.mylan.com"
        },
        {
            name: "Ajanta Pharma Limited",
            website: "www.ajantapharma.com"
        },
        {
            name: "Johnson & Johnson Ltd.",
            website: "www.jnj.in"
        },
        {
            name: "Glenmark Pharmaceuticals Ltd.",
            website: "www.glenmarkpharma.com"
        },
        {
            name: "Varroc Engineering Pvt. Ltd.",
            website: "www.varroc.com"
        },
        {
            name: "Aurangabad Electricals",
            website: "www.aurangabadelectricals.com"
        },
        {
            name: "Umasons Auto Compo",
            website: "www.umasons.com"
        },
        {
            name: "Harman Finochem Ltd.",
            website: "www.harmanfinochem.com"
        },
        {
            name: "Shreya Life Sciences Pvt Ltd.",
            website: "www.shreyalifesciences.com"
        },
        {
            name: "Midas Care Pharma Pvt.",
            website: "www.midascare.com"
        },
        {
            name: "Encore Pharmaceuticals Ltd.",
            website: "www.encorepharma.com"
        },
        {
            name: "FDC Limited",
            website: "www.fdcindia.com"
        },
        {
            name: "Endurance Technologies Ltd.",
            website: "www.endurancegroup.com"
        },
        {
            name: "Rucha Engineers Pvt. Ltd.",
            website: "www.ruchaengineers.com"
        },
        {
            name: "Akar Tools Ltd.",
            website: "www.akartools.com"
        },
        {
            name: "Wockhardt Research Centre",
            website: "www.wockhardt.com"
        },
        {
            name: "RV Lifescience Ltd.",
            website: "www.rvlifescience.com"
        },
        {
            name: "Matrix Life Science Pvt. Ltd.",
            website: "www.matrixlifescience.com"
        },
        {
            name: "Sydler Remedies Pvt. Ltd.",
            website: "www.sydlerremedies.com"
        },
        {
            name: "Yashshree Press Comps.",
            website: "www.yashshree.com"
        },
        {
            name: "Marathwada Auto Comps.",
            website: "www.marathwadaauto.com"
        },
        {
            name: "Dhoot Transmission Ltd.",
            website: "www.dhoottransmission.com"
        }
    ];

    useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer) return;

        let animationId: number;
        let isPaused = false;

        const scroll = () => {
            if (!isPaused && scrollContainer) {
                scrollContainer.scrollLeft += 0.5; // Adjust speed here

                // Check if we've scrolled past the first set of clients
                const halfWidth = scrollContainer.scrollWidth / 2;
                if (scrollContainer.scrollLeft >= halfWidth) {
                    scrollContainer.scrollLeft = 0;
                }
            }
            animationId = requestAnimationFrame(scroll);
        };

        const handleMouseEnter = () => {
            isPaused = true;
        };

        const handleMouseLeave = () => {
            isPaused = false;
        };

        scrollContainer.addEventListener('mouseenter', handleMouseEnter);
        scrollContainer.addEventListener('mouseleave', handleMouseLeave);

        // Start the animation
        animationId = requestAnimationFrame(scroll);

        return () => {
            cancelAnimationFrame(animationId);
            scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
            scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-blue-600 mb-4">
                        Our Trusted Clients
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Leading companies in pharmaceuticals, engineering, and manufacturing sectors trust our services
                    </p>
                </div>

                <div className="relative">
                    <div
                        ref={scrollRef}
                        className="flex overflow-x-auto scrollbar-hide gap-6 pb-4 px-2"
                        style={{ scrollBehavior: 'auto' }}
                    >
                        {/* Duplicate clients array for seamless infinite loop */}
                        {[...clients, ...clients].map((client, index) => (
                            <div
                                key={index}
                                className="bg-gray-50 p-6 rounded-lg text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 min-w-[280px] flex-shrink-0"
                            >
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    {client.name}
                                </h3>
                                <a
                                    href={`https://${client.website}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-blue-800 text-sm transition-colors underline"
                                >
                                    {client.website}
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Clients;
