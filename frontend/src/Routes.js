import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Explore from "./components/Explore";
import Notifications from "./components/Notifications";
import Messages from "./components/Messages";
import Bookmarks from "./components/Bookmarks";
import Profile from "./components/Profile";

const Routes = () => (
  <div className="w-7/12 mx-auto flex min-h-screen">
    <BrowserRouter>
      <Navbar />
      <div className="border w-3/4">
        <Switch>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/explore">
            <Explore />
          </Route>
          <Route path="/notifications">
            <Notifications />
          </Route>
          <Route path="/messages">
            <Messages />
          </Route>
          <Route path="/bookmarks">
            <Bookmarks />
          </Route>
          <Route path="/:username">
            <Profile />
          </Route>
          <Route path="/more">
            <Home />
          </Route>
          {/* <Route path="/*">
        <Redirect to="/" />
    </Route> */}
        </Switch>
      </div>
    </BrowserRouter>
  </div>
);

export default Routes;
