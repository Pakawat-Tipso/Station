import React, { Component } from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";

import Home from "./views/Home";
import Signup from "./views/Signup";
import Login from "./views/Login";

import Profile from "./views/Profile";
import Payment from "./views/Payment";
import History from "./views/History";
import Map from "./views/Map";

import { auth } from "./firebase/config";

function PrivateRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
}

function PublicRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated === false ? (
          <Component {...props} />
        ) : (
          <Redirect to="/profile" />
        )
      }
    />
  );
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      authenticated: false,
      loading: true,
    };
  }

  componentDidMount() {
    auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authenticated: true,
          loading: false,
        });
      } else {
        this.setState({
          authenticated: false,
          loading: false,
        });
      }
    });
  }

  render() {
    return this.state.loading === true ? (
      <div></div>
    ) : (
      <Router>
        <Switch>
          <Route exact path="/" component={Home}></Route>

          <PublicRoute
            path="/signup"
            authenticated={this.state.authenticated}
            component={Signup}
          ></PublicRoute>

          <PublicRoute
            path="/login"
            authenticated={this.state.authenticated}
            component={Login}
          ></PublicRoute>

          <PrivateRoute
            path="/profile"
            authenticated={this.state.authenticated}
            component={Profile}
          ></PrivateRoute>

          <PrivateRoute
            path="/payment"
            authenticated={this.state.authenticated}
            component={Payment}
          ></PrivateRoute>

          <PrivateRoute
            path="/history"
            authenticated={this.state.authenticated}
            component={History}
          ></PrivateRoute>

          <PrivateRoute
            path="/map"
            authenticated={this.state.authenticated}
            component={Map}
          ></PrivateRoute>
        </Switch>
      </Router>
    );
  }
}

export default App;
