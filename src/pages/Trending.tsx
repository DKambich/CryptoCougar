import React, { useEffect, useState } from "react";
import {
  Card,
  Container,
  Grid,
  Header,
  Image,
  Loader,
} from "semantic-ui-react";
import { ResponsiveLine, Serie } from "@nivo/line";
import Navbar from "../navigation/Navbar";

const data = [
  {
    id: "japan",
    data: [
      {
        x: "plane",
        y: 0,
      },
      {
        x: "helicopter",
        y: 51,
      },
      {
        x: "boat",
        y: 46,
      },
      {
        x: "train",
        y: 15,
      },
      {
        x: "subway",
        y: 208,
      },
      {
        x: "bus",
        y: 72,
      },
      {
        x: "car",
        y: 138,
      },
    ],
  },
];

const Graph = ({ data }: { data: number[][] }) => {
  let graphData: Serie[] = [
    {
      id: "test",
      data: data.map((price) => {
        return { x: price[0], y: price[1] };
      }),
    },
  ];

  return (
    <div style={{ height: 200, width: "auto" }}>
      <ResponsiveLine
        data={graphData}
        margin={{ top: 50, right: 80, bottom: 50, left: 60 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: 0,
          max: "auto",
          stacked: true,
          reverse: false,
        }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: "bottom",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "transportation",
          legendOffset: 36,
          legendPosition: "middle",
        }}
        axisLeft={{
          orient: "left",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "count",
          legendOffset: -40,
          legendPosition: "middle",
        }}
        pointSize={10}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
          {
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: "left-to-right",
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: "circle",
            symbolBorderColor: "rgba(0, 0, 0, .5)",
            effects: [
              {
                on: "hover",
                style: {
                  itemBackground: "rgba(0, 0, 0, .03)",
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
};

interface HistoricData {
  prices: number[][];
  market_caps: number[][];
  total_volumes: number[][];
}

interface TrendingCoin {
  id: string;
  name: string;
  symbol: string;
  market_cap_rank: number;
  thumb: string;
  large: string;
  score: number;
}

interface TrendingData extends TrendingCoin {
  historicData: HistoricData;
}

async function getHistoricalData(id: string): Promise<HistoricData> {
  let resp = await fetch(
    `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=6&interval=daily`
  );
  let respJSON = await resp.json();
  return respJSON;
}

async function getTrendingData(): Promise<TrendingData[]> {
  // Request the trending coin data
  let resp = await fetch("https://api.coingecko.com/api/v3/search/trending");
  let respJSON = await resp.json();

  // Map the retrieved coin data to TrendingCoin objects
  const coins: TrendingCoin[] = respJSON.coins.map((coin: any) => coin.item);

  // Request the historic coin data
  const promises = coins.map(({ id }) => getHistoricalData(id));
  const results = await Promise.allSettled(promises);

  // Map the retrieved coin data to TrendingData objects
  const trendingData: TrendingData[] = [];
  results.forEach((result, index) => {
    if (result.status === "fulfilled") {
      trendingData.push({ ...coins[index], historicData: result.value });
    }
  });
  return trendingData;
}

function Trending() {
  const [loading, setLoading] = useState(true);
  const [trending, setTrending] = useState<TrendingData[]>([]);

  useEffect(() => {
    getTrendingData().then((coins) => {
      setLoading(false);
      setTrending(coins);
    });
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
        <Grid container centered columns={2} style={{ margin: "1.5em" }}>
          {trending.map(
            ({
              id,
              symbol,
              market_cap_rank,
              name,
              large,
              historicData: { prices },
            }) => (
              <Grid.Column
                key={id}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Card style={{ width: "100%" }}>
                  <Graph data={prices} />
                  <Card.Content>
                    <Card.Header>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <Image src={large} size="mini" />
                        <Header
                          as="h5"
                          style={{ margin: 0, marginLeft: "1em" }}
                        >
                          {name} ({symbol})
                          <Header.Subheader>
                            Current market cap rank {market_cap_rank}
                          </Header.Subheader>
                        </Header>
                      </div>
                    </Card.Header>
                  </Card.Content>
                </Card>
              </Grid.Column>
            )
          )}
        </Grid>
        <div style={{ height: 200 }}></div>
      </Container>
    </div>
  );
}

export default Trending;
