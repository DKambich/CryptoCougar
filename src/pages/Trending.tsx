import React, { useEffect, useState } from "react";
import { Card, Container, Header, Image, Loader } from "semantic-ui-react";
import Navbar from "../navigation/Navbar";

const coins = [
  {
    item: {
      id: "1inch",
      name: "1inch",
      symbol: "1INCH",
      market_cap_rank: 97,
      thumb:
        "https://assets.coingecko.com/coins/images/13469/thumb/1inch-token.png?1608803028",
      large:
        "https://assets.coingecko.com/coins/images/13469/large/1inch-token.png?1608803028",
      score: 0,
    },
  },
  {
    item: {
      id: "dynamic-set-dollar",
      name: "Dynamic Set Dollar",
      symbol: "DSD",
      market_cap_rank: 104,
      thumb:
        "https://assets.coingecko.com/coins/images/13249/thumb/DSD.jpg?1606713628",
      large:
        "https://assets.coingecko.com/coins/images/13249/large/DSD.jpg?1606713628",
      score: 1,
    },
  },
  {
    item: {
      id: "marlin",
      name: "Marlin",
      symbol: "POND",
      market_cap_rank: 319,
      thumb:
        "https://assets.coingecko.com/coins/images/8903/thumb/Marlin.png?1608584519",
      large:
        "https://assets.coingecko.com/coins/images/8903/large/Marlin.png?1608584519",
      score: 2,
    },
  },
  {
    item: {
      id: "the-graph",
      name: "The Graph",
      symbol: "GRT",
      market_cap_rank: 54,
      thumb:
        "https://assets.coingecko.com/coins/images/13397/thumb/Graph_Token.png?1608145566",
      large:
        "https://assets.coingecko.com/coins/images/13397/large/Graph_Token.png?1608145566",
      score: 3,
    },
  },
  {
    item: {
      id: "seigniorage-shares",
      name: "Seigniorage Shares",
      symbol: "SHARE",
      market_cap_rank: 412,
      thumb:
        "https://assets.coingecko.com/coins/images/12306/thumb/logo_%281%29.png?1607658707",
      large:
        "https://assets.coingecko.com/coins/images/12306/large/logo_%281%29.png?1607658707",
      score: 4,
    },
  },
  {
    item: {
      id: "ripple",
      name: "XRP",
      symbol: "XRP",
      market_cap_rank: 4,
      thumb:
        "https://assets.coingecko.com/coins/images/44/thumb/xrp-symbol-white-128.png?1605778731",
      large:
        "https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png?1605778731",
      score: 5,
    },
  },
  {
    item: {
      id: "uniswap",
      name: "Uniswap",
      symbol: "UNI",
      market_cap_rank: 40,
      thumb:
        "https://assets.coingecko.com/coins/images/12504/thumb/uniswap-uni.png?1600306604",
      large:
        "https://assets.coingecko.com/coins/images/12504/large/uniswap-uni.png?1600306604",
      score: 6,
    },
  },
];

function Trending() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Navbar />
      <Container>
        {loading && (
          <div style={{ margin: "2.5em" }}>
            <Loader active={loading} inline="centered" />
          </div>
        )}
        {!loading &&
          coins.map((coin) => (
            <Card
              style={{
                width: "100%",
                margin: "1.5em",
                padding: "2.5em",
                display: "flex",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <Image src={coin.item.large} size="mini" />
                <Header as="h2" style={{ margin: 0, marginLeft: "1em" }}>
                  {coin.item.name} ({coin.item.symbol})
                  <Header.Subheader>
                    Current market cap rank {coin.item.market_cap_rank}
                  </Header.Subheader>
                </Header>
              </div>
            </Card>
          ))}
      </Container>
    </div>
  );
}

export default Trending;
