import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUser, postFollow, deleteFollow } from "../../store/entitiesSlice";
import { selectSessionUser } from "../../store/sessionSlice";
import MainHeader from "../MainHeader";
import Tweet from "../Tweet";
import ProfileHeader from "./ProfileHeader";

const Profle = () => {
  const [loading, setLoading] = useState(true);
  const [followsUser, setFollowsUser] = useState(null);
  const [profileTweets, setProfileTweets] = useState([]);

  const { userId } = useParams();
  const dispatch = useDispatch();

  const allTweets = useSelector((state) => state.entities.tweets);
  const sessionUser = useSelector(selectSessionUser);
  const profileUser = useSelector((state) => state.entities.users[userId]);

  useEffect(() => {
    console.log("got user");
    dispatch(getUser(userId)).then(() => setLoading(false));
  }, [dispatch, userId]);

  useEffect(() => {
    // return early if userData hasn't loaded from previous useEffect
    if (loading) return;

    // does sessionUser follow profileUser
    const follows = profileUser.followers.includes(sessionUser.id);
    setFollowsUser(follows);

    // Tweets of profileUser
    const tweets = profileUser.Tweets.map((id) => allTweets[id]);
    setProfileTweets(tweets);
  }, [profileUser, sessionUser, allTweets, loading]);

  const unfollowUser = () => {
    dispatch(deleteFollow(profileUser.id));
  };

  const followUser = () => {
    dispatch(postFollow(profileUser.id));
  };

  if (loading) return null;
  if (!profileUser) return null;
  return (
    <div>
      <MainHeader title={`${profileUser.username}'s Profile!`} />
      <ProfileHeader user={profileUser} />
      {sessionUser.id !== Number(userId) && (
        <button onClick={followsUser ? unfollowUser : followUser}>
          {followsUser ? "Unfollow" : "Follow"} {profileUser.username}
        </button>
      )}
      {profileTweets.map((tweet) => (
        <Tweet key={tweet.id} tweet={tweet} />
      ))}
    </div>
  );
};

export default Profle;
