import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import CoinDetails from "./CoinDetails";
import "../App.css";

function Homepage() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const url =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setData(response.data);
        console.log;
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const filteredData = () => {
    if (!searchTerm) {
      return data;
    } else {
      return data.filter((coin) =>
        coin.name.toLowerCase().startsWith(searchTerm)
      );
    }
  };
  return (
    <div className="container">
      <div>
        <div className="search-bar">
          <input
            type={"text"}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="heading">
          <p>#</p>
          <p>Coin</p>
          <p>Price</p>
          <p>24hr</p>
          <p>Mkt Cap</p>
        </div>

        <div>
          {filteredData().map((d) => (
            <Link to={`/${d.id}`} key={d.market_cap_rank} className="coin-row">
              <p>{d.market_cap_rank}</p>

              <p>
                <img src={d.image} width={20} />
                {d.name}
              </p>

              <p>$ {millify(d.high_24h)}</p>
              <p>${millify(d.current_price)}</p>
              <p>${millify(d.market_cap)}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Homepage;
