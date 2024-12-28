import { motion } from 'framer-motion';
import { FaGithub, FaLinkedinIn, FaTwitter, FaEnvelope, FaHeart, FaYoutube } from 'react-icons/fa';

export default function Footer() {
  const socialLinks = [
    { name: 'GitHub', icon: <FaGithub />, url: 'https://github.com/VenujaVP' },
    { name: 'LinkedIn', icon: <FaLinkedinIn />, url: 'https://linkedin.com/company/nova-boost' },
    { name: 'LinkedIn', icon: <FaLinkedinIn />, url: 'https://linkedin.com/in/venuja-v11' },
    { name: 'YouTube', icon: <FaYoutube />, url: 'https://www.youtube.com/@NovaBoost1' },
    { name: 'Fiverr', icon: <FaEnvelope />, url: 'https://fiverr.com/venuja2002' },
  ];

  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <footer className="relative py-20 overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 dark:opacity-20">
        <div className="absolute inset-0 bg-grid-gray-900/[0.1] [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={footerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-12 md:grid-cols-2 lg:grid-cols-3"
        >
          {/* Brand Section */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
              DevSpark
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-sm">
              Transforming ideas into elegant digital solutions. Let's build something amazing together.
            </p>
          </motion.div>

            {/* Quick Links */}
            <motion.div variants={itemVariants} className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Quick Links</h4>
            <div className="grid grid-cols-2 gap-2">
              {['Home', 'About', 'Projects', 'Skills', 'Contact'].map((link) => (
              <motion.a
                key={link}
                href={`#${link.toLowerCase()}`}
                whileHover={{ x: 5 }}
                className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
              >
                {link}
              </motion.a>
              ))}
            </div>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={itemVariants} className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Connect</h4>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
                >
                  {link.icon}
                </motion.a>
                ))}
              </div>
              </motion.div>
            </motion.div>

            {/* Bottom Bar */}
        <motion.div
          variants={itemVariants}
          className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <motion.p
              className="text-gray-600 dark:text-gray-400 text-sm flex items-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              © {new Date().getFullYear()} Made with <FaHeart className="mx-1 text-red-500" /> by NOVABOOST
            </motion.p>
            <motion.p className="text-gray-500 dark:text-gray-400 text-sm">
              All rights reserved
            </motion.p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}