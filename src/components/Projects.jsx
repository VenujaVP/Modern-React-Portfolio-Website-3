import { motion } from 'framer-motion'

export default function Projects() {
  const projects = [
    {
      title: 'Project 1',
      description: 'A modern web application built with React and Node.js',
      image: '/1.jpeg', // Add your project image
      technologies: ['React', 'Node.js', 'MongoDB'],
      liveDemo: 'https://project1.com',
      github: 'https://github.com/yourusername/project1'
    },
    // Add more projects here
  ]

  return (
    <section id="projects" className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-6xl mx-auto">
      <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4 text-center">
        My Projects
      </h2>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative overflow-hidden bg-white shadow-lg group dark:bg-gray-700 rounded-xl"
          >
            {/* Project Image with Overlay */}
            <div className="relative h-48 overflow-hidden">
              <div className="absolute inset-0 z-10 flex items-center justify-center transition-opacity duration-300 opacity-0 bg-gradient-to-r from-primary to-secondary group-hover:opacity-90">
                <div className="flex gap-4">
                  <a
                    href={project.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 transition-colors duration-300 bg-white rounded-lg text-primary hover:bg-gray-100"
                  >
                    Live Demo
                  </a>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 text-white transition-colors duration-300 border-2 border-white rounded-lg hover:bg-white hover:text-primary"
                  >
                    GitHub
                  </a>
                </div>
              </div>
              <img
                src={project.image}
                alt={project.title}
                className="object-cover w-full h-full transition-transform duration-300 transform group-hover:scale-110"
              />
            </div>
            
            {/* Project Info */}
            <div className="p-6">
              <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                {project.title}
              </h3>
              <p className="mb-4 text-gray-600 dark:text-gray-400">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map(tech => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-sm rounded-full bg-primary/10 text-primary dark:bg-primary/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      </div>
    </section>
  )
} 