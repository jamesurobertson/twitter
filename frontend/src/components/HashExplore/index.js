import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getHashTweets } from "../../store/entitiesSlice";
import MainHeader from "../MainHeader";
import Tweet from "../Tweet";

const HashExplore = () => {
  const { hash } = useParams();

  const dispatch = useDispatch();
  const feed = useSelector((state) => state.entities.feed);
  const tweets = useSelector((state) => state.entities.tweets);

  const [loading, setLoading] = useState(true);

  // fetches tweets that used the #hashtag
  useEffect(() => {
    dispatch(getHashTweets(hash)).then(() => setLoading(false));
  }, [dispatch, hash]);

  if (loading) return null;
  return (
    <div>
      <MainHeader />
      {feed.map((id) => (
        <Tweet key={id} tweet={tweets[id]} />
      ))}
    </div>
  );
};

export default HashExplore;
