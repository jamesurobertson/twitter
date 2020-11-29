import { Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import Singup from "./pages/Signup";

const Routes = () => (
  <Switch>
    <Route path="/login" component={Login} />
    <Route path="/signup" component={Singup} />
  </Switch>
);

export default Routes;
