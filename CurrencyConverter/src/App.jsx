
import { useState, useEffect } from 'react'
import './App.css'

const API_KEY = 'a63500049dcbf27c3bb5831d'
const BASE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}`

function App() {

  const [currencies, setCurrencies] = useState([])
  const [amount, setAmount] = useState(1)
  const [fromCurrency, setFromCurrency] = useState('USD')
  const [toCurrency, setToCurrency] = useState('INR')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')


  useEffect(() => {
    fetch(`${BASE_URL}/codes`)
      .then((res) => res.json())
      .then((data) => {
        if (data.result === 'success') {
          setCurrencies(data.supported_codes)
        } else {
          setError('Could not load currency list')
        }
      })
      .catch(() => setError('Could not load currency list'))
  }, [])


  const handleConvert = async () => {
    setError('')
    setResult(null)

    if (!amount || amount <= 0) {
      setError('Please enter a valid amount')
      return
    }

    setLoading(true)
    try {
      const response = await fetch(
        `${BASE_URL}/pair/${fromCurrency}/${toCurrency}/${amount}`
      )
      const data = await response.json()

      if (data.result !== 'success') {
        throw new Error('Conversion failed')
      }

      setResult({
        rate: data.conversion_rate,
        convertedAmount: data.conversion_result,
      })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }


  const handleSwap = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
    setResult(null)
  }

  return (
    <div className="container">
      <h1>Currency Converter</h1>

      <div className="row">
        <input
          type="number"
          min="0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
        />
      </div>

      <div className="row currency-row">
        <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
          {currencies.map(([code, name]) => (
            <option key={code} value={code}>
              {code} - {name}
            </option>
          ))}
        </select>

        <button className="swap-btn" onClick={handleSwap} title="Swap currencies">
          ⇄
        </button>

        <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
          {currencies.map(([code, name]) => (
            <option key={code} value={code}>
              {code} - {name}
            </option>
          ))}
        </select>
      </div>

      <button className="convert-btn" onClick={handleConvert} disabled={loading}>
        {loading ? 'Converting...' : 'Convert'}
      </button>

      {error && <p className="error">{error}</p>}

      {result && (
        <div className="result">
          <p>
            {amount} {fromCurrency} =
          </p>
          <h2>
            {result.convertedAmount.toFixed(2)} {toCurrency}
          </h2>
          <p className="rate">
            1 {fromCurrency} = {result.rate} {toCurrency}
          </p>
        </div>
      )}
    </div>
  )
}

export default App
