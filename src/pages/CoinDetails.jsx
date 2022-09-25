import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import millify from "millify";
import "../App.css";

const CoinDetails = () => {
  const [coin, setCoin] = useState({});
  const [loading, setLoading] = useState(true);

  const url = `https://api.coingecko.com/api/v3/coins`;

  useEffect(() => {
    const coin = window.location.href.split("/")[3];
    axios
      .get(`${url}/${coin}`)
      .then((res) => {
        setCoin(res.data);

        setTimeout(() => {
          setLoading(false);
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="details">
      {loading ? (
        <p>loading...</p>
      ) : (
        <div>
          <p> Market Cap Rank:{coin.market_cap_rank}</p>
          <p>{coin.name}</p>
          <p>Score : {coin.coingecko_score}</p>
          <p>Price:{coin.market_data.current_price.usd}</p>
          <p>24hr high:{coin.market_data.high_24h.usd}</p>
          {millify(d.high_24h)}
          <p>24hr low:{coin.market_data.low_24h.usd}</p>
          <p>Mkt:{coin.market_data.market_cap.usd}</p>
          <p>Description:{coin.description.en}</p>
        </div>
      )}
    </div>
  );
};

export default CoinDetails;
