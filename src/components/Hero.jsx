import { motion } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { useGLTF, OrbitControls, Stage } from '@react-three/drei'
import { Suspense } from 'react'

function RocketModel() {
  // Load the rocket model
  const { scene } = useGLTF('/ship2.glb')
  
  return (
    <primitive 
      object={scene} 
      scale={1.5}  // Adjust scale as needed
      position={[0, -1, 0]}  // Adjust position as needed
      rotation={[0, 0, 0]}  // Adjust rotation as needed
    />
  )
}

export default function Hero() {
  return (
    <section id="home" className="flex items-center min-h-screen section-container">
      <div className="grid items-center gap-8 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
<h2 className="mb-4 text-4xl font-bold text-gray-900 sm:text-5xl lg:text-6xl dark:text-white">
  <span className="text-primary">Hi, I'm</span> <span className="text-blue-500">Zane Harper</span>
</h2>



          <h3 className="mb-6 text-2xl text-white sm:text-3xl lg:text-4xl">
            Crafting seamless web experiences from start to finish.
          </h3>
          <p className="mb-8 text-lg text-white">
            Passionate about building intuitive applications that solve real-world problems.
          </p>

          <div className="flex gap-4">
            <motion.a
              href="#contact"
              className="px-6 py-3 text-white transition-colors duration-300 rounded-lg bg-primary hover:bg-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Me
            </motion.a>
            <motion.a
              href="#projects"
              className="px-6 py-3 transition-colors duration-300 border-2 rounded-lg border-primary text-primary dark:text-white hover:bg-primary hover:text-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Projects
            </motion.a>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="hidden md:block h-[500px]"
        >
          <div className="relative w-full h-full">
            <div className="absolute rounded-lg -inset-1 bg-gradient-to-r from-primary to-secondary blur opacity-30"></div>
            <div className="relative w-full h-full overflow-hidden bg-white rounded-lg dark:bg-gray-800">
              <Suspense fallback={<div className="w-full h-full bg-gray-100 rounded-lg dark:bg-gray-800 animate-pulse" />}>
                <Canvas
                  camera={{ position: [5, 2, 5], fov: 50 }}
                  style={{ background: 'transparent' }}
                >
                  <Stage environment="city" intensity={0.5}>
                    <RocketModel />
                  </Stage>
                  <OrbitControls
                    enableZoom={false}
                    autoRotate
                    autoRotateSpeed={2}
                    enablePan={false}
                    minPolarAngle={Math.PI / 3}
                    maxPolarAngle={Math.PI / 2}
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

// Preload the model
useGLTF.preload('/ship2.glb') 