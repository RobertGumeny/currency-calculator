const displayArea = document.getElementById('display')
const getRateButton = document.getElementById('get-rate')
const baseCurrencyElem = document.getElementById('base-currency')
const baseAmountElem = document.getElementById('base-amount')
const exchangeCurrencyElem = document.getElementById('exchange-currency')
const exchangeAmount = document.getElementById('exchange-amount')



function getResults() {
  const baseCurrency = baseCurrencyElem.value
  const exchangeCurrency = exchangeCurrencyElem.value
  const baseAmount = baseAmountElem.value

  fetch(`https://api.exchangeratesapi.io/latest?base=${baseCurrency}`)
    .then(res => res.json())
    .then(data => {
      for (const currency in data.rates) {
        if (baseCurrency == exchangeCurrency) {
          displayArea.innerText = `Cannot calculate exchange rate between identical currencies.`
        } else if (data.rates.hasOwnProperty(currency)) {
          const rate = data.rates[currency];
          if (currency == exchangeCurrency) {
            let rateTotal = rate * baseAmount
            displayArea.innerText = `${baseAmount} ${baseCurrency} = ${rateTotal.toFixed(2)} ${exchangeCurrency}`
            exchangeAmount.setAttribute("value", `${rateTotal.toFixed(2)}`)
          }
        }
      }
    })
}


getRateButton.addEventListener('click', getResults)
getResults()