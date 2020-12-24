import React from "react";
import { Button, Container, Image, Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

function Navbar() {
  const loggedIn = true;
  return (
    <Menu>
      <Container>
        <Menu.Item as={Link} to="/about" header>
          <Image size="mini" src="/logo.png" style={{ marginRight: ".5em" }} />
          CryptoCougar
        </Menu.Item>
        <Menu.Item as={Link} to="/home">
          Home
        </Menu.Item>
        <Menu.Item as={Link} to="/browse">
          Browse
        </Menu.Item>
        {!loggedIn && (
          <Menu.Item position="right">
            <Button style={{ marginRight: ".5em" }} as={Link} to="/login">
              Log in
            </Button>
            <Button as={Link} to="/signup">
              Sign Up
            </Button>
          </Menu.Item>
        )}

        {loggedIn && (
          <Menu.Item position="right" as={Link} to="/profile">
            <Image
              src="https://picsum.photos/200"
              avatar
              style={{ marginRight: ".5em" }}
            />
            <span>Username</span>
          </Menu.Item>
        )}
      </Container>
    </Menu>
  );
}

export default Navbar;
