import { AiOutlineHeart } from "react-icons/ai";
import { TiMessage } from "react-icons/ti";
import { AiOutlineRetweet } from "react-icons/ai";

const TweetActions = ({ likes, toggleLike, isSessions }) => (
  <div className="flex justify-between items-center max-w-xs">
    <TiMessage className=" text-lg text-gray-700" />
    <AiOutlineRetweet className=" text-lg text-gray-700" />
    <button onClick={toggleLike}>
      <div className="flex items-center hover:bg-red-100 rounded-full p-1">
        <AiOutlineHeart className="mr-2 text-lg text-gray-700" />
        {likes.length}
      </div>
    </button>
  </div>
);

export default TweetActions;
