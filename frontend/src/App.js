import { useEffect, useState } from "react";
import Routes from "./Routes";
import { useDispatch, useSelector } from "react-redux";
import { restoreUser, getSessionUser } from "./store/sessionSlice";
import { setUser } from "./store/entitiesSlice";
import Auth from "./components/Auth";

const App = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const user = useSelector(getSessionUser);

  useEffect(() => {
    dispatch(restoreUser()).then((res) => {
      dispatch(setUser(res.payload));
      setLoading(false);
    });
  }, [dispatch]);

  if (loading) return null;

  return user ? <Routes /> : <Auth />;
};

export default App;
