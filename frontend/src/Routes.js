import { Route, Switch } from "react-router-dom";
import Login from "./pages/Login";

const Routes = () => (
  <Switch>
    <Route path="/login" component={Login} />
  </Switch>
);

export default Routes;
