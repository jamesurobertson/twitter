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
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [open, setOpen] = useState(true);
  const [suggestions, setSuggestions] = useState([]);
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
    // TODO: FIND FIX FOR THIS.
    let empty = value.length === 0;
    fetch(`/api/users/search/${empty ? "_" : value}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
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

  // todo: find some library to change from input type to be more dynamic.
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
        onAddMention={() => {
          //get mention object selected
        }}
      />
    </div>
  );
};

export default TweetInput;
