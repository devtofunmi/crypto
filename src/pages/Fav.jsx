import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import millify from "millify";
import "../App.css";
import { Link } from "react-router-dom";

const Fav = () => {
  const [favs, setFavs] = useState([]);
  const [loading, setLoading] = useState(true);

  const url = "https://api.coingecko.com/api/v3/coins";

  useEffect(() => {
    const fav = JSON.parse(localStorage.getItem("fav"));
    const arr = [];
    fav.map((coin) => {
      axios
        .get(`${url}/${coin}`)
        .then((res) => {
          arr.push(res.data);
          console.log(res.data);
          setFavs(arr);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }, []);

  return (
    <div className="container">
      <div className="heading">
        <p>#</p>
        <p>Coin</p>
        <p>Price</p>
        <p className="hide">24hr</p>
        <p className="hide">Mkt Cap</p>
        <p>24hr %</p>
      </div>

      <div>
        {favs.map((d) => (
          <div key={d.market_cap_rank} className="coin-row">
            <p>{d.market_cap_rank}</p>

            <Link to={`/${d.id}`} className="coin-name-and-logo">
              <img src={d.image.small} />
              <p>{d.name}</p>
            </Link>

            <p className="hide">
              $ {millify(d.market_data.market_cap_change_24h)}
            </p>
            <p>${millify(d.market_data.current_price.usd)}</p>
            {/* <p className="hide">${millify(d.market_cap)}</p>
              <p
                style={{
                  color:
                    d.market_cap_change_percentage_24h < 1 ? "red" : "green",
                }}
              >
                {millify(d.market_cap_change_percentage_24h)}
              </p> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Fav;
