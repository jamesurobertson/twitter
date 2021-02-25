import { AiOutlineHeart } from "react-icons/ai";
import { TiMessage } from "react-icons/ti";
import { AiOutlineRetweet } from "react-icons/ai";
import { deleteLike, postLike } from "../../store/entitiesSlice";
import { useDispatch, useSelector } from "react-redux";

const TweetActions = ({ likes, tweetId }) => {
  const dispatch = useDispatch();
  const sessionUserId = useSelector((state) => state.session.userId);

  const userLikes = likes.some((userId) => userId === sessionUserId);

  const toggleLike = () => {
    // TODO: learn about stopping action for slower connections so that you can't accidentally like more than once.
    if (userLikes) {
      dispatch(deleteLike(tweetId));
    } else {
      dispatch(postLike(tweetId));
    }
  };

  return (
    <div className="flex justify-between items-center max-w-xs">
      <TiMessage className=" text-lg text-gray-700" />
      <AiOutlineRetweet className=" text-lg text-gray-700" />
      <button className="focus:outline-none" onClick={toggleLike}>
        <div className="flex items-center hover:bg-red-100 rounded-full p-1">
          <AiOutlineHeart
            className={`mr-2 text-lg text-gray-700 ${
              likes.includes(sessionUserId) && "text-red-500"
            }`}
          />
          {likes.length}
        </div>
      </button>
    </div>
  );
};
export default TweetActions;
