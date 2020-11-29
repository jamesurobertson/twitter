import { useEffect } from "react";
import Routes from "./Routes";
import { useDispatch, useSelector } from "react-redux";
import { restoreUser } from "./store/session";

const App = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(restoreUser());
  }, [dispatch]);

  console.log(user);
  return user ? (
    <Routes />
  ) : (
    <>
      <div> Auth Routes! </div> <Routes />
    </>
  );
};

export default App;
