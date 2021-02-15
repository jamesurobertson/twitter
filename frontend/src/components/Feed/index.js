import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFeedTweets } from "../../store/tweets";
import Tweet from "../Tweet";

const Feed = () => {
  const [loading, setLoading] = useState(true);
  const tweets = useSelector((state) => state.tweets);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFeedTweets()).then(() => setLoading(false));
  }, [dispatch]);

  // TODO: message if you don't follow anyone or don't have any of your own tweets.
  if (!tweets || loading) return null;
  return (
    <div className="w-full">
      {tweets.map((tweet) => (
        <Tweet key={tweet.id} tweet={tweet} />
      ))}
    </div>
  );
};

export default Feed;
