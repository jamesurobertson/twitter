import { useState, useMemo } from "react";
import { useHistory } from "react-router-dom";
import flattenDeep from "lodash.flattendeep";
import {
  EditorState,
  convertFromRaw,
  Editor,
  CompositeDecorator,
} from "draft-js";
import createMentionPlugin from "@draft-js-plugins/mention";
import createHashtagPlugin from "@draft-js-plugins/hashtag";
import createLinkifyPlugin from "@draft-js-plugins/linkify";
import "@draft-js-plugins/mention/lib/plugin.css";
import "@draft-js-plugins/hashtag/lib/plugin.css";
import "draft-js/dist/Draft.css";

import Mention from "./Mention";

const ReadOnlyEditor = ({ content }) => {
  const history = useHistory();

  const { plugins } = useMemo(() => {
    const mentionPlugin = createMentionPlugin({
      mentionComponent: Mention,
      mentionPrefix: "@",
    });

    const hashtagPlugin = createHashtagPlugin();

    // save old component to then wrap new props around
    // TODO: find a better solutin?
    const temp = hashtagPlugin.decorators[0].component;

    const ClickableHash = (props) => {
      const newProps = Object.assign(
        {
          onClick: () => {
            history.push(`/hashtag/${props.decoratedText.slice(1)}`);
          },
        },
        props
      );
      return temp(newProps);
    };

    hashtagPlugin.decorators[0].component = ClickableHash;

    const linkifyPlugin = createLinkifyPlugin();
    const plugins = [mentionPlugin, hashtagPlugin, linkifyPlugin];
    return { plugins };
  }, [history]);

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
