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
  const profileUser = useSelector((state) => state.entities.users[profileId]);
  const tweets = useSelector((state) =>
    profileUser?.tweets?.map((tweetId) => state.entities.tweets[tweetId])
  );
  const allTweets = useSelector((state) => state.entities.tweets);

  const [loading, setLoading] = useState(true);

  // fetch user info
  useEffect(() => {
    dispatch(getUser(profileId)).then(() => setLoading(false));
  }, [dispatch, profileId]);

  if (loading || !profileUser) return null;
  return (
    <>
      <MainHeader title={`${profileUser.username}'s Profile!`} />
      <ProfileHeader user={profileUser} />
      {tweets &&
        tweets.map((tweet) => (
          <Tweet
            key={tweet.id}
            tweet={tweet}
            retweet={allTweets[tweet.retweetId]}
            isRetweet={tweet.retweetId}
          />
        ))}
    </>
  );
};

export default Profile;
