import { useState, useCallback, useMemo } from "react";
import createMentionPlugin from "@draft-js-plugins/mention";
import createHashtagPlugin from "@draft-js-plugins/hashtag";
import Editor from "@draft-js-plugins/editor";
import Mention from "../Draft/Mention";
import "@draft-js-plugins/mention/lib/plugin.css";
import "@draft-js-plugins/hashtag/lib/plugin.css";
import "draft-js/dist/Draft.css";

const DraftEditor = ({ editorState, setEditorState }) => {
  const [open, setOpen] = useState(true);
  const [suggestions, setSuggestions] = useState([]);

  const { plugins, MentionSuggestions } = useMemo(() => {
    const mentionPlugin = createMentionPlugin({
      mentionComponent: Mention,
      mentionPrefix: "@",
    });
    const hashtagPlugin = createHashtagPlugin();
    const { MentionSuggestions } = mentionPlugin;

    const plugins = [mentionPlugin, hashtagPlugin];
    return { plugins, MentionSuggestions };
  }, []);

  const onOpenChange = useCallback((_open) => {
    setOpen(_open);
  }, []);

  const onSearchChange = useCallback(({ value }) => {
    if (value.length === 0) return setSuggestions([]);
    fetch(`/api/users/search/${value}`)
      .then((res) => res.json())
      .then((data) => {
        const newData = data.map((user) => ({
          name: `${user.username}`,
          link: `/profile/${user.id}`,
          avatar: user.profileImageUrl,
          user,
        }));
        setSuggestions(newData);
      });
  }, []);

  return (
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
  );
};

export default DraftEditor;
