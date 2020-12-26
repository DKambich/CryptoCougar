import React, { useEffect, useState } from "react";
import {
  Card,
  Container,
  Dimmer,
  Icon,
  Loader,
  Segment,
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
      </Container>
    </div>
  );
}

export default Trending;
