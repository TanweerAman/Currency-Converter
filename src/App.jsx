import { useState } from "react";
import { InputBox } from "./components";
import useCurrencyInfo from "./hooks/useCurrencyInfo";

function App() {
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyInfo = useCurrencyInfo(from);
  const options = Object.keys(currencyInfo);

  const convert = () => {
    if (currencyInfo[to]) {
      setConvertedAmount(amount * currencyInfo[to]);
    }
  };

  const swap = () => {
    setFrom(to);
    setTo(from);
    setAmount(convertedAmount);
    setConvertedAmount(amount);
  };

  return (
    <div
      className="w-full h-screen flex justify-center items-center bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://plus.unsplash.com/premium_photo-1681487767138-ddf2d67b35c1?q=80&w=1255&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >
      {/* Dark overlay to make background visible */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Glass card */}
      <div className="relative w-full max-w-lg mx-auto p-8 rounded-2xl backdrop-blur-lg bg-white/20 shadow-2xl border border-white/30 z-10">
        {/* Header */}
        <h1 className="text-4xl font-extrabold text-center text-white mb-8 drop-shadow-lg">
          💱 Currency Converter
        </h1>

        {/* Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            convert();
          }}
        >
          {/* From */}
          <InputBox
            label="From"
            amount={amount}
            currencyOptions={options}
            onCurrencyChange={(currency) => setFrom(currency)}
            selectCurrency={from}
            onAmountChange={(amount) => setAmount(amount)}
          />

          {/* Swap button */}
          <div className="flex justify-center my-6">
            <button
              type="button"
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-full shadow-lg hover:scale-105 transition transform"
              onClick={swap}
            >
              🔄 Swap
            </button>
          </div>

          {/* To */}
          <InputBox
            label="To"
            amount={convertedAmount}
            currencyOptions={options}
            onCurrencyChange={(currency) => setTo(currency)}
            selectCurrency={to}
            amountDisable
          />

          {/* Convert button */}
          <button
            type="submit"
            className="mt-8 w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white text-lg font-semibold px-6 py-4 rounded-xl shadow-xl hover:scale-105 transition transform"
          >
            Convert {from.toUpperCase()} → {to.toUpperCase()}
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
