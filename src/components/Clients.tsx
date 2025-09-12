
const Clients = () => {
    const clients = [
        {
            name: "Tata Consultancy Services",
            website: "www.tcs.com"
        },
        {
            name: "Infosys",
            website: "www.infosys.com"
        },
        {
            name: "Wipro Technologies",
            website: "www.wipro.com"
        },
        {
            name: "Reliance Industries",
            website: "www.ril.com"
        },
        {
            name: "HDFC Bank",
            website: "www.hdfcbank.com"
        },
        {
            name: "Mahindra Group",
            website: "www.mahindra.com"
        }
    ];

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-blue-600 mb-4">
                        Our Trusted Clients
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Leading companies across India rely on our services for their talent acquisition needs
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {clients.map((client, index) => (
                        <div
                            key={index}
                            className="bg-gray-50 p-6 rounded-lg text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
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
        </section>
    );
};

export default Clients;