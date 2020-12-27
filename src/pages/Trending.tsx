import React, { useEffect, useState } from "react";
import {
  Card,
  Container,
  Grid,
  Header,
  Image as SemanticImage,
  Loader,
} from "semantic-ui-react";
import { Datum, ResponsiveLine, Serie } from "@nivo/line";
import moment from "moment";
import Navbar from "../navigation/Navbar";
import FastAverageColor from "fast-average-color";

const fac = new FastAverageColor();

const Graph = ({
  id,
  data,
  lineColor,
}: {
  id: string;
  data: Datum[];
  lineColor: string;
}) => {
  let series: Serie = {
    id,
    data,
  };

  return (
    <div style={{ height: 300, width: "auto" }}>
      <ResponsiveLine
        // tooltip={({ point }) => {
        //   console.log(point);
        //   return <Card>Date: {point.data.xFormatted}</Card>;
        // }}
        data={[series]}
        colors={lineColor}
        curve="natural"
        margin={{ top: 50, right: 80, bottom: 50, left: 80 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
        }}
        yFormat=" >-$.2r"
        axisBottom={{
          tickSize: 10,
          tickPadding: 5,
          legend: "Date",
          legendOffset: 40,
          legendPosition: "middle",
          format: (value) => moment(value).format("MM/DD/YY"),
        }}
        axisLeft={{
          tickSize: 10,
          tickPadding: 5,
          legend: "Price",
          legendOffset: -55,
          legendPosition: "middle",
        }}
        pointSize={8}
        pointBorderColor={{ from: "serieColor" }}
        useMesh={true}
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
  color: string;
}

const convertToDatum = (data: number[][]): Datum[] => {
  return data.map((item) => {
    console.log(moment(item[0]).format("MM/DD/YY"));
    return { x: moment(item[0]).format("MM/DD/YY"), y: item[1] };
  });
};

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
  for (let i = 0; i < results.length; i++) {
    const result = results[i];
    if (result.status === "fulfilled") {
      // Fetch the average color of the coins icon
      const url = `https://cors-anywhere.herokuapp.com/${coins[i].thumb}`;
      const color = (await fac.getColorAsync(url)).rgb;

      // Create TrendingData from each coin, historic data, and color
      trendingData.push({
        ...coins[i],
        historicData: result.value,
        color,
      });
    }
  }
  return trendingData;
}

const renderCard = ({
  id,
  symbol,
  market_cap_rank,
  name,
  large,
  color,
  historicData: { prices },
}: TrendingData) => (
  <Grid.Column
    key={id}
    mobile={16}
    tablet={16}
    computer={8}
    style={{ display: "flex", justifyContent: "center" }}
  >
    <Card style={{ width: "100%" }}>
      <Graph id={name} data={convertToDatum(prices)} lineColor={color} />
      <Card.Content>
        <Card.Header>
          <div style={{ display: "flex", alignItems: "center" }}>
            <SemanticImage src={large} size="mini" />
            <Header as="h5" style={{ margin: 0, marginLeft: "1em" }}>
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
);
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
          {trending.map(renderCard)}
        </Grid>
        <div style={{ height: 200 }}></div>
      </Container>
    </div>
  );
}

export default Trending;
