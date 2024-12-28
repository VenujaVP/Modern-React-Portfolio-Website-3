import { motion } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { useGLTF, OrbitControls, Stage } from '@react-three/drei'
import { Suspense } from 'react'

// RocketModel component to load and render the 3D rocket model
function RocketModel() {
  // Load the rocket model using the useGLTF hook
  const { scene } = useGLTF('/ship2.glb')
  
  return (
    <primitive 
      object={scene} // Use the loaded GLTF scene
      scale={1.5}  // Adjust the scale of the model
      position={[0, -1, 0]}  // Set the model's position
      rotation={[0, 0, 0]}  // Set the model's rotation
    />
  )
}

// Hero component for the homepage hero section
export default function Hero() {
  return (
    <section id="home" className="flex items-center min-h-screen section-container">
      <div className="grid items-center gap-8 md:grid-cols-2">
        {/* Left section with text content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }} // Initial animation state
          animate={{ opacity: 1, x: 0 }} // Final animation state
          transition={{ duration: 0.5 }} // Animation duration
        >
          {/* Hero title */}
          <h2 className="mb-4 text-4xl font-bold text-gray-900 sm:text-5xl lg:text-6xl dark:text-white">
            <span className="text-primary">Hi, I'm</span> <span className="text-blue-500">Zane Harper</span>
          </h2>

          {/* Hero subtitle */}
          <h3 className="mb-6 text-2xl text-white sm:text-3xl lg:text-4xl">
            Crafting seamless web experiences from start to finish.
          </h3>

          {/* Hero description */}
          <p className="mb-8 text-lg text-white">
            Passionate about building intuitive applications that solve real-world problems.
          </p>

          {/* Call-to-action buttons */}
          <div className="flex gap-4">
            <motion.a
              href="#contact" // Link to the contact section
              className="px-6 py-3 text-white transition-colors duration-300 rounded-lg bg-primary hover:bg-secondary"
              whileHover={{ scale: 1.05 }} // Scale animation on hover
              whileTap={{ scale: 0.95 }} // Scale animation on tap
            >
              Contact Me
            </motion.a>
            <motion.a
              href="#projects" // Link to the projects section
              className="px-6 py-3 transition-colors duration-300 border-2 rounded-lg border-primary text-primary dark:text-white hover:bg-primary hover:text-white"
              whileHover={{ scale: 1.05 }} // Scale animation on hover
              whileTap={{ scale: 0.95 }} // Scale animation on tap
            >
              View Projects
            </motion.a>
          </div>
        </motion.div>

        {/* Right section with 3D model */}
        <motion.div
          initial={{ opacity: 0, x: 50 }} // Initial animation state
          animate={{ opacity: 1, x: 0 }} // Final animation state
          transition={{ duration: 0.5 }} // Animation duration
          className="hidden md:block h-[500px]"
        >
          {/* Container for the 3D model with background effects */}
          <div className="relative w-full h-full">
            <div className="absolute rounded-lg -inset-1 bg-gradient-to-r from-primary to-secondary blur opacity-30"></div>
            <div className="relative w-full h-full overflow-hidden bg-white rounded-lg dark:bg-gray-800">
              {/* Suspense for loading the 3D model */}
              <Suspense fallback={<div className="w-full h-full bg-gray-100 rounded-lg dark:bg-gray-800 animate-pulse" />}>
                <Canvas
                  camera={{ position: [5, 2, 5], fov: 50 }} // Camera settings
                  style={{ background: 'transparent' }} // Transparent canvas background
                >
                  <Stage environment="city" intensity={0.5}> {/* Add environment to 3D scene */}
                    <RocketModel /> {/* Render the 3D rocket model */}
                  </Stage>
                  <OrbitControls
                    enableZoom={false} // Disable zooming
                    autoRotate // Enable auto-rotation
                    autoRotateSpeed={2} // Set rotation speed
                    enablePan={false} // Disable panning
                    minPolarAngle={Math.PI / 3} // Set minimum polar angle
                    maxPolarAngle={Math.PI / 2} // Set maximum polar angle
                  />
                </Canvas>
              </Suspense>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Preload the rocket model to optimize performance
useGLTF.preload('/ship2.glb') 
