import { useState, useCallback, useMemo } from "react";
import Mention from "./Mention";
import Editor from "@draft-js-plugins/editor";
import createMentionPlugin from "@draft-js-plugins/mention";
import createHashtagPlugin from "@draft-js-plugins/hashtag";
import createLinkifyPlugin from "@draft-js-plugins/linkify";
import "@draft-js-plugins/mention/lib/plugin.css";
import "@draft-js-plugins/hashtag/lib/plugin.css";
import "@draft-js-plugins/linkify/lib/plugin.css";
import "draft-js/dist/Draft.css";

const DraftEditor = ({ editorState, setEditorState }) => {
  const [open, setOpen] = useState(true);
  const [suggestions, setSuggestions] = useState([]);

  const { plugins, MentionSuggestions } = useMemo(() => {
    const mentionPlugin = createMentionPlugin({
      mentionComponent: Mention,
      mentionPrefix: "@",
    });
    const { MentionSuggestions } = mentionPlugin;

    const hashtagPlugin = createHashtagPlugin();
    const linkifyPlugin = createLinkifyPlugin();

    const plugins = [mentionPlugin, hashtagPlugin, linkifyPlugin];

    return { plugins, MentionSuggestions };
  }, []);

  const onOpenChange = useCallback((_open) => {
    setOpen(_open);
  }, []);

  const onSearchChange = useCallback(({ value }) => {
    if (value.length === 0) {
      return setSuggestions([]);
    }
    fetch(`/api/users/search/${value}`)
      .then((res) => res.json())
      .then((data) => {
        const newData = data.map((user) => ({
          name: `${user.username}`,
          link: `/profile/${user.id}`,
          avatar: user.profileImageUrl,
          user,
        }));
        console.log(newData);
        console.log(value);
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
