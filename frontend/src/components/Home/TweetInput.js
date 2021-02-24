import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postTweet } from "../../store/entitiesSlice";
import { selectSessionUser } from "../../store/sessionSlice";
import { EditorState, convertToRaw } from "draft-js";
import createMentionPlugin, {
  defaultSuggestionsFilter,
} from "@draft-js-plugins/mention";
import Editor from "@draft-js-plugins/editor";
import "@draft-js-plugins/mention/lib/plugin.css";
import "draft-js/dist/Draft.css";
import { Link } from "react-router-dom";

const TweetInput = () => {
  const [open, setOpen] = useState(true);
  const [suggestions, setSuggestions] = useState([]);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const dispatch = useDispatch();
  const sessionUser = useSelector(selectSessionUser);

  const { MentionSuggestions, plugins } = useMemo(() => {
    const mentionPlugin = createMentionPlugin();

    const { MentionSuggestions } = mentionPlugin;
    const plugins = [mentionPlugin];
    return { MentionSuggestions, plugins };
  }, []);

  const onOpenChange = useCallback((_open) => {
    setOpen(_open);
  }, []);

  const onSearchChange = useCallback(({ value }) => {
    console.log(value);

    if (value.length === 0) return setSuggestions([]);
    fetch(`/api/users/search/${value}`)
      .then((res) => res.json())
      .then((data) => {
        const newData = data.map((user) => ({
          name: `@${user.username}`,
          link: `/profile/${user.id}`,
          avatar: user.profileImageUrl,
        }));
        setSuggestions(newData);
      });
  }, []);

  const submitHandler = () => {
    const contentState = editorState.getCurrentContent();
    const raw = convertToRaw(contentState);
    const data = JSON.stringify(raw);
    dispatch(postTweet({ content: data }));
  };

  return (
    <div className="flex p-2 border-solid border-2 border-blue-100">
      <div className="mr-2 h-20">
        <img
          className="rounded-full w-11 h-11 object-cover"
          src={sessionUser.profileImageUrl}
          alt={sessionUser.username}
        />
      </div>
      <div className="w-full flex-col justify-between">
        <div className="mb-4">
          <Editor
            editorKey="editor"
            editorState={editorState}
            onChange={setEditorState}
            plugins={plugins}
            placeholder="What's happening?"
          />
          <MentionSuggestions
            open={open}
            onOpenChange={onOpenChange}
            suggestions={suggestions}
            onSearchChange={onSearchChange}
          />
        </div>
        <div className="flex justify-end w-full">
          <button
            className="p-2 bg-blue-100 hover:bg-blue-200 rounded-full border-solid"
            onClick={submitHandler}
          >
            Tweet
          </button>
        </div>
      </div>
    </div>
  );
};

export default TweetInput;
