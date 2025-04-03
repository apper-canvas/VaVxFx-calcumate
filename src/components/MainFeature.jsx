import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Trash2, 
  RotateCcw, 
  Percent, 
  Divide, 
  X, 
  Minus, 
  Plus, 
  Equal, 
  Clock, 
  Save
} from 'lucide-react'

const MainFeature = ({ onCalculation }) => {
  const [input, setInput] = useState('0')
  const [result, setResult] = useState('')
  const [memory, setMemory] = useState(null)
  const [lastOperation, setLastOperation] = useState('')
  const [isCalculated, setIsCalculated] = useState(false)
  const [animation, setAnimation] = useState(false)

  // Trigger animation when result changes
  useEffect(() => {
    if (result) {
      setAnimation(true)
      const timer = setTimeout(() => setAnimation(false), 300)
      return () => clearTimeout(timer)
    }
  }, [result])

  const handleNumberInput = (num) => {
    if (isCalculated) {
      setInput(num)
      setIsCalculated(false)
    } else {
      setInput(input === '0' ? num : input + num)
    }
  }

  const handleDecimalPoint = () => {
    if (isCalculated) {
      setInput('0.')
      setIsCalculated(false)
      return
    }
    
    // If the current input doesn't contain a decimal point, add one
    if (!input.includes('.')) {
      setInput(input + '.')
    }
  }

  const handleOperator = (operator) => {
    if (result && isCalculated) {
      // Continue calculation with the result
      setInput(result + operator)
      setResult('')
      setIsCalculated(false)
    } else {
      // Add operator to current input
      setInput(input + operator)
      setIsCalculated(false)
    }
  }

  const handleClear = () => {
    setInput('0')
    setResult('')
    setIsCalculated(false)
  }

  const handleBackspace = () => {
    if (isCalculated) {
      setInput('0')
      setIsCalculated(false)
    } else if (input.length === 1) {
      setInput('0')
    } else {
      setInput(input.slice(0, -1))
    }
  }

  const handleMemoryStore = () => {
    try {
      // Store the current result or evaluated input
      const valueToStore = result || String(eval(input))
      setMemory(valueToStore)
      setLastOperation('MS')
    } catch (error) {
      setMemory(null)
    }
  }

  const handleMemoryRecall = () => {
    if (memory !== null) {
      if (isCalculated || input === '0') {
        setInput(memory)
      } else {
        setInput(input + memory)
      }
      setLastOperation('MR')
      setIsCalculated(false)
    }
  }

  const handleMemoryClear = () => {
    setMemory(null)
    setLastOperation('MC')
  }

  const calculateResult = () => {
    try {
      // Replace × with * and ÷ with / for evaluation
      const sanitizedInput = input.replace(/×/g, '*').replace(/÷/g, '/')
      
      const calculatedResult = eval(sanitizedInput)
      const formattedResult = Number.isInteger(calculatedResult) 
        ? calculatedResult.toString()
        : calculatedResult.toFixed(8).replace(/\.?0+$/, '')
      
      setResult(formattedResult)
      setIsCalculated(true)
      
      // Add to history
      if (onCalculation) {
        onCalculation({
          expression: input,
          result: formattedResult,
          timestamp: new Date()
        })
      }
    } catch (error) {
      setResult('Error')
      setIsCalculated(true)
    }
  }

  // Button configuration with enhanced styling
  const buttons = [
    { label: 'C', onClick: handleClear, className: 'bg-gradient-accent text-white font-bold rounded-xl shadow-md' },
    { label: <RotateCcw size={18} />, onClick: handleBackspace, className: 'bg-gradient-warning text-white font-medium rounded-xl shadow-md' },
    { label: '%', onClick: () => handleOperator('%'), className: 'bg-gradient-secondary text-white font-medium rounded-xl shadow-md' },
    { label: <Divide size={18} />, onClick: () => handleOperator('÷'), className: 'bg-gradient-secondary text-white font-medium rounded-xl shadow-md' },
    { label: '7', onClick: () => handleNumberInput('7'), className: 'bg-white dark:bg-surface-800 text-surface-800 dark:text-white font-medium rounded-xl shadow-md' },
    { label: '8', onClick: () => handleNumberInput('8'), className: 'bg-white dark:bg-surface-800 text-surface-800 dark:text-white font-medium rounded-xl shadow-md' },
    { label: '9', onClick: () => handleNumberInput('9'), className: 'bg-white dark:bg-surface-800 text-surface-800 dark:text-white font-medium rounded-xl shadow-md' },
    { label: <X size={18} />, onClick: () => handleOperator('×'), className: 'bg-gradient-secondary text-white font-medium rounded-xl shadow-md' },
    { label: '4', onClick: () => handleNumberInput('4'), className: 'bg-white dark:bg-surface-800 text-surface-800 dark:text-white font-medium rounded-xl shadow-md' },
    { label: '5', onClick: () => handleNumberInput('5'), className: 'bg-white dark:bg-surface-800 text-surface-800 dark:text-white font-medium rounded-xl shadow-md' },
    { label: '6', onClick: () => handleNumberInput('6'), className: 'bg-white dark:bg-surface-800 text-surface-800 dark:text-white font-medium rounded-xl shadow-md' },
    { label: <Minus size={18} />, onClick: () => handleOperator('-'), className: 'bg-gradient-secondary text-white font-medium rounded-xl shadow-md' },
    { label: '1', onClick: () => handleNumberInput('1'), className: 'bg-white dark:bg-surface-800 text-surface-800 dark:text-white font-medium rounded-xl shadow-md' },
    { label: '2', onClick: () => handleNumberInput('2'), className: 'bg-white dark:bg-surface-800 text-surface-800 dark:text-white font-medium rounded-xl shadow-md' },
    { label: '3', onClick: () => handleNumberInput('3'), className: 'bg-white dark:bg-surface-800 text-surface-800 dark:text-white font-medium rounded-xl shadow-md' },
    { label: <Plus size={18} />, onClick: () => handleOperator('+'), className: 'bg-gradient-secondary text-white font-medium rounded-xl shadow-md' },
    { label: 'MS', onClick: handleMemoryStore, className: 'bg-gradient-info text-white text-sm font-medium rounded-xl shadow-md' },
    { label: '0', onClick: () => handleNumberInput('0'), className: 'bg-white dark:bg-surface-800 text-surface-800 dark:text-white font-medium rounded-xl shadow-md' },
    { label: '.', onClick: handleDecimalPoint, className: 'bg-white dark:bg-surface-800 text-surface-800 dark:text-white font-medium rounded-xl shadow-md' },
    { label: <Equal size={18} />, onClick: calculateResult, className: 'bg-gradient-primary hover:bg-gradient-purple-blue text-white font-bold rounded-xl shadow-md' },
  ]

  return (
    <div className="w-full max-w-md mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/70 dark:bg-surface-800/70 backdrop-blur-md rounded-2xl p-5 md:p-6 shadow-soft"
      >
        {/* Display */}
        <div className="bg-gradient-light dark:bg-gradient-dark rounded-xl p-4 mb-5 overflow-hidden shadow-md">
          <div className="flex justify-between items-center mb-1">
            <div className="text-xs text-surface-500 dark:text-surface-400 flex items-center gap-1">
              {memory !== null && (
                <span className="bg-gradient-primary text-white px-1.5 py-0.5 rounded text-xs">
                  M
                </span>
              )}
              {lastOperation && (
                <span className="text-xs text-surface-400 dark:text-surface-500">
                  {lastOperation}
                </span>
              )}
            </div>
            <div className="flex gap-2">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={handleMemoryRecall}
                disabled={memory === null}
                className={`p-1 rounded ${memory === null ? 'text-surface-400 dark:text-surface-600' : 'text-primary-vivid hover:bg-surface-200 dark:hover:bg-surface-700'}`}
                title="Memory Recall"
              >
                <Clock size={14} />
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={handleMemoryClear}
                disabled={memory === null}
                className={`p-1 rounded ${memory === null ? 'text-surface-400 dark:text-surface-600' : 'text-accent-light hover:bg-surface-200 dark:hover:bg-surface-700'}`}
                title="Memory Clear"
              >
                <Trash2 size={14} />
              </motion.button>
            </div>
          </div>
          
          <div className="text-right overflow-x-auto scrollbar-hide whitespace-nowrap text-2xl font-medium mb-1">
            {input}
          </div>
          
          <AnimatePresence>
            {result && (
              <motion.div 
                key={result}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`text-right text-3xl font-bold bg-clip-text text-transparent 
                  ${animation ? 'bg-gradient-accent' : 'bg-gradient-primary'} 
                  transition-colors duration-300`}
              >
                {result}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Keypad */}
        <div className="grid grid-cols-4 gap-3">
          {buttons.map((button, index) => (
            <motion.button
              key={index}
              whileTap={{ scale: 0.95 }}
              whileHover={{ boxShadow: "0 0 8px rgba(139, 92, 246, 0.3)" }}
              className={`${button.className} h-14 md:h-16`}
              onClick={button.onClick}
            >
              {button.label}
            </motion.button>
          ))}
        </div>
        
        {/* Memory buttons */}
        <div className="mt-4 flex justify-between">
          <div className="text-xs text-surface-500 dark:text-surface-400">
            {memory !== null && (
              <div className="flex items-center gap-1">
                <span>Memory:</span>
                <span className="font-medium bg-gradient-primary bg-clip-text text-transparent">{memory}</span>
              </div>
            )}
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleMemoryStore}
            className="text-xs flex items-center gap-1 bg-gradient-primary-secondary bg-clip-text text-transparent hover:text-primary-dark dark:hover:text-primary-light transition-colors"
          >
            <Save size={14} className="text-primary-vivid" />
            <span>Save result</span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}

export default MainFeature