import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import money from './assets/money.jpg'
import useCurrencyInfo from './components/hooks/useCurrencyInfo.js'
import { Inputbox  } from './components/index.js'

function App() {
  const [amount , setAmount] = useState(0);
  const [from , setFrom] = useState('usd');
  const [to , setTo] = useState('inr');
  const [convertedAmount , setConvertedAmount] = useState(0);

  const currencyInfo = useCurrencyInfo(from);
  const options = Object.keys(currencyInfo);

  const swap = () => {
    setFrom(to);
    setTo(from);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
  }

  const converter = () => {
    setConvertedAmount(amount * currencyInfo[to]);
  }

  return (
    <div className='w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat' style={{backgroundImage : `url(${money})`}}>
      <div className='w-full'>
        <div className='w-full max-w-2xl mx-auto border rounded-lg p-5 backdrop-blur-sm bg-white/30 scale-[1.3]'>
          <form onSubmit={(e) => {
            e.preventDefault();
            converter();
            }}>
            <div className='w-full mb-1'>
              <Inputbox 
                label="from"
                amount={amount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setFrom(currency)}
                onAmountChange={(amount) => setAmount(amount)}
                selectCurrency={from}
              />
            </div>
            <div className='relative w-full h-0.5'>
              <button
               className='absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5'
               onClick={swap}
              >Swap</button>
            </div>
            <div className='w-full mb-1'>
              <Inputbox
                label="to"
                currencyOptions={options}
                amount={convertedAmount}
                onCurrencyChange={(currency) => setTo(currency)}
                selectCurrency={to}
                amountEnable={false}
              />
            </div>
            <button
            type='submit'
              className='w-full bg-blue-600 text-white px-4 py-3 rounded-lg'
            > Convert
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default App
