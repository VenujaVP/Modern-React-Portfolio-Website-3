import { motion, useAnimation } from 'framer-motion'; // Import motion for animations and useAnimation for controlling animations
import { useRef, useEffect, useState } from 'react'; // Import hooks for managing state and effects

// Array of testimonials with details like name, title, image, and testimonial text
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

// Testimonial card component to display each testimonial
const TestimonialCard = ({ testimonial }) => (
  <motion.div
    className="min-w-[300px] md:min-w-[400px] min-h-[250px] bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mx-4 flex flex-col justify-between"
    initial={{ opacity: 0, x: 100 }} // Initial animation state: invisible, to the right
    whileInView={{ opacity: 1, x: 0 }} // Animation when in view: visible, centered
    viewport={{ once: true }} // Trigger animation only once
    transition={{ 
      type: "spring", // Spring animation for smoothness
      stiffness: 100, // Stiffness of spring
      damping: 20, // Damping for smoothness
      duration: 0.8 // Duration of the animation
    }}
    whileHover={{ 
      scale: 1.05, // Slightly scale up on hover
      boxShadow: "0 10px 30px rgba(0,0,0,0.15)", // Add shadow on hover
      transition: { duration: 0.3 } // Transition duration
    }}
  >
    {/* Testimonial image and name */}
    <div className="flex items-center mb-4">
      <motion.div 
        className="w-12 h-12 rounded-full overflow-hidden mr-4 border-2 border-primary"
        whileHover={{ rotate: 360 }} // Rotate image on hover
        transition={{ duration: 0.8 }} // Smooth rotation
      >
        <img
          src={testimonial.image} // Display testimonial image
          alt={testimonial.name}
          className="w-full h-full object-cover" // Make image cover the container
          onError={(e) => {
            e.target.src = 'https://ui-avatars.com/api/?name=' + testimonial.name.replace(' ', '+'); // Fallback image if there's an error
          }}
        />
      </motion.div>
      <div>
        <h4 className="font-bold text-gray-900 dark:text-white">{testimonial.name}</h4> {/* Display name */}
        <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.title}</p> {/* Display title */}
      </div>
    </div>
    <p className="text-gray-700 dark:text-gray-300 italic">"{testimonial.text}"</p> {/* Display testimonial text */}
  </motion.div>
);

export default function Reviews() {
  const scrollRef = useRef(null); // Reference for the scroll container
  const controls = useAnimation(); // Controls for animating the scrolling
  const [isPlaying, setIsPlaying] = useState(true); // State to track whether the animation is playing

  useEffect(() => {
    const scrollContainer = scrollRef.current; // Get the scroll container element
    if (!scrollContainer) return; // If the container doesn't exist, do nothing

    const totalWidth = scrollContainer.scrollWidth / 2; // Total width for the scroll container

    const animate = async () => { // Function to animate scrolling
      if (isPlaying) {
        await controls.start({
          x: -totalWidth, // Move to the left side to simulate continuous scrolling
          transition: {
            duration: 20, // Duration of scrolling
            ease: "linear", // Smooth linear scrolling
            repeat: Infinity, // Repeat animation infinitely
          }
        });
      }
    };

    animate(); // Start the animation

    // Event handlers to stop and restart scrolling when mouse enters or leaves
    const handleMouseEnter = () => {
      if (isPlaying) controls.stop(); // Stop the animation on mouse enter
    };

    const handleMouseLeave = () => {
      if (isPlaying) animate(); // Restart animation on mouse leave
    };

    scrollContainer.addEventListener('mouseenter', handleMouseEnter); // Add event listener for mouse enter
    scrollContainer.addEventListener('mouseleave', handleMouseLeave); // Add event listener for mouse leave

    return () => {
      controls.stop(); // Stop the animation on cleanup
      if (scrollContainer) {
        scrollContainer.removeEventListener('mouseenter', handleMouseEnter); // Cleanup event listener
        scrollContainer.removeEventListener('mouseleave', handleMouseLeave); // Cleanup event listener
      }
    };
  }, [controls, isPlaying]); // Effect hook depends on controls and isPlaying state

  return (
    <section id="testimonials" className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} // Initial animation state: invisible, slightly below
          whileInView={{ opacity: 1, y: 0 }} // Animation when in view: visible, centered
          transition={{ duration: 0.6 }} // Transition duration
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
          {/* Gradient overlays on left and right */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-50 to-transparent dark:from-gray-900 z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-50 to-transparent dark:from-gray-900 z-10" />

          {/* Scrolling Container */}
          <div className="overflow-hidden min-h-[250px]">
            <motion.div
              ref={scrollRef} // Attach the reference to the scroll container
              className="flex gap-6 py-4"
              animate={controls} // Control the scrolling animation
              drag="x" // Allow horizontal dragging
              dragConstraints={{ left: -1000, right: 0 }} // Set the constraints for dragging
              style={{ 
                touchAction: 'none', // Disable touch action for smooth drag
                cursor: 'grab' // Change cursor to 'grab' on hover
              }}
              whileTap={{ cursor: 'grabbing' }} // Change cursor to 'grabbing' when tapped
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
            {/* Pause button */}
            <motion.button
            whileHover={{ scale: 1.1 }} // Scale up on hover
            whileTap={{ scale: 0.9 }} // Scale down on tap
            className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors dark:bg-blue-600 dark:hover:bg-blue-700"
            onClick={() => {
              controls.stop(); // Stop the scrolling animation
              setIsPlaying(false); // Set animation state to stopped
            }}
            >
            Pause
            </motion.button>
            {/* Play button */}
            <motion.button
            whileHover={{ scale: 1.1 }} // Scale up on hover
            whileTap={{ scale: 0.9 }} // Scale down on tap
            className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors dark:bg-blue-600 dark:hover:bg-blue-700"
            onClick={() => {
              setIsPlaying(true); // Set animation state to playing
              controls.start({
              x: -scrollRef.current.scrollWidth / 2, // Start scrolling from left side
              transition: { duration: 20, ease: "linear", repeat: Infinity }, // Smooth, infinite scroll
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
