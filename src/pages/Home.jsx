import { useState } from 'react'
import { motion } from 'framer-motion'
import MainFeature from '../components/MainFeature'

const Home = () => {
  const [showHistory, setShowHistory] = useState(false)
  const [calculationHistory, setCalculationHistory] = useState([])

  const addToHistory = (calculation) => {
    setCalculationHistory(prev => [calculation, ...prev].slice(0, 10))
  }

  const clearHistory = () => {
    setCalculationHistory([])
  }

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 text-surface-800 dark:text-surface-100">
          Welcome to <span className="text-primary">I</span><span className="text-accent">Cal</span>
        </h1>
        
        <p className="text-center text-surface-600 dark:text-surface-300 mb-8 max-w-2xl mx-auto">
          A versatile calculator with advanced functions and calculation history. Perform calculations with ease and precision.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-[1fr_auto] gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full"
        >
          <MainFeature onCalculation={addToHistory} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="w-full md:w-64"
        >
          <div className="bg-surface-100 dark:bg-surface-800 rounded-2xl p-4 shadow-card">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-lg">History</h2>
              {calculationHistory.length > 0 && (
                <button 
                  onClick={clearHistory}
                  className="text-xs text-accent hover:text-accent/80 transition-colors"
                >
                  Clear
                </button>
              )}
            </div>
            
            {calculationHistory.length === 0 ? (
              <p className="text-surface-500 dark:text-surface-400 text-sm italic text-center py-4">
                No calculations yet
              </p>
            ) : (
              <ul className="space-y-2 max-h-[400px] overflow-y-auto scrollbar-hide">
                {calculationHistory.map((calc, index) => (
                  <li 
                    key={index} 
                    className="bg-surface-50 dark:bg-surface-700 p-2 rounded-lg text-sm"
                  >
                    <div className="text-surface-600 dark:text-surface-300">{calc.expression}</div>
                    <div className="font-medium">{calc.result}</div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Home