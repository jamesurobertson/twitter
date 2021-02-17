import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTweets } from "../../store/tweetsSlice";
import Tweet from "../Tweet";

const Feed = () => {
  const [loading, setLoading] = useState(true);
  const tweets = useSelector((state) =>
    state.entities.tweets.ids.map((id) => state.entities.tweets.entities[id])
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
