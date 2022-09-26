import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import millify from "millify";
import "../App.css";

const Fav = () => {
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

  return <div className="details"></div>;
};

export default Fav;
