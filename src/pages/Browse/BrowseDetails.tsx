import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { Container } from "semantic-ui-react";
import Navbar from "../../navigation/Navbar";
import { RootState } from "../../state/store";

const mapStateToProps = ({}: RootState) => ({});

const mapDispatchToProps = (dispatch: any) => ({});

const connector = connect(mapStateToProps, mapDispatchToProps);

type BrowseProps = ConnectedProps<typeof connector> & { id: string };

function BrowseDetails(props: BrowseProps) {
  const { id } = props;
  return (
    <>
      <Navbar />
      <Container>{id}</Container>
    </>
  );
}

export default connector(BrowseDetails);
