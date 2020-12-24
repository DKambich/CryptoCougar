import React from "react";
import { Container, Image, Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <Menu>
      <Container>
        <Menu.Item as={Link} to="/about" header>
          <Image size="mini" src="/logo.png" style={{ marginRight: ".5em" }} />
          Crypto Cougar
        </Menu.Item>
        <Menu.Item as={Link} to="/home">
          Home
        </Menu.Item>
        <Menu.Item as={Link} to="/browse">
          Browse
        </Menu.Item>
      </Container>
    </Menu>
  );
}

export default Navbar;
