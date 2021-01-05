import React, { useEffect, useState } from "react";
import {
  Container,
  Header,
  Icon,
  Search,
  SearchProps,
  SearchResultData,
  SearchResultProps,
} from "semantic-ui-react";
import { connect, ConnectedProps } from "react-redux";

import styles from "./Browse.module.css";

import Navbar from "../../navigation/Navbar";
import ErrorMessage from "../../components/ErrorMessage";

import { RootState } from "../../state/store";
import { fetchCoins } from "../../state/browse/actions";
import { Link } from "react-router-dom";

// Define Redux state mappings

const mapStateToProps = ({ browse }: RootState) => ({
  coins: browse.data,
  error: browse.error,
  loading: browse.isLoading,
});

const mapDispatchToProps = (dispatch: any) => ({
  getCoins: () => dispatch(fetchCoins()),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

// Define page component

type BrowseProps = ConnectedProps<typeof connector>;

function Browse(props: BrowseProps) {
  const { loading, coins, error, getCoins } = props;
  const [results, setResults] = useState<
    { title: string; description: string }[]
  >([]);
  const [value, setValue] = useState<string>("");

  // Load the coin data
  useEffect(() => {
    getCoins();
  }, [getCoins]);

  const onSearch = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    data: SearchProps
  ) => {
    const searchText = data.value?.trim().toLowerCase();
    if (!searchText || searchText === "") {
      setResults([]);
      setValue("");
      return;
    }
    const filtered = coins
      .filter((coin) => {
        const name = coin.name.trim().toLowerCase();
        const id = coin.id.trim().toLowerCase();
        return name.includes(searchText) || id.includes(searchText);
      })
      .map((coin) => ({ title: coin.name, description: coin.id }));
    setResults(filtered);
    setValue(data.value ?? "");
  };

  const onSelect = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    data: SearchResultData
  ) => {
    const id = data.result.description;
  };

  const renderResult = (props: SearchResultProps) => {
    const { title, description = "" } = props;
    return (
      <Link to={`/browse/${encodeURIComponent(description)}`}>
        <Header as="h5">
          {title}
          <Header.Subheader>{description}</Header.Subheader>
        </Header>
      </Link>
    );
  };

  return (
    <>
      <Navbar />
      <Container className={styles.root}>
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
          className={styles.search}
          loading={loading}
          results={results}
          onSearchChange={onSearch}
          onResultSelect={onSelect}
          resultRenderer={renderResult}
          value={value}
        />
        {error && (
          <ErrorMessage
            title="Error loading coin data"
            message={`The following error occured when trying to load the coin data: '${error}'`}
            onRetry={getCoins}
          />
        )}
      </Container>
    </>
  );
}

export default connector(Browse);
