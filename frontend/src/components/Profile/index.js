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
  const feed = useSelector((state) => state.entities.feed);

  const [loading, setLoading] = useState(true);
  const [profileTweets, setProfileTweets] = useState([]);

  useEffect(() => {
    dispatch(getUser(profileId)).then(() => setLoading(false));
  }, [dispatch, profileId]);

  useEffect(() => {
    // return early if userData hasn't loaded from previous useEffect
    // TODO: find better approach?
    if (loading) return;

    // Tweets of profileUser
    // TODO: Tweets aren't always there so need if statement. fix later
    if (profileUser?.Tweets) {
      const tweets = profileUser.Tweets.map((id) => allTweets[id]);
      setProfileTweets(tweets);
    }
  }, [profileUser, allTweets, loading]);

  if (loading) return null;
  if (!profileUser) return null;
  return (
    <>
      <MainHeader title={`${profileUser.username}'s Profile!`} />
      <ProfileHeader user={profileUser} />
      {profileTweets.map((tweet) => (
        <Tweet key={tweet.id} tweet={tweet} />
      ))}
    </>
  );
};

export default Profile;
