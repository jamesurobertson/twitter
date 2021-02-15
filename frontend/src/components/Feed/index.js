import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTweets } from "../../store/tweets";

const Feed = () => {
  const tweets = useSelector((state) => Object.values(state.tweets));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTweets());
  }, [dispatch]);

  if (!tweets) return null;
  return (
    <div className="w-3/4">
      {tweets.map((tweet) => {
        const { User, content, id } = tweet;
        return (
          <div key={id}>
            <div>{User.username}</div>
            <div>{content}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Feed;
