import { motion, useAnimation } from 'framer-motion';
import { useRef, useEffect } from 'react';

const testimonials = [
  {
    name: "Sarah Johnson",
    title: "CEO at TechStart", 
    image: "/testimonials/sarah.jpg", // Add actual image paths
    text: "Working with this developer was an absolute pleasure. They delivered our project on time and exceeded our expectations with their attention to detail and innovative solutions."
  },
  {
    name: "Michael Chen",
    title: "Product Manager at InnovateCo",
    image: "/testimonials/michael.jpg",
    text: "Their technical expertise and problem-solving abilities are outstanding. They transformed our complex requirements into an elegant, user-friendly solution."
  },
  {
    name: "Emma Davis", 
    title: "Founder of CreativeHub",
    image: "/testimonials/emma.jpg",
    text: "An exceptional developer who brings both technical excellence and creative thinking to every project. Their work has significantly improved our user engagement."
  },
  {
    name: "Alex Rivera",
    title: "CTO at DataFlow",
    image: "/testimonials/alex.jpg", 
    text: "Remarkable ability to understand business needs and translate them into technical solutions. Their work has been instrumental in our platform's success."
  }
];

const TestimonialCard = ({ testimonial }) => (
  <motion.div
    className="min-w-[300px] md:min-w-[400px] min-h-[250px] bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mx-4 flex flex-col justify-between"
    initial={{ opacity: 0, x: 100 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ 
      type: "spring",
      stiffness: 100,
      damping: 20,
      duration: 0.8 
    }}
    whileHover={{ 
      scale: 1.05,
      boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
      transition: { duration: 0.3 }
    }}
  >
    <div className="flex items-center mb-4">
      <motion.div 
        className="w-12 h-12 rounded-full overflow-hidden mr-4 border-2 border-primary"
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.8 }}
      >
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = 'https://ui-avatars.com/api/?name=' + testimonial.name.replace(' ', '+');
          }}
        />
      </motion.div>
      <div>
        <h4 className="font-bold text-gray-900 dark:text-white">{testimonial.name}</h4>
        <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.title}</p>
      </div>
    </div>
    <p className="text-gray-700 dark:text-gray-300 italic">"{testimonial.text}"</p>
  </motion.div>
);

export default function Reviews() {
  const scrollRef = useRef(null);
  const controls = useAnimation();
  const [isPlaying, setIsPlaying] = useState(true);

  const startAnimation = async (totalWidth) => {
    await controls.start({
      x: -totalWidth,
      transition: {
        duration: 20,
        ease: "linear",
        repeat: Infinity,
      }
    });
  };

  const stopAnimation = () => {
    controls.stop();
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const totalWidth = scrollContainer.scrollWidth / 2;
    
    if (isPlaying) {
      startAnimation(totalWidth);
    }

    const handleMouseEnter = () => isPlaying && stopAnimation();
    const handleMouseLeave = () => isPlaying && startAnimation(totalWidth);

    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      stopAnimation();
      if (scrollContainer) {
        scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
        scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [controls, isPlaying]);

  return (
    <section id="testimonials" className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      <div className="max-w-6xl mx-auto">
      {/* Title Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            What Clients Say About Me
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Don't just take my word for it. See what my clients have to say about my work.
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="relative bg-gradient-to-r from-blue-400/10 to-purple-500/10 dark:from-blue-900/20 dark:to-purple-900/20 p-8 rounded-2xl shadow-lg backdrop-blur-sm border border-gray-200/20 dark:border-gray-700/20">
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-50 to-transparent dark:from-gray-900 z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-50 to-transparent dark:from-gray-900 z-10" />

            {/* Scrolling Container */}
            <div className="overflow-hidden min-h-[250px]">
          <motion.div
            ref={scrollRef}
            className="flex gap-6 py-4"
            animate={controls}
            drag="x"
            dragConstraints={{ left: -1000, right: 0 }}
            style={{ 
            touchAction: 'none',
            cursor: 'grab'
            }}
            whileTap={{ cursor: 'grabbing' }}
            >
              {/* First set of testimonials */}
              <div className="flex gap-6">
                {testimonials.map((testimonial, index) => (
                  <TestimonialCard 
                    key={`first-${index}`} 
                    testimonial={testimonial} 
                  />
                ))}
              </div>
              {/* Duplicated set for seamless loop */}
              <div className="flex gap-6">
                {testimonials.map((testimonial, index) => (
                  <TestimonialCard 
                    key={`second-${index}`} 
                    testimonial={testimonial} 
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Control buttons */}
        <div className="flex justify-center mt-8 gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors dark:bg-blue-600 dark:hover:bg-blue-700"
            onClick={() => {
              stopAnimation();
              setIsPlaying(false);
            }}
          >
            Pause
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors dark:bg-blue-600 dark:hover:bg-blue-700"
            onClick={() => {
              startAnimation(scrollRef.current.scrollWidth / 2);
                x: -scrollRef.current.scrollWidth / 2,
                transition: {
                  duration: 20,
                  ease: "linear",
                  repeat: Infinity,
                }
              });
            }}
          >
            Play
          </motion.button>
        </div>
      </div>
    </section>
  );
}
