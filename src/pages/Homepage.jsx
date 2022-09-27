import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import "../App.css";

function Homepage() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [fav, setFav] = useState([]);

  const url =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setData(response.data);
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

  useEffect(() => {
    if (!localStorage.getItem("fav")) {
      localStorage.setItem("fav", JSON.stringify([]));
    } else {
      setFav(JSON.parse(localStorage.getItem("fav")));
    }
  }, []);

  const addToFav = (coinId) => {
    if (fav.includes(coinId)) {
      const newFav = fav.filter((coin) => coin !== coinId);
      console.log(newFav);
      setFav(newFav);
      localStorage.setItem("fav", JSON.stringify(newFav));
    } else {
      const newFav = [...fav, coinId];
      setFav(newFav);
      localStorage.setItem("fav", JSON.stringify(newFav));
    }
  };

  return (
    <div className="container">
      <div>
        <div className="bar">
          <p>CryptoCoin</p>
          <div className="search-bar">
            <div>
              <input
                type={"text"}
                placeholder="search"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Link to={"./favcoin"}>
              <button>Fav</button>
            </Link>
          </div>
        </div>
        <div className="heading">
          <p>#</p>
          <p>Coin</p>
          <p>Price</p>
          <p className="hide">24hr</p>
          <p className="hide">Mkt Cap</p>
          <p>24hr %</p>
          <p>Add to Fav</p>
        </div>

        <div>
          {filteredData().map((d) => (
            <div key={d.market_cap_rank} className="coin-row">
              <p>{d.market_cap_rank}</p>

              <Link to={`/${d.id}`} className="coin-name-and-logo">
                <img src={d.image} />
                <p>{d.name}</p>
              </Link>

              <p className="hide">$ {millify(d.high_24h)}</p>
              <p>${millify(d.current_price)}</p>
              <p className="hide">${millify(d.market_cap)}</p>
              <p
                style={{
                  color:
                    d.market_cap_change_percentage_24h < 1 ? "red" : "green",
                }}
              >
                {millify(d.market_cap_change_percentage_24h)}
              </p>

              <button
                className="btn"
                onClick={() => {
                  addToFav(d.id);
                }}
              >
                {fav.includes(d.id) ? "Remove from fav" : "Add to Fav"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Homepage;
