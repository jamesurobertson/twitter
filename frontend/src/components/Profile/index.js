import { useSelector } from "react-redux";

const Profle = () => {
  const user = useSelector((state) => state.session.user);
  return <div> Welcome to {user.username}'s profile</div>;
};

export default Profle;
