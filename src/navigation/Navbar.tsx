import React, { FunctionComponent, ReactNode } from "react";
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

const Responsive = ({
  mobile,
  desktop,
}: {
  mobile: ReactNode;
  desktop: ReactNode;
}) => {
  return (
    <Grid>
      <Grid.Row only="tablet mobile">
        <Grid.Column>{mobile}</Grid.Column>
      </Grid.Row>
      <Grid.Row only="computer">
        <Grid.Column>{desktop}</Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

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
      <Button
        animated="fade"
        style={{ marginRight: ".5em" }}
        as={Link}
        to="/login"
      >
        <Button.Content visible>Login</Button.Content>
        <Button.Content hidden>
          <Icon name="sign-in" />
        </Button.Content>
      </Button>
      <Button animated="fade" as={Link} to="/signup">
        <Button.Content visible>Sign Up</Button.Content>
        <Button.Content hidden>
          <Icon name="add user" />
        </Button.Content>
      </Button>
    </Menu.Item>
  );
};

const AuthMobileLinks = ({ loggedIn }: { loggedIn: boolean }) => {
  return loggedIn ? (
    <>
      <Dropdown.Item as={Link} to="/profile">
        <Icon name="user circle" />
        Profile
      </Dropdown.Item>
      <Dropdown.Item>
        <Icon name="sign-out" />
        Log Out
      </Dropdown.Item>
    </>
  ) : (
    <>
      <Dropdown.Item as={Link} to="/login">
        <Icon name="sign-in" />
        Login
      </Dropdown.Item>
      <Dropdown.Item as={Link} to="/signup">
        <Icon name="add user" />
        Sign Up
      </Dropdown.Item>
    </>
  );
};

const MobileMenu = ({ loggedIn }: { loggedIn: boolean }) => {
  return (
    <Menu>
      <Container>
        <Dropdown item icon="sidebar">
          <Dropdown.Menu style={{ width: "100vw" }}>
            <Dropdown.Item as={Link} to="/home">
              <Icon name="home" />
              Home
            </Dropdown.Item>
            <Dropdown.Item as={Link} to="/browse">
              <Icon name="search" />
              Browse
            </Dropdown.Item>
            <Dropdown.Item as={Link} to="/trending">
              <Icon name="chart line" />
              Trending
            </Dropdown.Item>
            <AuthMobileLinks loggedIn={loggedIn} />
          </Dropdown.Menu>
        </Dropdown>
        <Menu.Item as={Link} to="/about" header style={{ flexGrow: 1 }}>
          <Image avatar src="/logo.png" style={{ marginRight: ".5em" }} />
          CryptoCougar
        </Menu.Item>
      </Container>
    </Menu>
  );
};

const DesktopMenu = ({ loggedIn }: { loggedIn: boolean }) => {
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
  const loggedIn = false;

  return (
    <Responsive
      mobile={<MobileMenu loggedIn={loggedIn} />}
      desktop={<DesktopMenu loggedIn={loggedIn} />}
    />
  );
}

export default Navbar;
