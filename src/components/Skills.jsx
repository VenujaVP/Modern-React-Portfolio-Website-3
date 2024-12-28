import { motion } from "framer-motion";
import { FaCode, FaDatabase, FaTools, FaPalette } from "react-icons/fa";

// Component to display technical skills
const Skills = () => {
  // Array of skill categories with their respective skills and proficiency levels
  const skillCategories = [
    {
      title: "Programming Languages",  // Category title
      icon: <FaCode />,  // Category icon
      skills: [
        { name: "JavaScript", level: 90 },  // Skill with proficiency level
        { name: "Python", level: 85 },
        { name: "Java", level: 80 },
        { name: "TypeScript", level: 85 },
        { name: "C++", level: 75 }
      ]
    },
    {
      title: "Web Development",
      icon: <FaPalette />,
      skills: [
        { name: "React", level: 90 },
        { name: "HTML5", level: 95 },
        { name: "CSS3", level: 90 },
        { name: "Node.js", level: 85 },
        { name: "Express", level: 80 }
      ]
    },
    {
      title: "Database & Backend",
      icon: <FaDatabase />,
      skills: [
        { name: "MongoDB", level: 85 },
        { name: "PostgreSQL", level: 80 },
        { name: "Firebase", level: 85 },
        { name: "REST APIs", level: 90 },
        { name: "GraphQL", level: 75 }
      ]
    },
    {
      title: "Tools & Others",
      icon: <FaTools />,
      skills: [
        { name: "Git", level: 90 },
        { name: "Docker", level: 80 },
        { name: "AWS", level: 75 },
        { name: "Figma", level: 85 },
        { name: "Jest", level: 80 }
      ]
    }
  ];

  return (
    // Section for displaying the skills with a gradient background
    <section id="skills" className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-6xl mx-auto">
      
        {/* Animated title and description for the skills section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Skills & Expertise
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A comprehensive overview of my technical skills and proficiencies
          </p>
        </motion.div>

        {/* Grid layout for skill categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((category, index) => (
            // Animated container for each skill category
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
            >
              {/* Category title and icon */}
              <div className="flex items-center mb-6">
                <span className="text-3xl text-blue-600 dark:text-blue-400 mr-3 bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg">
                  {category.icon}
                </span>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">{category.title}</h3>
              </div>
              <ul className="space-y-4">
                {/* List of skills for each category */}
                {category.skills.map((skill, skillIndex) => (
                  <motion.li
                    key={skillIndex}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: skillIndex * 0.1 }}
                    className="group"
                  >
                    {/* Skill name and proficiency */}
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {skill.name}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{skill.level}%</span>
                    </div>
                    {/* Progress bar for skill level */}
                    <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: skillIndex * 0.1 }}
                        className="h-full bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 rounded-full"
                      />
                    </div>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
