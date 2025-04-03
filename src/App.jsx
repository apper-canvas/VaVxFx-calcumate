import { useState } from 'react'
import ScientificCalculator from './components/ScientificCalculator'

function App() {
  const [calculations, setCalculations] = useState([])

  const handleCalculation = (calculation) => {
    setCalculations([calculation, ...calculations])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-indigo-100 dark:from-surface-900 dark:to-surface-800 flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
        Scientific Calculator
      </h1>
      
      <ScientificCalculator onCalculation={handleCalculation} />
      
      <div className="mt-8 text-center text-xs text-surface-500 dark:text-surface-400">
        <p>Scientific Calculator with advanced math functions</p>
        <p>Use DEG/RAD toggle for angle units</p>
      </div>
    </div>
  )
}

export default App