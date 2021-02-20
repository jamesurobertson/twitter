import { useEffect, useState } from "react";
import Routes from "./Routes";
import { useDispatch, useSelector } from "react-redux";
import { restoreUser, selectSessionUser } from "./store/sessionSlice";
import { setUser } from "./store/entitiesSlice";
import Auth from "./components/Auth";

const App = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const user = useSelector(selectSessionUser);

  useEffect(() => {
    dispatch(restoreUser()).then((res) => {
      // setting session slice, then adding the user into our entities.users slice of state
      dispatch(setUser(res.payload));
      setLoading(false);
    });
  }, [dispatch]);

  if (loading) return null;

  return user ? <Routes /> : <Auth />;
};

export default App;
