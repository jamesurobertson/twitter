import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTweets } from "../../store/tweets";
import Tweet from "../Tweet";

const Feed = () => {
  const tweets = useSelector((state) => state.tweets);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTweets());
  }, [dispatch]);

  if (!tweets) return null;
  return (
    <div className="w-3/4">
      {tweets.map((tweet) => (
        <Tweet key={tweet.id} tweet={tweet} />
      ))}
    </div>
  );
};

export default Feed;
