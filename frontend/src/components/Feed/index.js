import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTweets } from "../../store/entitiesSlice";
import Tweet from "../Tweet";

const Feed = () => {
  const dispatch = useDispatch();
  const tweets = useSelector((state) => {
    return state.entities.feed.map((id) => state.entities.tweets[id]);
  });
  const sessionUserId = useSelector((state) => state.session.userId);

  const [loading, setLoading] = useState(true);

  // fetch tweets for feed
  useEffect(() => {
    dispatch(fetchTweets()).then(() => setLoading(false));
  }, [dispatch]);

  // TODO: message if you don't follow anyone or don't have any of your own tweets.
  if (loading) return null;
  return (
    <div className="w-full">
      {tweets &&
        tweets.map((tweet) => {
          // do not display retweeted tweets from the sessionUser on homepage.
          // TODO: Can this be a more efficient query on backend instead?
          if (tweet.userId === sessionUserId && tweet.retweetId) {
            return null;
          }
          return <Tweet key={tweet.id} tweet={tweet} />;
        })}
    </div>
  );
};

export default Feed;
