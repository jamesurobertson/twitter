import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import Explore from "./components/Explore";
import Notifications from "./components/Notifications";
import Messages from "./components/Messages";
import Bookmarks from "./components/Bookmarks";
import Profile from "./components/Profile";

const Routes = () => (
  <div className="w-7/12 mx-auto flex min-h-screen bg-blue-500">
    <BrowserRouter>
      <Navbar />
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
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/more">
          <Home />
        </Route>
        {/* <Route path="/*">
        <Redirect to="/" />
      </Route> */}
      </Switch>
    </BrowserRouter>
  </div>
);

export default Routes;
