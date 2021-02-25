import { timeSince } from "../../utils";
import { Link } from "react-router-dom";
import TweetActions from "./TweetActions";
import ReadOnlyEditor from "../Draft/ReadOnlyEditor";
import { useSelector } from "react-redux";

const Tweet = ({ tweet }) => {
  const tweetUser = useSelector((state) => state.entities.users[tweet.userId]);

  return (
    <div className="flex-col border w-full p-3">
      <div className="flex">
        <Link className="mr-2" to={`/profile/${tweetUser.id}`}>
          <img
            className="rounded-full w-11 h-11 object-cover"
            src={tweetUser.profileImageUrl}
            alt={`${tweetUser.username} profile pic`}
          />
        </Link>
        <div className="w-full">
          <Link className="flex" to={`/profile/${tweetUser.id}`}>
            <div className="font-bold hover:underline mr-1">
              {tweetUser.firstName || tweetUser.username}
            </div>
            <div className="font-light text-small">@{tweetUser.username}</div>
            <div className="ml-1 font-light text-small">
              · {timeSince(tweet.createdAt)}
            </div>
          </Link>
          <ReadOnlyEditor content={tweet.content} />
          <TweetActions likes={tweet.likes} tweetId={tweet.id} />
        </div>
      </div>
    </div>
  );
};

export default Tweet;
