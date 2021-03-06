import React from "react";
import * as ReactRouter from "react-router-dom";
import { Container } from "semantic-ui-react";
import Browse from "../pages/Browse/Browse";
import BrowseDetails from "../pages/Browse/BrowseDetails";
import Trending from "../pages/Trending/Trending";
import Navbar from "./Navbar";

/**
 *  Map route to component props type
 *  https://www.emeraldwalk.com/blog/2020-07-21/strong-typed-react-router/
 */
export interface Routes {
  "/": {};
  "/about": {};
  "/home": {};
  "/browse/:id": { id: string };
  "/browse": {};
  "/trending": {};
  "/favorites": {};
  "/profile": {};
  "/login": {};
  "/signup": {};
  "/logout": {};
}

/** This is just a union type of my route matching strings */
type RoutePath = keyof Routes;

/** Helper type to derive route props from path */
type Params<TPath extends RoutePath> = TPath extends RoutePath
  ? Routes[TPath]
  : never;

/** Override RouteProps with generics */
interface RouteProps<TPath extends RoutePath>
  extends Omit<ReactRouter.RouteProps, "component" | "path"> {
  // tie our component type to our path type
  component: React.ComponentType<Params<TPath>>;
  path: TPath;
  guarded?: {
    redirect: boolean;
    url: keyof Routes;
  };
}

/**
 * Route wrapper component that extracts route params
 * and passes them to the given component prop.
 */
function Route<TPath extends RoutePath>({
  component: Component,
  guarded,
  ...rest
}: RouteProps<TPath>) {
  return (
    <ReactRouter.Route
      {...rest}
      render={({ match: { params } }) =>
        guarded?.redirect ? (
          <ReactRouter.Redirect to={guarded.url} />
        ) : (
          <Component {...params} />
        )
      }
    />
  );
}

function DummyPage() {
  const location = ReactRouter.useLocation();

  return (
    <>
      <Navbar />
      <Container>{location.pathname}</Container>
    </>
  );
}

function Navigation() {
  const loggedIn = true;

  return (
    <ReactRouter.HashRouter basename="/">
      <ReactRouter.Switch>
        <Route path="/about" component={DummyPage} />
        <Route path="/home" component={DummyPage} />
        <Route path="/browse/:id" component={BrowseDetails} />
        <Route path="/browse" component={Browse} />
        <Route path="/trending" component={Trending} />
        <Route
          path="/favorites"
          component={DummyPage}
          guarded={{ redirect: !loggedIn, url: "/login" }}
        />
        <Route
          path="/profile"
          component={DummyPage}
          guarded={{ redirect: !loggedIn, url: "/login" }}
        />
        <Route
          path="/logout"
          component={DummyPage}
          guarded={{ redirect: !loggedIn, url: "/login" }}
        />
        <Route
          path="/login"
          component={DummyPage}
          guarded={{ redirect: loggedIn, url: "/" }}
        />
        <Route
          path="/signup"
          component={DummyPage}
          guarded={{ redirect: loggedIn, url: "/" }}
        />
        <Route path="/" component={DummyPage} />
      </ReactRouter.Switch>
    </ReactRouter.HashRouter>
  );
}

export default Navigation;
