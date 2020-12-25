import React, { useState } from "react";
import {
  Button,
  Container,
  Dropdown,
  Icon,
  Image,
  Menu,
  Grid,
} from "semantic-ui-react";
import { Link } from "react-router-dom";

interface LoggedInLinksProps {
  username: string;
  avatarURL: string;
  logout: Function;
}

const LoggedInLinks = ({ username, avatarURL, logout }: LoggedInLinksProps) => {
  const trigger = (
    <span>
      <Image src={avatarURL} avatar style={{ marginRight: ".5em" }} />
      {username}
    </span>
  );

  return (
    <Menu.Menu position="right">
      <Dropdown item trigger={trigger}>
        <Dropdown.Menu>
          <Dropdown.Item as={Link} to="/profile">
            <Icon name="user circle" />
            <span>Profile</span>
          </Dropdown.Item>
          <Dropdown.Item onClick={() => logout()}>
            <Icon name="sign-out" />
            <span>Log Out</span>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Menu>
  );
};

const LoggedOutLinks = () => {
  return (
    <Menu.Item position="right">
      <Button style={{ marginRight: ".5em" }} as={Link} to="/login">
        Log in
      </Button>
      <Button as={Link} to="/signup">
        Sign Up
      </Button>
    </Menu.Item>
  );
};

const MobileMenu = () => {
  const loggedIn = false;
  const [open, setOpen] = useState(false);
  // TODO: Add sidebar button and component
  return (
    <Menu>
      <Container>
        <Menu.Item
          onClick={() => {
            setOpen(!open);
          }}
        >
          <Icon name="sidebar" />
        </Menu.Item>
        <Menu.Item as={Link} to="/about" header>
          <Image size="mini" src="/logo.png" style={{ marginRight: ".5em" }} />
          CryptoCougar
        </Menu.Item>
      </Container>
    </Menu>
  );
};

const DesktopMenu = () => {
  const loggedIn = false;

  return (
    <Menu>
      <Container>
        <Menu.Item as={Link} to="/about" header>
          <Image size="mini" src="/logo.png" style={{ marginRight: ".5em" }} />
          CryptoCougar
        </Menu.Item>
        <Menu.Item as={Link} to="/home">
          <Icon name="home" />
          Home
        </Menu.Item>
        <Menu.Item as={Link} to="/browse">
          <Icon name="search" />
          Browse
        </Menu.Item>
        <Menu.Item as={Link} to="/trending">
          <Icon name="chart line" />
          Trending
        </Menu.Item>
        {loggedIn ? (
          <LoggedInLinks
            username="John Smith"
            avatarURL="https://picsum.photos/200"
            logout={() => console.log("Logout")}
          />
        ) : (
          <LoggedOutLinks />
        )}
      </Container>
    </Menu>
  );
};

function Navbar() {
  return (
    <Grid>
      <Grid.Row only="tablet mobile">
        <Grid.Column>
          <MobileMenu />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row only="computer">
        <Grid.Column>
          <DesktopMenu />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default Navbar;
