import {
  Box,
  Flex,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import millify from "millify";

function Homepage() {
  const [data, setData] = useState([]);
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
  return (
    <>
      <TableContainer w={"100vw"} display="flex">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th color="black" fontSize={12}>
                #
              </Th>
              <Th color="black" fontSize={12}>
                Coin
              </Th>
              <Th color="black" fontSize={12}>
                Price
              </Th>
              <Th color="black" fontSize={12}>
                24hr
              </Th>
              <Th color="black" fontSize={12}>
                Mkt Cap
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((d) => (
              <Tr key={d.market_cap_rank}>
                <Td>{d.market_cap_rank}</Td>

                <Td display="flex">
                  <img src={d.image} width={20} />
                  {d.name}
                </Td>

                <Td>$ {millify(d.high_24h)}</Td>
                <Td>${millify(d.current_price)}</Td>
                <Td>${millify(d.market_cap)}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}

export default Homepage;
