import { useState } from "react";
import { useDispatch } from "react-redux";
import { postTweet } from "../../store/tweets";

const TweetInput = () => {
  const [content, setContent] = useState("");

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(postTweet({ content }));
  };
  // todo: find some library to change from input type to be more dynamic.
  return (
    <form className="flex" onSubmit={submitHandler}>
      <input
        className="w-96 border"
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="submit">Tweet</button>
    </form>
  );
};

export default TweetInput;
