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

  // Button configuration
  const buttons = [
    { label: 'C', onClick: handleClear, className: 'calc-button-clear' },
    { label: <RotateCcw size={18} />, onClick: handleBackspace, className: 'calc-button-function' },
    { label: '%', onClick: () => handleOperator('%'), className: 'calc-button-operation' },
    { label: <Divide size={18} />, onClick: () => handleOperator('÷'), className: 'calc-button-operation' },
    { label: '7', onClick: () => handleNumberInput('7'), className: 'calc-button-number' },
    { label: '8', onClick: () => handleNumberInput('8'), className: 'calc-button-number' },
    { label: '9', onClick: () => handleNumberInput('9'), className: 'calc-button-number' },
    { label: <X size={18} />, onClick: () => handleOperator('×'), className: 'calc-button-operation' },
    { label: '4', onClick: () => handleNumberInput('4'), className: 'calc-button-number' },
    { label: '5', onClick: () => handleNumberInput('5'), className: 'calc-button-number' },
    { label: '6', onClick: () => handleNumberInput('6'), className: 'calc-button-number' },
    { label: <Minus size={18} />, onClick: () => handleOperator('-'), className: 'calc-button-operation' },
    { label: '1', onClick: () => handleNumberInput('1'), className: 'calc-button-number' },
    { label: '2', onClick: () => handleNumberInput('2'), className: 'calc-button-number' },
    { label: '3', onClick: () => handleNumberInput('3'), className: 'calc-button-number' },
    { label: <Plus size={18} />, onClick: () => handleOperator('+'), className: 'calc-button-operation' },
    { label: 'MS', onClick: handleMemoryStore, className: 'calc-button-function text-sm' },
    { label: '0', onClick: () => handleNumberInput('0'), className: 'calc-button-number' },
    { label: '.', onClick: handleDecimalPoint, className: 'calc-button-number' },
    { label: <Equal size={18} />, onClick: calculateResult, className: 'calc-button-operation bg-primary dark:bg-primary' },
  ]

  return (
    <div className="w-full max-w-md mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="neu-light dark:neu-dark rounded-2xl p-5 md:p-6"
      >
        {/* Display */}
        <div className="bg-surface-100 dark:bg-surface-800 rounded-xl p-4 mb-5 overflow-hidden">
          <div className="flex justify-between items-center mb-1">
            <div className="text-xs text-surface-500 dark:text-surface-400 flex items-center gap-1">
              {memory !== null && (
                <span className="bg-primary/10 dark:bg-primary/20 text-primary px-1.5 py-0.5 rounded text-xs">
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
                className={`p-1 rounded ${memory === null ? 'text-surface-400 dark:text-surface-600' : 'text-primary hover:bg-surface-200 dark:hover:bg-surface-700'}`}
                title="Memory Recall"
              >
                <Clock size={14} />
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={handleMemoryClear}
                disabled={memory === null}
                className={`p-1 rounded ${memory === null ? 'text-surface-400 dark:text-surface-600' : 'text-accent hover:bg-surface-200 dark:hover:bg-surface-700'}`}
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
                className={`text-right text-3xl font-bold text-primary dark:text-primary-light ${animation ? 'text-accent' : ''} transition-colors duration-300`}
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
                <span className="font-medium text-surface-700 dark:text-surface-300">{memory}</span>
              </div>
            )}
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleMemoryStore}
            className="text-xs flex items-center gap-1 text-primary hover:text-primary-dark dark:hover:text-primary-light transition-colors"
          >
            <Save size={14} />
            <span>Save result</span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}

export default MainFeature