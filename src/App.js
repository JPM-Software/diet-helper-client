import React, { Component } from "react";
import { HashRouter, Redirect, Route, Switch } from "react-router-dom";
import "./scss/style.scss";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const TheLayout = React.lazy(() => import("./containers/TheLayout"));

// Pages
const Login = React.lazy(() => import("./views/pages/login/Login"));
const Register = React.lazy(() => import("./views/pages/register/Register"));

const loggedIn = () => {
  const loggedInUser = localStorage.getItem("userId");
  return loggedInUser ? true : false;
};

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    loggedIn()
      ? <Component {...props} />
      : <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />
  )} />
)

class App extends Component {
  render() {
    return (
      <HashRouter>
        <React.Suspense fallback={loading}>
          <Switch>
            <Route
              exact
              path="/login"
              name="Login Page"
              component={Login}
            />
            <Route
              exact
              path="/register"
              name="Register Page"
              component={Register}
            />
            <PrivateRoute
              path="/"
              name="Strona główna"
              authed={loggedIn()} 
              component={TheLayout}
            />
          </Switch>
        </React.Suspense>
      </HashRouter>
    );
  }
}

export default App;
