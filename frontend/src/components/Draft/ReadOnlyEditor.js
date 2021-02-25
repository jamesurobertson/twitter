import { useState, useMemo } from "react";
import createMentionPlugin from "@draft-js-plugins/mention";
import createHashtagPlugin from "@draft-js-plugins/hashtag";

import {
  EditorState,
  convertFromRaw,
  Editor,
  CompositeDecorator,
} from "draft-js";
import flattenDeep from "lodash.flattendeep";
import "draft-js/dist/Draft.css";
import "@draft-js-plugins/mention/lib/plugin.css";
import "@draft-js-plugins/hashtag/lib/plugin.css";

import Mention from "./Mention";

const ReadOnlyEditor = ({ content }) => {
  const { plugins } = useMemo(() => {
    const mentionPlugin = createMentionPlugin({
      mentionComponent: Mention,
      mentionPrefix: "@",
    });
    const hashtagPlugin = createHashtagPlugin();
    const plugins = [mentionPlugin, hashtagPlugin];
    return { plugins };
  }, []);

  const [editorState, setEditorState] = useState(() => {
    const savedState = JSON.parse(content);
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

  return (
    <Editor
      editorState={editorState}
      plugins={plugins}
      readOnly={true}
      onChange={setEditorState}
    />
  );
};

export default ReadOnlyEditor;
