import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProfileTweets } from "../../store/tweets";
import MainHeader from "../MainHeader";
import Tweet from "../Tweet";

const Profle = () => {
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.session.user);
  const tweets = useSelector((state) => state.tweets);
  const dispatch = useDispatch();
  const { username } = useParams();
  useEffect(() => {
    dispatch(getProfileTweets(username)).then(() => setLoading(false));
  }, [dispatch, username]);

  if (loading) return null;
  return (
    <div>
      <MainHeader title={`${user.username}'s Profile!`} />
      {tweets.map((tweet) => (
        <Tweet key={tweet.id} tweet={tweet} />
      ))}
    </div>
  );
};

export default Profle;
