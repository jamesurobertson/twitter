import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Login from "../pages/Login";
import Landing from "../pages/Landing";
import Singup from "../pages/Signup";

const Auth = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/signup">
        <Singup />
      </Route>
      <Route exact path="/">
        <Landing />
      </Route>
      <Route
        path="/*"
        render={() => {
          return <Redirect to="/" />;
        }}
      />
    </Switch>
  </BrowserRouter>
);

export default Auth;
