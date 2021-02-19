import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import TweetActions from "./TweetActions";
import { timeSince } from "../../utils";

const Tweet = ({ tweet }) => {
  console.log(tweet);
  const tweetUser = useSelector((state) => state.entities.users[tweet.userId]);
  const likeTweet = (id) => {
    console.log(id);
  };

  return (
    <div className="flex-col border w-full p-3">
      <div className="flex">
        <Link className="mr-2" to={`${tweetUser.id}`}>
          <img
            className="rounded-full w-11 h-11 object-cover"
            src={tweetUser.profileImageUrl}
            alt={`${tweetUser.username} profile pic`}
          />
        </Link>
        <div className="w-full">
          <Link className="flex" to={`${tweetUser.id}`}>
            <div className="font-bold hover:underline mr-1">
              {tweetUser.firstName || tweetUser.username}
            </div>
            <div className="font-light text-small">@{tweetUser.username}</div>
            <div className="ml-1 font-light text-small">
              · {timeSince(tweet.createdAt)}
            </div>
          </Link>
          <div>{tweet.content}</div>
          <TweetActions
            likes={tweet.likes}
            likeTweet={() => likeTweet(tweet.id)}
          />
        </div>
      </div>
    </div>
  );
};

export default Tweet;
