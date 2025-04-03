import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Moon, Sun } from 'lucide-react'
import { motion } from 'framer-motion'
import Home from './pages/Home'
import NotFound from './pages/NotFound'

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode')
    // Default to false (light mode) if not saved
    return savedMode ? JSON.parse(savedMode) : false
  })

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
  }, [darkMode])

  return (
    <div className="min-h-screen bg-gradient-light dark:bg-gradient-dark transition-colors duration-300">
      <header className="py-4 px-6 flex justify-between items-center backdrop-blur-sm bg-white/50 dark:bg-surface-900/50">
        <div className="flex items-center gap-2">
          <motion.div 
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="font-bold text-2xl bg-gradient-primary bg-clip-text text-transparent"
          >
            I<span className="bg-gradient-accent bg-clip-text text-transparent">Cal</span>
          </motion.div>
        </div>
        
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full bg-surface-100/80 dark:bg-surface-800/80 hover:bg-surface-200/80 dark:hover:bg-surface-700/80 transition-colors shadow-md"
          aria-label="Toggle dark mode"
        >
          {darkMode ? (
            <Sun className="h-5 w-5 text-accent-yellow" />
          ) : (
            <Moon className="h-5 w-5 text-primary-vivid" />
          )}
        </motion.button>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <footer className="py-6 text-center text-surface-500 dark:text-surface-400 text-sm bg-white/30 dark:bg-surface-900/30 backdrop-blur-sm">
        <p>© {new Date().getFullYear()} ICal. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App