document.addEventListener('DOMContentLoaded', function() {
  const apiUrl = 'https://www.floatrates.com/daily/thb.json';
  const currencySelect = document.getElementById('currency-select');
  const convertButton = document.getElementById('convert-btn');
  const resultElement = document.getElementById('result');

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      Object.keys(data).forEach(key => {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = `${key.toUpperCase()} (${data[key].name})`;
        currencySelect.appendChild(option);
      });
    });

  convertButton.addEventListener('click', () => {
    const amount = document.getElementById('amount').value;
    const selectedCurrency = currencySelect.value;

    if (!amount) {
      alert('Please enter an amount');
      return;
    }

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const rate = data[selectedCurrency].inverseRate;
        const result = (amount * rate).toFixed(2);
        resultElement.textContent = result;
      });
  });
});
