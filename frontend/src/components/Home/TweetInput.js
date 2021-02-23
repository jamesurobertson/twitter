import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import { postTweet } from "../../store/entitiesSlice";
import { EditorState } from "draft-js";
import createMentionPlugin, {
  defaultSuggestionsFilter,
} from "@draft-js-plugins/mention";
import Editor from "@draft-js-plugins/editor";
import "@draft-js-plugins/mention/lib/plugin.css";

const TweetInput = () => {
  const [open, setOpen] = useState(true);
  const [suggestions, setSuggestions] = useState([]);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const dispatch = useDispatch();
  const ref = useRef();

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

  //   const submitHandler = (e) => {
  //     e.preventDefault();
  //     dispatch(postTweet({ content }));
  //     setContent("");
  //   };

  return (
    <div
      className="p-2 border-solid border-2 border-black"
      onClick={() => ref.current.focus()}
    >
      <Editor
        editorKey="editor"
        editorState={editorState}
        onChange={setEditorState}
        plugins={plugins}
        ref={ref}
      />
      <MentionSuggestions
        open={open}
        onOpenChange={onOpenChange}
        suggestions={suggestions}
        onSearchChange={onSearchChange}
      />
    </div>
  );
};

export default TweetInput;
