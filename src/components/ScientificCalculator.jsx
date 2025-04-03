import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  Save,
  ChevronDown,
  ChevronUp,
  Calculator,
  Layers,
  Power,
  Square,
  SquareRoot,
  ArrowRight
} from 'lucide-react';
import * as math from '../utils/mathOperations';

const ScientificCalculator = ({ onCalculation }) => {
  const [input, setInput] = useState('0');
  const [result, setResult] = useState('');
  const [memory, setMemory] = useState(null);
  const [lastOperation, setLastOperation] = useState('');
  const [isCalculated, setIsCalculated] = useState(false);
  const [animation, setAnimation] = useState(false);
  const [scientificMode, setScientificMode] = useState(false);
  const [angleUnit, setAngleUnit] = useState('deg'); // 'deg' or 'rad'
  const [activeTab, setActiveTab] = useState('trig');
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState([]);

  // Trigger animation when result changes
  useEffect(() => {
    if (result) {
      setAnimation(true);
      const timer = setTimeout(() => setAnimation(false), 300);
      return () => clearTimeout(timer);
    }
  }, [result]);

  // Handle numeric input
  const handleNumberInput = (num) => {
    if (isCalculated) {
      setInput(num);
      setIsCalculated(false);
    } else {
      setInput(input === '0' ? num : input + num);
    }
  };

  // Handle decimal point
  const handleDecimalPoint = () => {
    if (isCalculated) {
      setInput('0.');
      setIsCalculated(false);
      return;
    }
    
    // If the current input doesn't contain a decimal point, add one
    if (!input.includes('.')) {
      setInput(input + '.');
    }
  };

  // Handle basic operators
  const handleOperator = (operator) => {
    if (result && isCalculated) {
      // Continue calculation with the result
      setInput(result + operator);
      setResult('');
      setIsCalculated(false);
    } else {
      // Add operator to current input
      setInput(input + operator);
      setIsCalculated(false);
    }
  };

  // Clear all
  const handleClear = () => {
    setInput('0');
    setResult('');
    setIsCalculated(false);
  };

  // Backspace functionality
  const handleBackspace = () => {
    if (isCalculated) {
      setInput('0');
      setIsCalculated(false);
    } else if (input.length === 1) {
      setInput('0');
    } else {
      setInput(input.slice(0, -1));
    }
  };

  // Memory functions
  const handleMemoryStore = () => {
    try {
      // Store the current result or evaluated input
      const valueToStore = result || String(eval(sanitizeInput(input)));
      setMemory(valueToStore);
      setLastOperation('MS');
    } catch (error) {
      setMemory(null);
    }
  };

  const handleMemoryRecall = () => {
    if (memory !== null) {
      if (isCalculated || input === '0') {
        setInput(memory);
      } else {
        setInput(input + memory);
      }
      setLastOperation('MR');
      setIsCalculated(false);
    }
  };

  const handleMemoryClear = () => {
    setMemory(null);
    setLastOperation('MC');
  };

  // Helper to sanitize input for evaluation
  const sanitizeInput = (inputStr) => {
    return inputStr
      .replace(/×/g, '*')
      .replace(/÷/g, '/')
      .replace(/π/g, 'Math.PI')
      .replace(/e/g, 'Math.E')
      .replace(/sin\(/g, angleUnit === 'deg' ? 'math.sinDeg(' : 'Math.sin(')
      .replace(/cos\(/g, angleUnit === 'deg' ? 'math.cosDeg(' : 'Math.cos(')
      .replace(/tan\(/g, angleUnit === 'deg' ? 'math.tanDeg(' : 'Math.tan(')
      .replace(/asin\(/g, angleUnit === 'deg' ? 'math.asinDeg(' : 'Math.asin(')
      .replace(/acos\(/g, angleUnit === 'deg' ? 'math.acosDeg(' : 'Math.acos(')
      .replace(/atan\(/g, angleUnit === 'deg' ? 'math.atanDeg(' : 'Math.atan(')
      .replace(/ln\(/g, 'Math.log(')
      .replace(/log\(/g, 'Math.log10(')
      .replace(/sqrt\(/g, 'Math.sqrt(')
      .replace(/cbrt\(/g, 'Math.cbrt(')
      .replace(/\^/g, '**');
  };

  // Calculate result
  const calculateResult = () => {
    try {
      const sanitizedInput = sanitizeInput(input);
      
      // Use the Function constructor to safely evaluate the math expression
      // This allows us to use the Math object and our custom math functions
      const result = Function('Math', 'math', `"use strict"; return ${sanitizedInput}`)(Math, math);
      
      // Format the result
      const formattedResult = math.formatNumber(result);
      
      setResult(formattedResult);
      setIsCalculated(true);
      
      // Add to history
      const calculation = {
        expression: input,
        result: formattedResult,
        timestamp: new Date()
      };
      
      setHistory(prev => [calculation, ...prev].slice(0, 10));
      
      if (onCalculation) {
        onCalculation(calculation);
      }
    } catch (error) {
      console.error('Calculation error:', error);
      setResult('Error');
      setIsCalculated(true);
    }
  };

  // Toggle angle unit between degrees and radians
  const toggleAngleUnit = () => {
    setAngleUnit(prev => prev === 'deg' ? 'rad' : 'deg');
  };

  // Insert scientific function
  const insertFunction = (funcName) => {
    if (isCalculated) {
      setInput(`${funcName}(${result})`);
      setResult('');
      setIsCalculated(false);
    } else if (input === '0') {
      setInput(`${funcName}(`);
    } else {
      setInput(input + `${funcName}(`);
    }
  };

  // Insert constant
  const insertConstant = (constant) => {
    if (isCalculated) {
      setInput(constant);
      setResult('');
      setIsCalculated(false);
    } else if (input === '0') {
      setInput(constant);
    } else {
      setInput(input + constant);
    }
  };

  // Insert power
  const insertPower = (power) => {
    if (isCalculated) {
      setInput(`${result}^${power}`);
      setResult('');
      setIsCalculated(false);
    } else {
      setInput(input + `^${power}`);
    }
  };

  // Insert custom power
  const insertCustomPower = () => {
    if (isCalculated) {
      setInput(`${result}^`);
      setResult('');
      setIsCalculated(false);
    } else {
      setInput(input + '^');
    }
  };

  // Insert factorial
  const insertFactorial = () => {
    try {
      if (isCalculated && result !== 'Error') {
        const num = parseFloat(result);
        if (Number.isInteger(num) && num >= 0) {
          const factResult = math.factorial(num);
          setResult(math.formatNumber(factResult));
        } else {
          setResult('Error');
        }
      } else {
        // Try to evaluate the current input first
        const sanitizedInput = sanitizeInput(input);
        const evaluated = Function('Math', 'math', `"use strict"; return ${sanitizedInput}`)(Math, math);
        
        if (Number.isInteger(evaluated) && evaluated >= 0) {
          const factResult = math.factorial(evaluated);
          setResult(math.formatNumber(factResult));
          setInput(`${input}!`);
          setIsCalculated(true);
        } else {
          setResult('Error');
          setIsCalculated(true);
        }
      }
    } catch (error) {
      setResult('Error');
      setIsCalculated(true);
    }
  };

  // Button configuration
  const standardButtons = [
    { label: 'C', onClick: handleClear, className: 'bg-gradient-accent text-white font-bold rounded-xl shadow-md' },
    { label: <div className="flex justify-center items-center"><RotateCcw size={18} /></div>, onClick: handleBackspace, className: 'bg-gradient-warning text-white font-medium rounded-xl shadow-md' },
    { label: '%', onClick: () => handleOperator('%'), className: 'bg-gradient-secondary text-white font-medium rounded-xl shadow-md' },
    { label: <div className="flex justify-center items-center"><Divide size={18} /></div>, onClick: () => handleOperator('÷'), className: 'bg-gradient-secondary text-white font-medium rounded-xl shadow-md' },
    { label: '7', onClick: () => handleNumberInput('7'), className: 'bg-white dark:bg-surface-800 text-surface-800 dark:text-white font-medium rounded-xl shadow-md' },
    { label: '8', onClick: () => handleNumberInput('8'), className: 'bg-white dark:bg-surface-800 text-surface-800 dark:text-white font-medium rounded-xl shadow-md' },
    { label: '9', onClick: () => handleNumberInput('9'), className: 'bg-white dark:bg-surface-800 text-surface-800 dark:text-white font-medium rounded-xl shadow-md' },
    { label: <div className="flex justify-center items-center"><X size={18} /></div>, onClick: () => handleOperator('×'), className: 'bg-gradient-secondary text-white font-medium rounded-xl shadow-md' },
    { label: '4', onClick: () => handleNumberInput('4'), className: 'bg-white dark:bg-surface-800 text-surface-800 dark:text-white font-medium rounded-xl shadow-md' },
    { label: '5', onClick: () => handleNumberInput('5'), className: 'bg-white dark:bg-surface-800 text-surface-800 dark:text-white font-medium rounded-xl shadow-md' },
    { label: '6', onClick: () => handleNumberInput('6'), className: 'bg-white dark:bg-surface-800 text-surface-800 dark:text-white font-medium rounded-xl shadow-md' },
    { label: <div className="flex justify-center items-center"><Minus size={18} /></div>, onClick: () => handleOperator('-'), className: 'bg-gradient-secondary text-white font-medium rounded-xl shadow-md' },
    { label: '1', onClick: () => handleNumberInput('1'), className: 'bg-white dark:bg-surface-800 text-surface-800 dark:text-white font-medium rounded-xl shadow-md' },
    { label: '2', onClick: () => handleNumberInput('2'), className: 'bg-white dark:bg-surface-800 text-surface-800 dark:text-white font-medium rounded-xl shadow-md' },
    { label: '3', onClick: () => handleNumberInput('3'), className: 'bg-white dark:bg-surface-800 text-surface-800 dark:text-white font-medium rounded-xl shadow-md' },
    { label: <div className="flex justify-center items-center"><Plus size={18} /></div>, onClick: () => handleOperator('+'), className: 'bg-gradient-secondary text-white font-medium rounded-xl shadow-md' },
    { label: 'MS', onClick: handleMemoryStore, className: 'bg-gradient-info text-white text-sm font-medium rounded-xl shadow-md' },
    { label: '0', onClick: () => handleNumberInput('0'), className: 'bg-white dark:bg-surface-800 text-surface-800 dark:text-white font-medium rounded-xl shadow-md' },
    { label: '.', onClick: handleDecimalPoint, className: 'bg-white dark:bg-surface-800 text-surface-800 dark:text-white font-medium rounded-xl shadow-md' },
    { label: <div className="flex justify-center items-center"><Equal size={18} /></div>, onClick: calculateResult, className: 'bg-gradient-primary hover:bg-gradient-purple-blue text-white font-bold rounded-xl shadow-md' },
  ];

  // Tab configurations for scientific mode
  const tabs = [
    { id: 'trig', label: 'Trig' },
    { id: 'func', label: 'Func' },
    { id: 'const', label: 'Const' }
  ];

  // Scientific button configurations by tab
  const scientificButtons = {
    trig: [
      { label: 'sin', onClick: () => insertFunction('sin'), className: 'scientific-button' },
      { label: 'cos', onClick: () => insertFunction('cos'), className: 'scientific-button' },
      { label: 'tan', onClick: () => insertFunction('tan'), className: 'scientific-button' },
      { label: angleUnit === 'deg' ? 'DEG' : 'RAD', onClick: toggleAngleUnit, className: 'bg-indigo-500 text-white text-xs font-medium rounded-xl shadow-md' },
      { label: 'asin', onClick: () => insertFunction('asin'), className: 'scientific-button' },
      { label: 'acos', onClick: () => insertFunction('acos'), className: 'scientific-button' },
      { label: 'atan', onClick: () => insertFunction('atan'), className: 'scientific-button' },
      { label: '(', onClick: () => handleOperator('('), className: 'scientific-button' },
      { label: 'sinh', onClick: () => insertFunction('sinh'), className: 'scientific-button' },
      { label: 'cosh', onClick: () => insertFunction('cosh'), className: 'scientific-button' },
      { label: 'tanh', onClick: () => insertFunction('tanh'), className: 'scientific-button' },
      { label: ')', onClick: () => handleOperator(')'), className: 'scientific-button' },
    ],
    func: [
      { label: 'x²', onClick: () => insertPower(2), className: 'scientific-button' },
      { label: 'x³', onClick: () => insertPower(3), className: 'scientific-button' },
      { label: 'xʸ', onClick: insertCustomPower, className: 'scientific-button' },
      { label: 'x!', onClick: insertFactorial, className: 'scientific-button' },
      { label: '√x', onClick: () => insertFunction('sqrt'), className: 'scientific-button' },
      { label: '∛x', onClick: () => insertFunction('cbrt'), className: 'scientific-button' },
      { label: '1/x', onClick: () => setInput(`1/(${input})`), className: 'scientific-button' },
      { label: '|x|', onClick: () => insertFunction('abs'), className: 'scientific-button' },
      { label: 'log', onClick: () => insertFunction('log'), className: 'scientific-button' },
      { label: 'ln', onClick: () => insertFunction('ln'), className: 'scientific-button' },
      { label: 'eˣ', onClick: () => insertFunction('exp'), className: 'scientific-button' },
      { label: '10ˣ', onClick: () => setInput(`10^(${input})`), className: 'scientific-button' },
    ],
    const: [
      { label: 'π', onClick: () => insertConstant('π'), className: 'constant-button' },
      { label: 'e', onClick: () => insertConstant('e'), className: 'constant-button' },
      { label: 'rand', onClick: () => setInput(Math.random().toString()), className: 'constant-button' },
      { label: 'ANS', onClick: () => result && setInput(result), className: 'constant-button' },
      { label: 'ceil', onClick: () => insertFunction('ceil'), className: 'scientific-button' },
      { label: 'floor', onClick: () => insertFunction('floor'), className: 'scientific-button' },
      { label: 'round', onClick: () => insertFunction('round'), className: 'scientific-button' },
      { label: '±', onClick: () => setInput(input.startsWith('-') ? input.slice(1) : '-' + input), className: 'scientific-button' },
    ],
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/70 dark:bg-surface-800/70 backdrop-blur-md rounded-2xl p-5 md:p-6 shadow-soft"
      >
        {/* Mode Toggle */}
        <div className="flex justify-between items-center mb-3">
          <motion.button 
            whileTap={{ scale: 0.95 }}
            onClick={() => setScientificMode(!scientificMode)}
            className="mode-toggle"
          >
            <span className="mr-1">
              {scientificMode ? <Calculator size={14} /> : <Layers size={14} />}
            </span>
            {scientificMode ? 'Basic' : 'Scientific'}
          </motion.button>
          
          {scientificMode && (
            <div className="flex space-x-1">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`tab-button ${
                    activeTab === tab.id ? 'tab-button-active' : 'tab-button-inactive'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          )}
          
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowHistory(!showHistory)}
            className="mode-toggle"
          >
            <span className="mr-1">
              <Clock size={14} />
            </span>
            History
          </motion.button>
        </div>
        
        {/* History Panel */}
        <AnimatePresence>
          {showHistory && history.length > 0 && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mb-3 overflow-hidden"
            >
              <div className="bg-surface-50 dark:bg-surface-900 rounded-xl p-3 max-h-32 overflow-y-auto scrollbar-hide">
                {history.map((item, index) => (
                  <div 
                    key={index} 
                    className="flex justify-between items-center text-xs mb-1 pb-1 border-b border-surface-200 dark:border-surface-700 last:border-0"
                  >
                    <div className="truncate">
                      {item.expression}
                    </div>
                    <div className="flex items-center">
                      <ArrowRight size={10} className="mx-1 text-surface-400" />
                      <span className="font-medium text-primary">{item.result}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
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
              {scientificMode && (
                <span className="bg-indigo-500 text-white px-1.5 py-0.5 rounded text-xs ml-1">
                  {angleUnit.toUpperCase()}
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
        
        {/* Scientific Keypad */}
        <AnimatePresence>
          {scientificMode && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="scientific-panel">
                {scientificButtons[activeTab].map((button, index) => (
                  <motion.button
                    key={index}
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ boxShadow: "0 0 8px rgba(139, 92, 246, 0.3)" }}
                    className={`${button.className} h-10 flex justify-center items-center text-sm`}
                    onClick={button.onClick}
                  >
                    {button.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Standard Keypad */}
        <div className={`grid grid-cols-4 gap-3 ${scientificMode ? 'mt-3' : ''}`}>
          {standardButtons.map((button, index) => (
            <motion.button
              key={index}
              whileTap={{ scale: 0.95 }}
              whileHover={{ boxShadow: "0 0 8px rgba(139, 92, 246, 0.3)" }}
              className={`${button.className} h-14 md:h-16 flex justify-center items-center`}
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
  );
};

export default ScientificCalculator;