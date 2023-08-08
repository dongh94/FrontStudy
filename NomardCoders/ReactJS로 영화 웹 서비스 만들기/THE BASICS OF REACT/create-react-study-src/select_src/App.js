import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [selectOne, setSelectOne] = useState(0);
  const [exchangeRate, setExchangeRate ] = useState([]);
  const [calcValue, setCalcValue] = useState(0);
  useEffect(async () => {
    await fetch("https://api.coinpaprika.com/v1/tickers")
      .then(async (res) => await res.json())
      .then((json) => {
        setCoins(json)
        setLoading(false)
      })
  }, [])

  const getEx = async () => {
    const res = await fetch(`https://quotation-api-cdn.dunamu.com/v1/forex/recent?codes=FRX.KRWUSD`)
    const json = await res.json()
    setExchangeRate(json);
  } 
  useEffect(async () => {
    getEx();
  }, [])

  const onSelect = (event) => {
    setSelectOne(event.target.value)
    setCalcValue(exchangeRate[0].basePrice)
  }

  return (
    <div>
      <h1>The Coins ( {coins.length} )</h1>
      {loading ? <strong>Loading</strong> :
        <select onChange={onSelect}>
          {coins.map((coin) => (
            <option value={coin.quotes.USD.price}>
              {coin.name} ({coin.symbol}) : $ {coin.quotes.USD.price} USD
            </option>
          ))}
        </select>
        }

      <h2>선택한 하나의 암호화폐 값은 현재 환율로 계산했을 때 {Math.round(selectOne * calcValue)}원 입니다.</h2>
      {console.log(selectOne)}
    </div>
  )
}

export default App;
