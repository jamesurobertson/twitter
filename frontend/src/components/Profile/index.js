import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../store/entitiesSlice";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ProfileHeader from "./ProfileHeader";
import MainHeader from "../MainHeader";
import Tweet from "../Tweet";

const Profile = () => {
  const { profileId } = useParams();

  const dispatch = useDispatch();
  const allTweets = useSelector((state) => state.entities.tweets);
  const profileUser = useSelector((state) => state.entities.users[profileId]);

  const [loading, setLoading] = useState(true);

  // fetch user info
  useEffect(() => {
    dispatch(getUser(profileId)).then(() => setLoading(false));
  }, [dispatch, profileId]);

  const tweets = profileUser?.tweets?.map((tweetId) => allTweets[tweetId]);

  if (loading) return null;
  if (!profileUser) return null;
  return (
    <>
      <MainHeader title={`${profileUser.username}'s Profile!`} />
      <ProfileHeader user={profileUser} />
      {tweets && tweets.map((tweet) => <Tweet key={tweet.id} tweet={tweet} />)}
    </>
  );
};

export default Profile;
