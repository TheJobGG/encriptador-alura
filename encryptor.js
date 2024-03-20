const btnEncrypt = document.getElementById('button-encrypt');
const btnDecrypt = document.getElementById('button-decrypt');
const btnCopyContent = document.getElementById('button-copy-content');
const inputTextArea = document.getElementById('text-to-encrypt');
const encryptDecryptAreaContent = document.getElementById('encrypt-decrypt-content');
const encryptDecryptTextElement = document.getElementById('content');

// Object containing key-value pairs representing the base for encryption.
const encryptValues = {
  'a': 'ai',
  'e': 'enter',
  'i': 'imes',
  'o': 'ober',
  'u': 'ufat',
}

// Invert key - value to write them once
const decryptValues = {};
Object.keys(encryptValues).forEach(key => {
  decryptValues[encryptValues[key]] = key;
});

// ==== Button events ====

// Add click event to Encrypt button
btnEncrypt.addEventListener('click', () => handleButtonClick('encrypt'));

// Add click event to Decrypt button
btnDecrypt.addEventListener('click', () => handleButtonClick('decrypt'));

// Add click event to Copy button
let copyTimer;
btnCopyContent.addEventListener('click', () => {
  navigator.clipboard.writeText(encryptDecryptTextElement.textContent);
  // Notify text was copied changing the button text
  btnCopyContent.textContent = "¡Copiado!";

  // Cancel previous timer if exists
  if (copyTimer) {
    clearTimeout(copyTimer);
  }

  // Set initial text after 3 seconds
  copyTimer = setTimeout(() => {
    btnCopyContent.textContent = "Copiar";
    copyTimer = null; // Reset the variable after the timer has elapsed
  }, 3000);
})



// ==== Button functions complements ====
// Encrypt text function
function encryptText(text = "") {
  // Reemplaza cada vocal (/[aeiou]/g) en el texto con su valor encriptado según el mapa 'encryptValues'.
  const encryptedText = text.replace(/[aeiou]/g, (match) => encryptValues[match] || match);
  return encryptedText;
}

// Decrypt text function
function decryptText(text = "") {
  const decryptedText = text.replace(/(?:ai|enter|imes|ober|ufat)/g, match => decryptValues[match] || match);
  return decryptedText;
}


// Evaluate Field function
function evaluateText(text = "") {
  if (!text) {
    inputTextArea.value = "";
    encryptDecryptAreaContent.classList.remove('has-content');
    inputTextArea.focus();
    return false;
  }

  return true;
}

// Show processed text in screen
function showProcessedText(text = "") {
  encryptDecryptAreaContent.classList.add('has-content');
  encryptDecryptTextElement.textContent = text;
}

function handleButtonClick(operation) {
  const textAreaContent = inputTextArea.value.trim();

  // Evaluate if text area is empty
  if (!evaluateText(textAreaContent)) return;

  let processedText;
  if (operation === 'encrypt') {
    processedText = encryptText(textAreaContent);
  } else if (operation === 'decrypt') {
    processedText = decryptText(textAreaContent);
  } else {
    console.error("Invalid operation. Please use 'encrypt' or 'decrypt'.");
    return;
  }

  showProcessedText(processedText);
}

inputTextArea.addEventListener('input', (event) => {
  let inputValue = event.target.value.toLowerCase();

  inputValue = inputValue.replace(/[^a-z ]/g, '');
  event.target.value = inputValue;

})
