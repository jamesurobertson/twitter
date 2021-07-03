import { timeSince } from "../../utils";
import { Link } from "react-router-dom";
import TweetActions from "./TweetActions";
import ReadOnlyEditor from "../Draft/ReadOnlyEditor";
import { AiOutlineRetweet } from "react-icons/ai";

import { useSelector } from "react-redux";

const Tweet = ({ tweet, isRetweet, retweet }) => {
  const displayedTweet = retweet ?? tweet;
  const tweetUser = useSelector((state) => state.entities.users[tweet.userId]);
  const displayedTweetUser = useSelector(
    (state) => state.entities.users[displayedTweet.userId]
  );

  return (
    <div className="flex-col border w-full p-3">
      {isRetweet && (
        <div className="flex text-sm font-light ml-7 items-center">
          <AiOutlineRetweet className="mr-2" />{" "}
          <Link className="hover:underline" to={`/profile/${tweetUser.id}`}>
            {`${tweetUser.firstName} ${tweetUser.lastName} Retweeted`}
          </Link>
        </div>
      )}
      <div className="flex">
        <Link className="mr-2" to={`/profile/${tweetUser.id}`}>
          <img
            className="rounded-full w-11 h-11 object-cover"
            src={displayedTweetUser.profileImageUrl}
            alt={`${displayedTweetUser.username} profile pic`}
          />
        </Link>
        <div className="w-full">
          <Link className="flex" to={`/profile/${displayedTweetUser.id}`}>
            <div className="font-bold hover:underline mr-1">
              {displayedTweetUser.firstName || displayedTweetUser.username}
            </div>
            <div className="font-light text-small">
              @{displayedTweetUser.username}
            </div>
            <div className="ml-1 font-light text-small">
              · {timeSince(displayedTweet.createdAt)}
            </div>
          </Link>
          <ReadOnlyEditor content={displayedTweet.content} />
          <TweetActions
            likes={displayedTweet.likes}
            retweets={displayedTweet.retweets}
            tweetId={displayedTweet.id}
          />
        </div>
      </div>
    </div>
  );
};

export default Tweet;
