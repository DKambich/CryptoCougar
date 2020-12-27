import React, { useEffect, useState } from "react";
import {
  Card,
  Container,
  Grid,
  Header,
  Image as SemanticImage,
  Loader,
  Message,
} from "semantic-ui-react";
import { Datum, ResponsiveLine, Serie } from "@nivo/line";
import moment from "moment";
import Navbar from "../navigation/Navbar";
import FastAverageColor from "fast-average-color";

const fac = new FastAverageColor();

const styles: { [key: string]: React.CSSProperties } = {
  root: { padding: "1.5em" },
  graph: { height: 300, width: "auto" },
  card: { width: "100%" },
  cardHeader: { margin: 0, marginLeft: "1em" },
  cardContainer: { display: "flex", alignItems: "center" },
};

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
    <div style={styles.graph}>
      <ResponsiveLine
        data={[series]}
        colors={lineColor}
        curve="cardinal"
        useMesh
        tooltip={({ point }) => (
          <Message>
            {point.data.yFormatted} on {point.data.xFormatted}
          </Message>
        )}
        pointSize={8}
        margin={{ top: 50, right: 80, bottom: 50, left: 80 }}
        axisLeft={{
          tickSize: 10,
          tickPadding: 5,
          legend: "Price",
          legendOffset: -55,
          legendPosition: "middle",
        }}
        yFormat=" >-$.3r"
        axisBottom={{
          tickSize: 10,
          tickPadding: 5,
          legend: "Date",
          legendOffset: 40,
          legendPosition: "middle",
          format: (value) => moment(value).format("MM/DD/YY"),
        }}
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

const convertToDateDatum = (data: number[][]): Datum[] => {
  return data.map((item) => {
    return { x: moment(item[0]).format("h:mm A MM/DD/YYYY"), y: item[1] };
  });
};

async function getHistoricalData(id: string): Promise<HistoricData> {
  // Request the historical coin data for the past 7 days
  let resp = await fetch(
    `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=6&interval=daily`
  );
  let respJSON = await resp.json();

  // Return the parsed historical coin data
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
  <Grid.Column key={id} mobile={16} tablet={16} computer={8}>
    <Card style={styles.card}>
      <Graph id={name} data={convertToDateDatum(prices)} lineColor={color} />
      <Card.Content>
        <Card.Header>
          <div style={styles.cardContainer}>
            <SemanticImage src={large} size="mini" />
            <Header as="h5" style={styles.cardHeader}>
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
    <>
      <Navbar />
      <Container style={styles.root}>
        {loading && <Loader active={loading} inline="centered" />}
        <Grid container centered columns={2}>
          {trending.map(renderCard)}
        </Grid>
      </Container>
    </>
  );
}

export default Trending;
