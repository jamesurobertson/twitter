import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import TweetActions from "./TweetActions";
import { timeSince } from "../../utils";
import { selectSessionUser } from "../../store/sessionSlice";
import { deleteLike, postLike } from "../../store/entitiesSlice";

const Tweet = ({ tweet }) => {
  const tweetUser = useSelector((state) => state.entities.users[tweet.userId]);
  const sessionUser = useSelector(selectSessionUser);
  const dispatch = useDispatch();

  const userLikes = tweet.likes.some((userId) => userId === sessionUser.id);
  const isSessions = sessionUser.id === tweet.userId;

  const toggleLike = (id) => {
    // TODO: learn about stopping action for slower connections so that you can't accidentally like more than once.
    if (userLikes) {
      dispatch(deleteLike(id));
    } else {
      dispatch(postLike(id));
    }
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
            isSessions={isSessions}
            toggleLike={() => toggleLike(tweet.id)}
          />
        </div>
      </div>
    </div>
  );
};

export default Tweet;
