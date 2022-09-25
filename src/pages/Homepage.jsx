import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import CoinDetails from "./CoinDetails";

function Homepage() {
  const [data, setData] = useState([]);
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
  return (
    <>
      <div>
        <table>
          <tr>
            <th>#</th>
            <th>Coin</th>
            <th>Price</th>
            <th>24hr</th>
            <th>Mkt Cap</th>
          </tr>

          <tr>
            {data.map((d) => (
              <Link to={`/${d.id}`} key={d.market_cap_rank}>
                <tr>
                  <td>{d.market_cap_rank}</td>

                  <td display="flex">
                    <img src={d.image} width={20} />
                    {d.name}
                  </td>

                  <td>$ {millify(d.high_24h)}</td>
                  <td>${millify(d.current_price)}</td>
                  <td>${millify(d.market_cap)}</td>
                </tr>
              </Link>
            ))}
          </tr>
        </table>
      </div>
    </>
  );
}

export default Homepage;
