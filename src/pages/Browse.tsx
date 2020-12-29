import React from "react";
import { Container, Header, Icon, Search } from "semantic-ui-react";
import { connect, ConnectedProps } from "react-redux";

import Navbar from "../navigation/Navbar";

import { RootState } from "../state/store";
import { StyleSheet } from "../state/types";

// Define page styles
const styles: StyleSheet = {
  root: { padding: "2.5em" },
  search: { width: "100%", marginTop: "3em" },
};

// Define Redux state mappings

const mapStateToProps = ({}: RootState) => ({});

const mapDispatchToProps = (dispatch: any) => ({});

const connector = connect(mapStateToProps, mapDispatchToProps);

// Define page component

type BrowseProps = ConnectedProps<typeof connector>;

function Browse(props: BrowseProps) {
  return (
    <>
      <Navbar />
      <Container style={styles.root}>
        <Header textAlign="center" icon as="h1">
          <Icon name="bitcoin" />
          Search for your favorite coins!
          <Header.Subheader>
            Start searching below to find the coin you need
          </Header.Subheader>
        </Header>
        <Search
          size="large"
          input={{ fluid: true }}
          fluid
          style={styles.search}
        />
      </Container>
    </>
  );
}

export default connector(Browse);
