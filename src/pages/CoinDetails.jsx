import { Table, TableContainer, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import millify from "millify";

const CoinDetails = () => {
  const [coin, setCoin] = useState({});

  const url = `https://api.coingecko.com/api/v3/coins`;

  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        setCoin(res.data);
        console.log(res.data);
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
                Coin
              </Th>
              <Th color="black" fontSize={12}>
                Price
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {/* {coin.map((d) => (
              <Tr key={d.market_cap_rank}>
                <Td>{d.market_cap_rank}</Td>

                <Td>${millify(d.current_price)}</Td>
                <Td>${millify(d.market_cap)}</Td>
              </Tr>
            ))} */}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default CoinDetails;
