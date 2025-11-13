import { ChevronDown } from "lucide-react";

const Hero = () => {
  const scrollToNextSection = () => {
    const nextSection = document.getElementById('content-start');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden bg-fju-dark">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/images/capa.png"
          alt="FJU - Um espaço para tudo que está acontecendo"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-fju-dark/90 via-fju-dark/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto h-full flex flex-col justify-center items-center text-center px-4">
        <div className="max-w-4xl animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Um espaço para tudo que está acontecendo na FJU
          </h1>
        </div>
        
        {/* Seta para rolagem */}
        <button 
          onClick={scrollToNextSection}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white hover:text-primary transition-colors"
          aria-label="Role para baixo"
        >
          <ChevronDown className="h-12 w-12 animate-bounce" />
        </button>
      </div>
    </section>
  );
};

export default Hero;
