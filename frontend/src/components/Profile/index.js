import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getProfileData,
  postFollowUser,
  deleteFollow,
} from "../../store/currentProfile";
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
    console.log("currentProfile changed");
    setFollowsUser(
      currentProfile.followers.some((follower) => follower.userId === user.id)
    );
  }, [currentProfile, user]);

  const unfollowUser = () => {
    dispatch(deleteFollow(currentProfile.id));
  };

  const followUser = () => {
    dispatch(postFollowUser(currentProfile.id));
  };

  if (loading) return null;
  return (
    <div>
      <MainHeader title={`${currentProfile.username}'s Profile!`} />
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
