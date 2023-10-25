import { useState } from "react";
import { Input } from "./components";
import useCurrencyInfo from "./hooks/useCurrencyInfo";


function App() {

  const [amount, setAmount] = useState(null);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState(null);
// console.log(from);
  const BackgroundImage="https://images.pexels.com/photos/1144230/pexels-photo-1144230.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"

  const CurrencyInfo = useCurrencyInfo(from);

  const options=Object.keys(CurrencyInfo);

  const swap = () => {
    setFrom(to);
    setTo(from);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
  };
  const convert = () => {
    setConvertedAmount(amount *CurrencyInfo[to].toFixed(2));
  }
  return (
    <div
        className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat p-5"
        style={{
            backgroundImage: `url('${BackgroundImage}')`,
        }}
    >
        <div className="w-full">
            <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        convert();
                    }}
                >
                    <div className="w-full mb-1">
                        <Input
                            label="From"
                            amount={amount}
                            currencyOptions={options}
                            onAmountChange={amount=>setAmount(amount)}
                            onCurrencyChange={currency=>setFrom(currency)}
                            selectCurrency={from}
                        />
                    </div>
                    {/* <div className="relative w-full h-max"> */}
                        <button
                            type="button"
                            className=" left-1/2 relative -translate-x-1/2 border-2 bg-gray-700 text-white border-black rounded-lg px-2 py-0.5 transition duration-100 active:scale-95"
                            onClick={swap}
                        >
                            swap
                        </button>
                    {/* </div> */}
                    <div className="w-full mt-1 mb-4">
                        <Input
                            label="to"
                            amount={convertedAmount}
                            currencyOptions={options}
                            onCurrencyChange={(currency)=>setTo(currency)}
                            selectCurrency={to}
                            amountDisable
                        />
                    </div>
                    <button type="submit" className="w-full text-white px-4 py-3 rounded-lg bg-black active:scale-95 transition duration-100    ">
                        Convert {from.toUpperCase()} to {to.toUpperCase()}
                    </button>
                </form>
            </div>
        </div>
    </div>
);
}

export default App;
