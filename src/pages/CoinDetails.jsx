import {
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import millify from "millify";

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
        }, 1500);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      {loading ? (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      ) : (
        <>
          <Text> Market Cap Rank:{coin.market_cap_rank}</Text>
          <Text>{coin.name}</Text>
          <Text>Score : {coin.coingecko_score}</Text>
          <Text>Price:{coin.market_data.current_price.usd}</Text>
          <Text>24hr high:{coin.market_data.high_24h.usd}</Text>
          <Text>24hr low:{coin.market_data.low_24h.usd}</Text>
          <Text>Mkt:{coin.market_data.market_cap.usd}</Text>
          <Text>Description:{coin.description.en}</Text>
        </>
      )}
    </>
  );
};

export default CoinDetails;
