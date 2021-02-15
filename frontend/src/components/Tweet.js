import { Link } from "react-router-dom";

const Tweet = ({ tweet }) => (
  <div>
    <Link to={`${tweet.User.username}`}>
      <div className="hover:bg-blue-100 w-max">{tweet.User.username}</div>
    </Link>
    <div>{tweet.content}</div>
  </div>
);

export default Tweet;
