import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getProfileData,
  postFollowUser,
  deleteFollow,
} from "../../store/usersSlice";
import MainHeader from "../MainHeader";
import Tweet from "../Tweet";

const Profle = () => {
  const [loading, setLoading] = useState(true);
  const [followsUser, setFollowsUser] = useState(null);

  const sessionUser = useSelector((state) => state.session.user);

  const dispatch = useDispatch();
  const { username } = useParams();

  const currentProfile = useSelector((state) =>
    Object.keys(state.entities.users.entities).find(
      (u) => u.username === username
    )
  );

  useEffect(() => {
    dispatch(getProfileData(username)).then(() => setLoading(false));
  }, [dispatch, username]);

  useEffect(() => {
    console.log("currentProfile changed");
    setFollowsUser(
      currentProfile.followers.some(
        (follower) => follower.userId === sessionUser.id
      )
    );
  }, [currentProfile, sessionUser]);

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
      {sessionUser.username !== username && (
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
