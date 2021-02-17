import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import TweetActions from "./TweetActions";

const Tweet = ({ tweet }) => {
  const dispatch = useDispatch();

  const tweetUser = useSelector(
    (state) => state.entities.users.entities[tweet.userId]
  );
  const likeTweet = (id) => {
    console.log(id);
  };

  function timeSince(date) {
    var seconds = Math.floor((new Date() - new Date(date)) / 1000);

    var interval = seconds / 31536000;

    if (interval > 1) {
      return Math.floor(interval) + " years";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + "d";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + "h";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + "m";
    }
    return Math.floor(seconds) + "s";
  }

  return (
    <div className="flex-col border w-full p-3">
      <div className="flex">
        <Link className="mr-2" to={`${tweetUser.username}`}>
          <img
            className="rounded-full w-11 h-11 object-cover"
            src={tweetUser.profileImageUrl}
            alt={`${tweetUser.username} profile pic`}
          />
        </Link>
        <div className="w-full">
          <Link className="flex" to={`${tweetUser.username}`}>
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
