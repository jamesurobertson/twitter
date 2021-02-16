import { useEffect, useState } from "react";
import Routes from "./Routes";
import { useDispatch, useSelector } from "react-redux";
import { restoreUser } from "./store/sessionSlice";
import Auth from "./components/Auth";

const App = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(restoreUser()).then(() => setLoading(false));
  }, [dispatch]);

  if (loading) return null;

  return user ? <Routes /> : <Auth />;
};

export default App;
