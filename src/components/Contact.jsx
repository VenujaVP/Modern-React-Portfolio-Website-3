import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'

export default function Contact() {
  // Reference to the form DOM element
  const formRef = useRef()

  // State to track if the form is currently being submitted
  const [isSubmitting, setIsSubmitting] = useState(false)

  // State to track the status of the form submission ('success' or 'error')
  const [submitStatus, setSubmitStatus] = useState(null)

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault() // Prevent default form submission behavior
    setIsSubmitting(true) // Set submitting state to true

    try {
      // Send the form data using EmailJS
      await emailjs.sendForm(
        'YOUR_SERVICE_ID', // EmailJS service ID
        'YOUR_TEMPLATE_ID', // EmailJS template ID
        formRef.current, // Form reference
        'YOUR_PUBLIC_KEY' // EmailJS public key
      )
      setSubmitStatus('success') // Set submission status to success
      formRef.current.reset() // Reset the form fields
    } catch (error) {
      setSubmitStatus('error') // Set submission status to error
    } finally {
      setIsSubmitting(false) // Reset submitting state
    }
  }

  return (
    <section
      id="contact"
      className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4 text-center">
          Get In Touch
        </h2>
        <div className="max-w-3xl mx-auto">
          {/* Contact Form */}
          <motion.form
            ref={formRef} // Attach the form reference
            onSubmit={handleSubmit} // Handle form submission
            className="space-y-6"
            initial={{ opacity: 0, y: 50 }} // Animation: initial state
            whileInView={{ opacity: 1, y: 0 }} // Animation: visible state
            viewport={{ once: true }} // Trigger animation only once
          >
            {/* Name and Email Input Fields */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-gray-700 dark:text-gray-300 mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                    className="w-full px-4 py-3 rounded-lg bg-gray-800/10 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-gray-700 dark:text-gray-300 mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                    className="w-full px-4 py-3 rounded-lg bg-gray-800/10 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            {/* Message Input Field */}
            <div>
              <label
                htmlFor="message"
                className="block text-gray-700 dark:text-gray-300 mb-2"
              >
                Message
              </label>
              <textarea
                name="message"
                id="message"
                rows="5"
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-800/10 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting} // Disable button while submitting
              className="w-full px-6 py-3 bg-primary text-white rounded-lg hover:bg-secondary transition-colors duration-300 disabled:opacity-50"
              whileHover={{ scale: 1.02 }} // Hover animation
              whileTap={{ scale: 0.98 }} // Tap animation
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </motion.button>

            {/* Submission Status Message */}
            {submitStatus && (
              <motion.div
                initial={{ opacity: 0 }} // Animation: initial state
                animate={{ opacity: 1 }} // Animation: visible state
                className={`text-center p-4 rounded-lg ${
                  submitStatus === 'success'
                    ? 'bg-green-100 text-green-700' // Success message style
                    : 'bg-red-100 text-red-700' // Error message style
                }`}
              >
                {submitStatus === 'success'
                  ? 'Message sent successfully!' // Success message
                  : 'Failed to send message. Please try again.' // Error message
                }
              </motion.div>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  )
}
