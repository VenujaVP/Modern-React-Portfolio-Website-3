import { useState, useEffect } from 'react'
import { Link } from 'react-scroll'
import { motion } from 'framer-motion'
import { SunIcon, MoonIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useTheme } from '../context/ThemeContext'

export default function Navbar() {
  // Destructuring darkMode state and setDarkMode function from ThemeContext
  const { darkMode, setDarkMode } = useTheme()

  // State to manage mobile menu open/close status
  const [isOpen, setIsOpen] = useState(false)
  
  // State to track if the page has been scrolled
  const [scrolled, setScrolled] = useState(false)
  
  // State to keep track of the active section in the navigation
  const [activeSection, setActiveSection] = useState('home')

  // Menu items for navigation
  const menuItems = [
    { title: 'Home', to: 'home' },
    { title: 'About', to: 'about', offset: -15 },
    { title: 'Projects', to: 'projects' },
    { title: 'Skills', to: 'skills', offset: -30 },
    { title: 'Reviews', to: 'testimonials',offset: -30 },
    { title: 'Contact', to: 'contact' },
  ]

  // Effect hook to handle scroll behavior and track active section
  useEffect(() => {
    const handleScroll = () => {
      // Set the scrolled state based on scroll position
      setScrolled(window.scrollY > 50)

      // Determine the active section based on the scroll position
      const sections = menuItems.map(item => item.to)
      const currentSection = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })

      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    // Attach scroll event listener
    window.addEventListener('scroll', handleScroll)
    
    // Clean up event listener on component unmount
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100 }}  // Initial position for animation
      animate={{ y: 0 }}  // Animate to 0 position when the component is mounted
      className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo section with gradient text */}
          <motion.div
            initial={{ opacity: 0 }}  // Fade in from 0 opacity
            animate={{ opacity: 1 }}  // Animate to full opacity
            className="flex-shrink-0"
          >
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
              DevSpark
            </h1>
          </motion.div>

          {/* Desktop menu with navigation links */}
          <div className="hidden md:flex items-center justify-center flex-1 space-x-12">
            {menuItems.map((item, index) => (
              <motion.div
                key={item.to}
                initial={{ opacity: 0, y: -20 }}  // Initial state for animation
                animate={{ opacity: 1, y: 0 }}  // Animate to visible state
                transition={{ delay: index * 0.1 }}  // Stagger animation for each item
              >
                <Link
                  to={item.to}
                  spy={true}
                  smooth={true}
                  duration={500}
                  offset={item.offset || -80}
                  className={`relative cursor-pointer text-base font-medium tracking-wide group
                  ${activeSection === item.to
                    ? 'text-blue-500 dark:text-blue-400'
                    : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                  } transition-colors duration-300`}
                >
                  {item.title}
                  {/* Underline animation on hover or active state */}
                  <span className={`absolute -bottom-2 left-0 w-full h-0.5 bg-blue-400 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ${activeSection === item.to ? 'scale-x-100' : ''}`} />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Theme toggle button */}
          <motion.button
            initial={{ opacity: 0, y: -20 }}  // Initial state for animation
            animate={{ opacity: 1, y: 0 }}  // Animate to visible state
            transition={{ delay: 0.4 }}  // Delay before appearing
            onClick={() => setDarkMode(!darkMode)}  // Toggle dark mode state
            className="hidden md:flex p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
          >
            {darkMode ? (
              <SunIcon className="h-5 w-5 text-yellow-500" />  // Sun icon for light mode
            ) : (
              <MoonIcon className="h-5 w-5 text-gray-700" />  // Moon icon for dark mode
            )}
          </motion.button>

          {/* Mobile menu button */}
          <motion.div
            initial={{ opacity: 0 }}  // Initial state for animation
            animate={{ opacity: 1 }}  // Animate to visible state
            className="md:hidden"
          >
            <button
              onClick={() => setIsOpen(!isOpen)}  // Toggle mobile menu visibility
              className="p-2 rounded-lg bg-gray-800/50 hover:bg-gray-700 transition-colors duration-300"
            >
              {isOpen ? (
                <XMarkIcon className="h-6 w-6 text-gray-300" />  // Close icon
              ) : (
                <Bars3Icon className="h-6 w-6 text-gray-300" />  // Open icon
              )}
            </button>
          </motion.div>
        </div>
      </div>

      {/* Mobile menu content */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}  // Initial state for animation
        animate={{
          opacity: isOpen ? 1 : 0,
          height: isOpen ? 'auto' : 0  // Toggle visibility based on mobile menu state
        }}
        transition={{ duration: 0.3 }}  // Duration of the animation
        className="md:hidden overflow-hidden bg-gray-900/95 backdrop-blur-sm border-t border-gray-800"
      >
        <div className="px-4 py-3 space-y-3">
          {menuItems.map((item, index) => (
            <motion.div
              key={item.to}
              initial={{ opacity: 0, x: -20 }}  // Initial state for animation
              animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : -20 }}  // Staggered animation for mobile menu items
              transition={{ delay: index * 0.1 }}  // Delay based on item index
            >
              <Link
                to={item.to}
                spy={true}
                smooth={true}
                duration={500}
                offset={-80}
                className={`block px-4 py-3 rounded-lg text-base font-medium
                ${activeSection === item.to
                  ? 'bg-blue-400/10 text-blue-400'
                  : 'text-gray-300 hover:bg-gray-800/50 hover:text-white'
                } transition-all duration-300`}
                onClick={() => setIsOpen(false)}  // Close mobile menu on item click
              >
                {item.title}
              </Link>
            </motion.div>
          ))}
          {/* Mobile theme toggle button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}  // Initial state for animation
            animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : -20 }}  // Staggered animation for mobile theme toggle
            transition={{ delay: 0.4 }}  // Delay before the theme toggle appears
            className="px-4 py-3"
          >
            <button
              onClick={() => {
                setDarkMode(!darkMode)  // Toggle dark mode
                setIsOpen(false)  // Close mobile menu
              }}
              className="flex items-center space-x-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
            >
              {darkMode ? (
                <>
                  <SunIcon className="h-5 w-5 text-yellow-400" />
                  <span>Light Mode</span>
                </>
              ) : (
                <>
                  <MoonIcon className="h-5 w-5" />
                  <span>Dark Mode</span>
                </>
              )}
            </button>
          </motion.div>
        </div>
      </motion.div>
    </motion.nav>
  )
}
