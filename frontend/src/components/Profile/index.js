import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProfileData } from "../../store/currentProfile";
import MainHeader from "../MainHeader";
import Tweet from "../Tweet";

const Profle = () => {
  const [loading, setLoading] = useState(true);
  const [followsUser, setFollowsUser] = useState(null);

  const user = useSelector((state) => state.session.user);
  const currentProfile = useSelector((state) => state.currentProfile);

  const dispatch = useDispatch();
  const { username } = useParams();

  useEffect(() => {
    dispatch(getProfileData(username)).then(() => setLoading(false));
  }, [dispatch, username]);

  useEffect(() => {
    setFollowsUser(
      currentProfile.Follows.some((follow) => follow.id === user.id)
    );
  }, [username, currentProfile, user]);

  const unfollowUser = () => {
    setFollowsUser(false);
  };

  const followUser = () => {
    setFollowsUser(true);
  };

  if (loading) return null;
  return (
    <div>
      <MainHeader title={`${user.username}'s Profile!`} />
      {user.username !== username && (
        <button onClick={followsUser ? unfollowUser : followUser}>
          {followsUser ? "Unfollow" : "Follow"} {username}
        </button>
      )}
      {currentProfile.Tweets.map((tweet) => (
        <Tweet key={tweet.id} tweet={tweet} />
      ))}
    </div>
  );
};

export default Profle;
