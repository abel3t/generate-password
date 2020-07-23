/**
 * @param {Array} symbols The symbols is registered
 */
function generateSymbol(symbols: []) {
  return symbols[Math.floor(Math.random() * symbols.length)];
}

/**
 * 
 * @param lowerAlphabet The lower characters in alphabet is registered
 */
function generateLowerAlphabet(lowerAlphabet: string) {
  return lowerAlphabet[Math.floor(Math.random() * lowerAlphabet.length)];
}

/**
 * 
 * @param upperAlphabet The upper characters in alphabet is registered
 */
function generateUpperAlphabet(upperAlphabet: string) {
  return upperAlphabet[Math.floor(Math.random() * upperAlphabet.length)];
}

/**
 * 
 * @param digits The numbers is registered
 */
function generateDigit(digits: string) {
  return digits[Math.floor(Math.random() * digits.length)];
}

let functions: {[key: string ]: any } = {};

 function randomFunction(currentFunctions: {[key: string ]: any }) {
   const _function = Object.keys(currentFunctions);
   const option: string = _function[Math.floor(Math.random() * _function.length)];
   const nextFunctions: {[key: string ]: any } = {
     ...functions
   };

  if (_function.length > 1) {
    delete nextFunctions[option];
  }

   return {
     type: option,
     nextFunctions
   };
 }

/**
 * 
 * @param {Number} length 
 * @param {Object} [options] This is Options
 * @param {Boolean} [options.includeSymbols] Is Include Symbols
 * @param {Boolean} [options.includeNumbers] Is Include Numbers
 * @param {Boolean} [options.includeLowercaseCharacters] Is Include Lowercase Characters
 * @param {Boolean} [options.includeUppercaseCharacters] Is Include Uppercase Characters
 * @param {Boolean} [options.excludeSimilarCharacters] Is Exclude Similar Characters
 * @param {Boolean} [options.excludeAmbiguousCharacters] Is Exclude Ambiguous Characters
 */
function generatePassword(length: number, options: any = {}) {
  let s: string = '';
  const {
    includeSymbols = true,
    includeNumbers = true,
    includeLowercaseCharacters = true,
    includeUppercaseCharacters = true,
    excludeSimilarCharacters = true,
    excludeAmbiguousCharacters = false
  } = options;

  let symbols: any = [];
  let digits: string = '';
  let lowerAlphabet: string = '';
  let upperAlphabet: string = '';

  functions = {};

  if (includeSymbols) {
    functions.generateSymbol = generateSymbol;
    symbols = ['!', '\"', '#', '$', '%', '&', '\'', '(', ')', '*', '+', ',', '-', '.', '/', ':', ';', '<', '=', '>', '?', '@', '[', '\\', ']', '^', '_', '`', '{', '|', '}', '~'];
  }

  if (excludeAmbiguousCharacters) {
    symbols = ['!', '#', '$', '%', '&', '\'', '*', '+', '-', '=', '?', '@', '^', '_', '|',];
  }

  if (includeLowercaseCharacters) {
    functions.generateLowerAlphabet = generateLowerAlphabet;
    lowerAlphabet = 'abcdefghijklmnopqrstuvwxyz';
  }

  if (includeUppercaseCharacters) {
    functions.generateUpperAlphabet = generateUpperAlphabet;
    upperAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  }

  if (includeNumbers) {
    functions.generateDigit = generateDigit;
    digits = '0123456789';
  }

  if (excludeSimilarCharacters) {
    lowerAlphabet = lowerAlphabet && 'abcdefghjkmnpqrstuvwxyz';
    upperAlphabet = upperAlphabet && 'ABCDEFGHIJKMNPQRSTUVWXYZ';
    digits = digits && '123456789';
  }

  let currentFunctions = {...functions };
  for (let i: number = 0; i < length; i++) {
    const {
      type,
      nextFunctions
    } = randomFunction(currentFunctions);
    currentFunctions = { ...nextFunctions };

    let char: string = '';
    switch (type) {
      case 'generateSymbol':
        char = generateSymbol(symbols);
        break;
      case 'generateLowerAlphabet':
        char = generateLowerAlphabet(lowerAlphabet);
        break;
      case 'generateUpperAlphabet':
        char = generateUpperAlphabet(upperAlphabet);
        break;
      case 'generateDigit':
        char = generateDigit(digits);
        break;
      default:
        break;
    }

    if (char == undefined) {
      console.log('Having some Error');
    }
    
    s += char;
  }
  return s;
}

export default generatePassword;