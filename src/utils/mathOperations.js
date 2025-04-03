// Constants
export const PI = Math.PI;
export const E = Math.E;

// Conversion helpers
export const toRadians = (degrees) => degrees * (Math.PI / 180);
export const toDegrees = (radians) => radians * (180 / Math.PI);

// Number formatting
export const formatNumber = (num) => {
  // Handle special cases
  if (num === Infinity || num === -Infinity) {
    return 'Infinity';
  }
  if (isNaN(num)) {
    return 'Error';
  }
  
  // Format the number
  if (Math.abs(num) < 1e-10) return '0'; // Handle very small numbers near zero
  
  if (Math.abs(num) >= 1e10 || Math.abs(num) < 1e-6) {
    // Use scientific notation for very large or very small numbers
    return num.toExponential(8).replace(/\.?0+e/, 'e');
  }
  
  // Regular number formatting with up to 8 decimal places
  const formatted = Number.isInteger(num) 
    ? num.toString()
    : num.toFixed(8).replace(/\.?0+$/, '');
  
  return formatted;
};

// Basic operations
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;
export const multiply = (a, b) => a * b;
export const divide = (a, b) => {
  if (b === 0) throw new Error('Division by zero');
  return a / b;
};
export const modulo = (a, b) => a % b;

// Power functions
export const square = (x) => Math.pow(x, 2);
export const cube = (x) => Math.pow(x, 3);
export const power = (base, exponent) => Math.pow(base, exponent);
export const squareRoot = (x) => {
  if (x < 0) throw new Error('Invalid input for square root');
  return Math.sqrt(x);
};
export const cubeRoot = (x) => Math.cbrt(x);
export const nthRoot = (x, n) => {
  if (x < 0 && n % 2 === 0) throw new Error('Invalid input for even root');
  return Math.pow(x, 1/n);
};

// Logarithmic functions
export const ln = (x) => {
  if (x <= 0) throw new Error('Invalid input for logarithm');
  return Math.log(x);
};
export const log10 = (x) => {
  if (x <= 0) throw new Error('Invalid input for logarithm');
  return Math.log10(x);
};
export const log2 = (x) => {
  if (x <= 0) throw new Error('Invalid input for logarithm');
  return Math.log2(x);
};

// Factorial (with limit to prevent crashes)
export const factorial = (n) => {
  if (n < 0) throw new Error('Invalid input for factorial');
  if (!Number.isInteger(n)) throw new Error('Factorial requires an integer');
  if (n > 170) throw new Error('Factorial too large');
  
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
};

// Trigonometric functions (in radians)
export const sin = (x) => Math.sin(x);
export const cos = (x) => Math.cos(x);
export const tan = (x) => {
  // Handle undefined values at π/2, 3π/2, etc.
  const normalized = x % Math.PI;
  if (Math.abs(normalized - Math.PI/2) < 1e-10) {
    throw new Error('Tangent undefined');
  }
  return Math.tan(x);
};
export const asin = (x) => {
  if (x < -1 || x > 1) throw new Error('Invalid input for arcsine');
  return Math.asin(x);
};
export const acos = (x) => {
  if (x < -1 || x > 1) throw new Error('Invalid input for arccosine');
  return Math.acos(x);
};
export const atan = (x) => Math.atan(x);

// Hyperbolic functions
export const sinh = (x) => Math.sinh(x);
export const cosh = (x) => Math.cosh(x);
export const tanh = (x) => Math.tanh(x);

// Miscellaneous functions
export const exp = (x) => Math.exp(x);
export const abs = (x) => Math.abs(x);
export const round = (x) => Math.round(x);
export const floor = (x) => Math.floor(x);
export const ceil = (x) => Math.ceil(x);
export const sign = (x) => Math.sign(x);

// Convert between degrees and radians
export const sinDeg = (degrees) => Math.sin(toRadians(degrees));
export const cosDeg = (degrees) => Math.cos(toRadians(degrees));
export const tanDeg = (degrees) => {
  const rad = toRadians(degrees);
  // Check for undefined values (90°, 270°, etc.)
  const mod = degrees % 180;
  if (mod === 90 || mod === 270) {
    throw new Error('Tangent undefined');
  }
  return Math.tan(rad);
};
export const asinDeg = (x) => toDegrees(asin(x));
export const acosDeg = (x) => toDegrees(acos(x));
export const atanDeg = (x) => toDegrees(atan(x));