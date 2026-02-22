import React, { useEffect, useState } from 'react';
import { ArrowRight, ShoppingBag, Truck, Shield, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const slides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    title: "Fresh Vegetables",
    subtitle: "Farm Fresh"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    title: "Organic Fruits",
    subtitle: "100% Organic"
  },
 {
    id: 3,
    image: "https://images.unsplash.com/photo-1516594798947-e65505dbb29d?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Daily Essentials",
    subtitle: "Best Prices"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1588964895597-cfccd6e2dbf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    title: "Quick Delivery",
    subtitle: "30 Mins or Less"
  }
];

const Hero = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-137.5  overflow-hidden">
      {/* Background Images with Smooth Transition */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            currentSlide === index ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          {/* Dark Overlay for better text readability */}
          <div className="absolute inset-0 bg-black/50" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 h-full flex items-center bg-linear-to-r from-slate-900/70 via-transparent to-transparent">
        <div className=" px-4 sm:px-6 lg:px-8 text-white">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-block bg-amber-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
              🔥 Limited Time Offer
            </div>

            {/* Title with Slide Animation */}
            <div className="relative h-30 mb-4">
              {slides.map((slide, index) => (
                <div
                  key={slide.id}
                  className={`absolute transition-all duration-700 ${
                    currentSlide === index
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-4'
                  }`}
                >
                  <h1 className="text-5xl lg:text-7xl font-bold mb-2">
                    {slide.title}
                  </h1>
                  <h2 className="text-3xl lg:text-4xl font-semibold text-amber-400">
                    {slide.subtitle}
                  </h2>
                </div>
              ))}
            </div>

            {/* Description */}
            <p className="text-lg text-gray-200 mb-8 max-w-2xl">
              Shop the freshest fruits, vegetables, and daily essentials with free delivery. 
              Get your groceries in under 30 minutes!
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mb-12">
              <button
                onClick={() => navigate('/products')}
                className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2 group"
              >
                <ShoppingBag className="w-5 h-5" />
                Shop Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => navigate('/deals')}
                className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 border border-white/30"
              >
                View Deals
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              currentSlide === index 
                ? 'w-8 bg-amber-500' 
                : 'w-2 bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>

      {/* Slide Counter */}
      <div className="absolute bottom-8 right-8 text-white/60 text-sm">
        {currentSlide + 1} / {slides.length}
      </div>
    </div>
  );
};

export default Hero;