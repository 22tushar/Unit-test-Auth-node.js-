const { ipcRenderer } = require('electron');

const fromCurrencySelect = document.getElementById('fromCurrency');
const toCurrencySelect = document.getElementById('toCurrency');
const amountInput = document.getElementById('amount');
const convertButton = document.getElementById('convert');
const resultDiv = document.getElementById('result');

// Fetch currencies from ExchangeRate-API
fetch('https://openexchangerates.org/api/currencies.json')
    .then(response => response.json())
    .then(data => {
        for (const currency in data) {
            const option1 = document.createElement('option');
            option1.value = currency;
            option1.innerText = `${currency} - ${data[currency]}`;
            const option2 = document.createElement('option');
            option2.value = currency;
            option2.innerText = `${currency} - ${data[currency]}`;
            fromCurrencySelect.appendChild(option1);
            toCurrencySelect.appendChild(option2);
        }
    });

convertButton.addEventListener('click', () => {
    const fromCurrency = fromCurrencySelect.value;
    const toCurrency = toCurrencySelect.value;
    const amount = amountInput.value;

    // Fetch exchange rates from ExchangeRate-API
    fetch(`https://openexchangerates.org/api/latest.json?app_id=2bb2dbae9cc6de6079b0c387&base=${fromCurrency}`)
        .then(response => response.json())
        .then(data => {
            const exchangeRate = data.rates[toCurrency];
            const convertedAmount = amount * exchangeRate;
            resultDiv.innerText = `Converted Amount: ${convertedAmount} ${toCurrency}`;
        });
});
