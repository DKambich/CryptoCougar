import React, { useEffect, useState } from "react";
import {
  Card,
  Container,
  Header,
  Icon,
  Image,
  Loader,
} from "semantic-ui-react";
import Navbar from "../navigation/Navbar";

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
        <Card
          style={{
            width: "100%",
            margin: "1.5em",
            padding: "2.5em",
            display: "flex",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <Image
              src="https://assets.coingecko.com/coins/images/13249/large/DSD.jpg?1606713628"
              size="mini"
            />
            <Header as="h2" style={{ margin: 0, marginLeft: "1em" }}>
              Dynamic Set Dollar (DSD)
              <Header.Subheader>
                Valued at $12
              </Header.Subheader>
            </Header>
          </div>
        </Card>
      </Container>
    </div>
  );
}

export default Trending;
