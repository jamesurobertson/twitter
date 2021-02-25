import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getHashTweets } from "../../store/entitiesSlice";
import Tweet from "../Tweet";

const HashExplore = () => {
  const { hash } = useParams();

  const dispatch = useDispatch();
  const feed = useSelector((state) => state.entities.feed);
  const tweets = useSelector((state) => state.entities.tweets);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    dispatch(getHashTweets(hash)).then(() => setLoading(false));
  }, [dispatch, hash]);

  if (loading) return null;
  return (
    <div>
      {feed.map((id) => {
        const tweet = tweets[id];
        return <Tweet key={id} tweet={tweet} />;
      })}
    </div>
  );
};

export default HashExplore;
