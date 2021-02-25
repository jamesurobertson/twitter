import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUser } from "../../store/entitiesSlice";
import MainHeader from "../MainHeader";
import Tweet from "../Tweet";
import ProfileHeader from "./ProfileHeader";

const Profle = () => {
  const { profileId } = useParams();
  const allTweets = useSelector((state) => state.entities.tweets);
  const profileUser = useSelector((state) => state.entities.users[profileId]);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [profileTweets, setProfileTweets] = useState([]);

  useEffect(() => {
    console.log("new user");
    dispatch(getUser(profileId)).then(() => {
      setLoading(false);
    });
  }, [dispatch, profileId]);

  useEffect(() => {
    // return early if userData hasn't loaded from previous useEffect
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
    <div>
      <MainHeader title={`${profileUser.username}'s Profile!`} />
      <ProfileHeader user={profileUser} />
      {profileTweets.map((tweet) => (
        <Tweet key={tweet.id} tweet={tweet} />
      ))}
    </div>
  );
};

export default Profle;
