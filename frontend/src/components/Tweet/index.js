import { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import TweetActions from "./TweetActions";
import { timeSince } from "../../utils";
import { selectSessionUser } from "../../store/sessionSlice";
import createMentionPlugin from "@draft-js-plugins/mention";
import { deleteLike, postLike } from "../../store/entitiesSlice";
import {
  EditorState,
  convertFromRaw,
  Editor,
  CompositeDecorator,
} from "draft-js";
import flattenDeep from "lodash.flattendeep";
import "draft-js/dist/Draft.css";
import "@draft-js-plugins/mention/lib/plugin.css";

const Tweet = ({ tweet }) => {
  const tweetUser = useSelector((state) => state.entities.users[tweet.userId]);
  const sessionUser = useSelector(selectSessionUser);
  const dispatch = useDispatch();

  const { plugins } = useMemo(() => {
    const mentionPlugin = createMentionPlugin();

    const plugins = [mentionPlugin];
    return { plugins };
  }, []);

  const [editorState, setEditorState] = useState(() => {
    const savedState = JSON.parse(tweet.content);
    const contentState = convertFromRaw(savedState);
    const decorators = flattenDeep(plugins.map((plugin) => plugin.decorators));
    const decorator = new CompositeDecorator(
      decorators.filter((decorator, index) => index !== 1)
    );
    const newEditorState = EditorState.createWithContent(
      contentState,
      decorator
    );
    return newEditorState;
  });
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
          <div>
            <Editor
              editorState={editorState}
              plugins={plugins}
              readOnly={true}
              onChange={setEditorState}
            />
          </div>
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
