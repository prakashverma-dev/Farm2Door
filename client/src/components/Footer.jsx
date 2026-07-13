 import { FaGithub } from "react-icons/fa";


export default function Footer() {
     const linkSections = [
        {
            title: "Quick Links",
            links: ["Home", "Best Sellers", "Offers & Deals", "Contact Us", "FAQs"]
        },
        {
            title: "Need Help?",
            links: ["Delivery Information", "Return & Refund Policy", "Payment Methods", "Track your Order", "Contact Us"]
        },
        {
            title: "Follow Us",
            links: ["Instagram", "Twitter", "Facebook", "YouTube"]
        }
    ];

    return (
        <div className="py-16 px-6 md:px-16 lg:px-24 xl:px-32">
            <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-500/30 text-gray-500">
                <div>
                    <h2 className="font-semibold text-2xl md:text-3xl text-gray-900">Farm2Door App🌱</h2>
                    <p className="text-sm md:text-base mt-2">
                    At Farm2Door, we make healthy living easier by delivering fresh fruits, vegetables, dairy products, and everyday essentials directly from trusted farms to your home. Shop smart, eat fresh, and support local farmers.

                    </p>

                  

                </div>
                <div className="flex flex-wrap justify-between w-full md:w-[45%] gap-5">
                    {linkSections.map((section, index) => (
                        <div key={index}>
                            <h3 className="font-semibold text-base text-gray-900 md:mb-5 mb-2">{section.title}</h3>
                            <ul className="text-sm space-y-1">
                                {section.links.map((link, i) => (
                                    <li key={i}>
                                        <a href="#" className="hover:underline transition">{link}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
       

            <p className="py-4 text-center text-sm md:text-base text-gray-500/80">
            Copyright 2026 ©{" "}
            <a
                href="https://github.com/prakashverma-dev/Farm2Door"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-block font-semibold transition-all duration-300 hover:scale-105 me-1.5"
            >
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-[length:200%_100%] bg-left bg-clip-text text-gray-300 transition-all duration-500 group-hover:bg-right group-hover:text-transparent">
                Prakash Kumar Verma.
                </span>

                <span className="absolute left-0 -bottom-0.5 h-[2px] w-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 transition-all duration-500 group-hover:w-full"></span>
            </a>
            
            <span className="block md:inline">
                All Rights Reserved
            </span>
            </p>
        </div>
    );
};