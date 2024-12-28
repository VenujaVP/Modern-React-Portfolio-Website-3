// Import required animation components
import { motion } from 'framer-motion'

// About component - Displays developer profile and skills
export default function About() {
  // Define skills with icons for the skills grid
  const skills = [
    { name: 'Frontend Development', icon: '🎯' },
    { name: 'Backend Development', icon: '🚀' },
    { name: 'UI/UX Design', icon: '✨' },
    { name: 'Database Management', icon: '🔮' },
    { name: 'Cloud Services', icon: '☁️' },
    { name: 'DevOps', icon: '⚡' },
  ]

  return (
    // Main about section with gradient background
    <section id="about" className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Container for content centering */}
      <div className="max-w-6xl mx-auto">
      <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-8 text-center">
        About Me
      </h2>

        {/* Two-column grid layout for profile and skills */}
        <div className="grid items-center gap-12 md:grid-cols-2">
        {/* Profile image section with animation */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative">
            <div className="absolute rounded-lg -inset-1 bg-gradient-to-r from-primary to-secondary blur opacity-30"></div>
            <img
              src="/Profile.jpeg"
              alt="Profile"
              className="relative w-full h-auto rounded-lg shadow-xl"
            />
          </div>
        </motion.div>
        {/* About content and skills grid section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
            Who am I?
          </h3>
          <p className="mb-6 text-gray-600 dark:text-gray-400">
            I'm a passionate Full-Stack Developer with X years of experience in building
            web applications. I love turning complex problems into simple, beautiful,
            and intuitive solutions.
          </p>
            {/* Skills grid with interactive gradient cards */}
            <div className="grid grid-cols-2 gap-4">
            {/* Map through skills to create animated cards with morphing gradients */}
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="p-4 rounded-lg shadow-md relative overflow-hidden group"
                whileHover={{ scale: 1.05 }}

                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left; // x position within the element
                  const y = e.clientY - rect.top;  // y position within the element
                  const centerX = rect.width / 2;
                  const centerY = rect.height / 2;
                  const angleX = (x - centerX) / centerX * 45; // -45 to 45 degrees
                  const angleY = (y - centerY) / centerY * 45; // -45 to 45 degrees
                  
                  e.currentTarget.style.background = `linear-gradient(
                  ${angleX}deg,
                  ${index % 2 === 0 ? '#60A5FA, #818CF8, #A78BFA' : '#818CF8, #A78BFA, #C084FC'}
                  )`;
                }}
                style={{
                  background: `linear-gradient(45deg, 
                  ${index % 2 === 0 ? '#60A5FA, #818CF8, #A78BFA' : '#818CF8, #A78BFA, #C084FC'})`,
                  transition: 'transform 0.2s, background 0.3s ease'
                }}
              >
                <div className="relative z-10">
                  <span className="block mb-2 text-3xl text-white">{skill.icon}</span>
                  <h4 className="font-semibold text-white">
                  {skill.name}
                  </h4>
                </div>
                </motion.div>
              ))}
          </div>
        </motion.div>
      </div>
      </div>
    </section>
  )
} 