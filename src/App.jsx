import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Reviews from "./components/Reviews"

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-blue-900 to-gray-900">
        <Navbar />

      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Reviews />
        <Contact />
      </main>
      <Footer />
      </div>
    </ThemeProvider>
  )
}

export default App
