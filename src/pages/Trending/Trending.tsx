import React, { useEffect } from "react";
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
import { connect, ConnectedProps } from "react-redux";

import { useResponsive } from "react-hooks-responsive";
import { semanticBreakpoints } from "../../constants";

import Navbar from "../../navigation/Navbar";
import ErrorMessage from "../../components/ErrorMessage";

import { RootState } from "../../state/store";
import { fetchTrendingCoins } from "../../state/trending/actions";

import { TrendingData } from "../../state/types";

import styles from "./Trending.module.css";
import { DatumValue } from "@nivo/core";

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
    return { x: item[0], y: item[1] };
  });
};
// moment(item[0]).format("h:mm A MM/DD/YYYY")
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

  const { screenIsAtMost } = useResponsive(semanticBreakpoints);
  const isMobile = screenIsAtMost("laptop");

  return (
    <div className={styles.graph}>
      <ResponsiveLine
        data={[series]}
        colors={lineColor}
        curve="cardinal"
        useMesh
        tooltip={({ point }) => (
          <Message>
            {`$${(point.data.y as number).toFixed(2)} at ${moment(
              point.data.x
            ).format("h:mm A [on] MM/DD/YYYY")}`}
          </Message>
        )}
        pointSize={8}
        margin={{ top: 50, right: 40, bottom: isMobile ? 80 : 50, left: 70 }}
        axisLeft={{
          tickSize: 10,
          tickPadding: 5,
          legend: "Price",
          legendOffset: -55,
          legendPosition: "middle",
          format: (value) => (value as number).toFixed(2),

        }}
        pointBorderColor="#0007"
        pointBorderWidth={1}
        yFormat=" >-$.3r"
        axisBottom={{
          tickSize: 10,
          tickPadding: 5,
          tickRotation: isMobile ? 45 : 0,
          legend: "Date",
          legendOffset: isMobile ? 60 : 40,
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
      <Card style={{ width: "100%" }}>
        <TrendingGraph
          id={name}
          data={convertToDateDatum(prices)}
          lineColor={color}
        />
        <Card.Content>
          <Card.Header>
            <div className={styles.cardContainer}>
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
      <Container className={styles.root}>
        {loading && <Loader active={loading} inline="centered" />}
        {error && (
          <ErrorMessage
            title="Error loading trending coin data"
            message={`The following error occured when trying to load the trending coin data: '${error}'`}
            onRetry={getTrending}
          />
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
