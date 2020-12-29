import React, { ReactNode } from "react";
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
import { SemanticICONS } from "semantic-ui-react/dist/commonjs/generic";
import { Routes } from "./Navigation";

interface NavLink {
  title: string;
  icon: SemanticICONS;
  link: keyof Routes;
}
const mainLinks: NavLink[] = [
  { title: "Home", icon: "home", link: "/home" },
  { title: "Browse", icon: "search", link: "/browse" },
  { title: "Trending", icon: "chart line", link: "/trending" },
];

const loggedInLinks: NavLink[] = [
  { title: "Favorites", icon: "star", link: "/favorites" },
  { title: "Profile", icon: "user circle", link: "/profile" },
  { title: "Logout", icon: "sign-out", link: "/logout" },
];

const loggedOutLinks: NavLink[] = [
  { title: "Login", icon: "sign-in", link: "/login" },
  { title: "Sign Up", icon: "add user", link: "/signup" },
];

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

const AuthDesktopLinks = ({ loggedIn }: { loggedIn: boolean }) => {
  if (loggedIn) {
    const trigger = (
      <span>
        <Image
          src="https://picsum.photos/200"
          avatar
          style={{ marginRight: ".5em" }}
        />
        John Smith
      </span>
    );

    return (
      <Menu.Menu position="right">
        <Dropdown item trigger={trigger}>
          <Dropdown.Menu>
            {loggedInLinks.map(({ title, icon, link }) => (
              <Dropdown.Item as={Link} to={link} key={title}>
                <Icon name={icon} />
                {title}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Menu>
    );
  }
  return (
    <Menu.Item position="right">
      {loggedOutLinks.map(({ title, icon, link }) => (
        <Button
          animated="fade"
          style={{ marginLeft: ".25em", marginRight: ".25em" }}
          as={Link}
          to={link}
          key={title}
        >
          <Button.Content visible>{title}</Button.Content>
          <Button.Content hidden>
            <Icon name={icon} />
          </Button.Content>
        </Button>
      ))}
    </Menu.Item>
  );
};

const AuthMobileLinks = ({ loggedIn }: { loggedIn: boolean }) => {
  const links = loggedIn ? loggedInLinks : loggedOutLinks;
  return (
    <>
      {links.map(({ title, icon, link }) => (
        <Dropdown.Item as={Link} to={link} key={title}>
          <Icon name={icon} />
          {title}
        </Dropdown.Item>
      ))}
    </>
  );
};

const MobileMenu = ({ loggedIn }: { loggedIn: boolean }) => {
  return (
    <Menu>
      <Container>
        <Dropdown item icon="sidebar">
          <Dropdown.Menu style={{ width: "100vw" }}>
            {mainLinks.map(({ title, icon, link }) => (
              <Dropdown.Item as={Link} to={link} key={title}>
                <Icon name={icon} />
                {title}
              </Dropdown.Item>
            ))}
            <AuthMobileLinks loggedIn={loggedIn} />
          </Dropdown.Menu>
        </Dropdown>
        <Menu.Item as={Link} to="/about" header style={{ flexGrow: 1 }}>
          <Image avatar src="/CryptoCougar/logo.png" style={{ marginRight: ".5em" }} />
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
          <Image size="mini" src="/CryptoCougar/logo.png" style={{ marginRight: ".5em" }} />
          CryptoCougar
        </Menu.Item>
        {mainLinks.map(({ title, icon, link }) => (
          <Menu.Item as={Link} to={link} key={title}>
            <Icon name={icon} />
            {title}
          </Menu.Item>
        ))}
        <AuthDesktopLinks loggedIn={loggedIn} />
      </Container>
    </Menu>
  );
};

function Navbar() {
  const loggedIn = true;

  return (
    <Responsive
      mobile={<MobileMenu loggedIn={loggedIn} />}
      desktop={<DesktopMenu loggedIn={loggedIn} />}
    />
  );
}

export default Navbar;
