/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const images = [
  {
    url: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    title: "Connecting Agricultural Minds"
  },
  {
    url: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    title: "Sustainable Farming"
  },
  {
    url: "https://images8.alphacoders.com/597/597633.jpg",
    title: "Innovation in Agriculture"
  }
];

function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);

  const paginate = (newDirection) => {
    setCurrentIndex(nextIndex);
    setNextIndex((nextIndex + newDirection + images.length) % images.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, 5000);

    return () => clearInterval(timer);
  }, [nextIndex]);

  return (
    <div className="relative h-[800px] w-full overflow-hidden">
      {/* Current Image */}
      <div className="absolute inset-0">
        <img
          src={images[currentIndex].url}
          alt="Agricultural scene"
          className="absolute inset-0 h-full w-full object-cover object-center"
          loading="eager"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Next Image with Fade Effect */}
      <AnimatePresence>
        <motion.div
          key={nextIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <img
            src={images[nextIndex].url}
            alt="Next agricultural scene"
            className="absolute inset-0 h-full w-full object-cover object-center"
            loading="eager"
          />
          <div className="absolute inset-0 bg-black/30" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="relative z-10 px-4 text-center"
        >
          <motion.h1
            key={images[currentIndex].title}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-6 text-4xl font-bold leading-tight text-white drop-shadow-lg sm:text-5xl md:text-7xl"
          >
            {images[currentIndex].title}
          </motion.h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-white drop-shadow-lg sm:text-xl md:text-2xl">
            Join the world&apos;s largest network of agricultural experts, farmers, and researchers
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-full bg-green-600 px-8 py-3 text-lg font-semibold text-white shadow-xl 
                    transition-colors duration-300 hover:bg-green-700 focus:outline-none focus:ring-2 
                    focus:ring-green-500 focus:ring-offset-2"
          >
            GET STARTED
          </motion.button>
        </motion.div>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 space-x-3">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentIndex(index);
              setNextIndex((index + 1) % images.length);
            }}
            className={`h-2 w-2 rounded-full transition-all duration-300 
                      ${index === currentIndex ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/75'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <div className="absolute inset-x-0 top-1/2 z-10 flex -translate-y-1/2 justify-between px-4">
        <motion.button
          className="rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition-all 
                   hover:bg-white/20 focus:outline-none"
          onClick={() => paginate(-1)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-6 w-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </motion.button>
        <motion.button
          className="rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition-all 
                   hover:bg-white/20 focus:outline-none"
          onClick={() => paginate(1)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-6 w-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </motion.button>
      </div>
    </div>
  );
}

export default Hero;