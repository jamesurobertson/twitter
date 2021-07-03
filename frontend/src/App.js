import { useEffect, useMemo, useState } from "react";
import Routes from "./Routes";
import { useDispatch, useSelector } from "react-redux";
import { restoreUser, selectSessionUser } from "./store/sessionSlice";
import { setUser } from "./store/entitiesSlice";
import Auth from "./components/Auth";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectSessionUser);
  const [loading, setLoading] = useState(true);
  // restores user from jwt cookies
  useEffect(() => {
    dispatch(restoreUser()).then((res) => {
      setLoading(false);
      // if there is no payload it means there is no user
      if (!res.payload) return;
      // setting session slice, then adding the user into our entities.users slice of state
      dispatch(setUser(res.payload));
    });
  }, [dispatch]);
  if (loading) return null;
  return user ? <Routes /> : <Auth />;
};

export default App;
