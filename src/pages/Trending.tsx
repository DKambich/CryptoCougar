import React, { useEffect } from "react";
import {
  Button,
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
import { connect, ConnectedProps } from "react-redux";

import Navbar from "../navigation/Navbar";

import { RootState } from "../state/store";
import { fetchTrendingCoins } from "../state/trending/actions";
import { StyleSheet, TrendingData } from "../state/types";

// Define page styles
const styles: StyleSheet = {
  root: { padding: "1.5em" },
  graph: { height: 300, width: "auto" },
  card: { width: "100%" },
  cardHeader: { margin: 0, marginLeft: "1em" },
  cardContainer: { display: "flex", alignItems: "center" },
};

// Define Redux state mappings

const mapStateToProps = ({ trending }: RootState) => ({
  trending: trending.data,
  error: trending.error,
  loading: trending.isLoading,
});

const mapDispatchToProps = (dispatch: any) => ({
  getTrending: () => dispatch(fetchTrendingCoins()),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

// Define Helper functions

const convertToDateDatum = (data: number[][]): Datum[] => {
  // Map each element to a Datum date point
  return data.map((item) => {
    return { x: moment(item[0]).format("h:mm A MM/DD/YYYY"), y: item[1] };
  });
};

// Define subcomponents

interface TrendingGraphProps {
  id: string;
  data: Datum[];
  lineColor: string;
}
const TrendingGraph = ({ id, data, lineColor }: TrendingGraphProps) => {
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

interface TrendingCardProps {
  coin: TrendingData;
}
const TrendingCard = ({ coin }: TrendingCardProps) => {
  const {
    id,
    symbol,
    market_cap_rank,
    name,
    large,
    color,
    historicData: { prices },
  } = coin;

  return (
    <Grid.Column key={id} mobile={16} tablet={16} computer={8}>
      <Card style={styles.card}>
        <TrendingGraph
          id={name}
          data={convertToDateDatum(prices)}
          lineColor={color}
        />
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
};

// Define page component

type TrendingProps = ConnectedProps<typeof connector>;

function Trending(props: TrendingProps) {
  const { loading, trending, error, getTrending } = props;

  // Load the trending data
  useEffect(() => {
    getTrending();
  }, [getTrending]);

  return (
    <>
      <Navbar />
      <Container style={styles.root}>
        {loading && <Loader active={loading} inline="centered" />}
        {error && (
          <Message negative>
            <Message.Header>Error loading trending coin data</Message.Header>
            <p>
              The following error occured when trying to load the trending coin
              data: '{error}'
            </p>
            <Button negative onClick={getTrending}>
              Retry
            </Button>
          </Message>
        )}
        <Grid container centered columns={2}>
          {trending.map((coin) => (
            <TrendingCard coin={coin} />
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default connector(Trending);
