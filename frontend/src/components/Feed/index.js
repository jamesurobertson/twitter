import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTweets } from "../../store/entitiesSlice";
import Tweet from "../Tweet";

const Feed = () => {
  const [loading, setLoading] = useState(true);
  const [hi, setHi] = useState(true);
  const tweets = useSelector((state) =>
    state.entities.feed.map((id) => state.entities.tweets[id])
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTweets()).then(() => setLoading(false));
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
